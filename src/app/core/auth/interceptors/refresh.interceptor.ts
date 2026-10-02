import { inject } from '@angular/core';
import {
    HttpErrorResponse,
    HttpInterceptorFn,
} from '@angular/common/http';
import { Router } from '@angular/router';
import {
    catchError,
    finalize,
    Observable,
    shareReplay,
    switchMap,
    tap,
    throwError,
} from 'rxjs';

import { AuthService } from '../service/auth.service';
import { SessionStore } from '../store/session.store';
import { RefreshTokenResponse } from '../dto/refresh.dto';

let refreshRequest$: Observable<RefreshTokenResponse> | null = null;

export const refreshInterceptor: HttpInterceptorFn = (
    request,
    next,
) => {
    const authService = inject(AuthService);
    const sessionStore = inject(SessionStore);
    const router = inject(Router);

    const isAuthRequest =
        request.url.includes('/auth/login') ||
        request.url.includes('/auth/register') ||
        request.url.includes('/auth/refresh');

    if (isAuthRequest) {
        return next(request);
    }

    return next(request).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status !== 401) {
                return throwError(() => error);
            }

            const refreshToken =
                sessionStore.refreshToken();

            if (!refreshToken) {
                sessionStore.clearSession();
                router.navigate(['/login']);

                return throwError(() => error);
            }

            if (!refreshRequest$) {
                refreshRequest$ = authService
                    .refreshToken({ refreshToken })
                    .pipe(
                        tap((response) => {
                            sessionStore.setTokens(
                                response.accessToken,
                                response.refreshToken,
                            );
                        }),

                        shareReplay(1),

                        finalize(() => {
                            refreshRequest$ = null;
                        }),
                    );
            }

            return refreshRequest$.pipe(
                switchMap((response) => {
                    const retriedRequest = request.clone({
                        setHeaders: {
                            Authorization:
                                `Bearer ${response.accessToken}`,
                        },
                    });

                    return next(retriedRequest);
                }),

                catchError((refreshError) => {
                    sessionStore.clearSession();
                    router.navigate(['/login']);

                    return throwError(() => refreshError);
                }),
            );
        }),
    );
};