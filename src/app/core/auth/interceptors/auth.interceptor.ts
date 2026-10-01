import { inject } from '@angular/core';
import {
    HttpInterceptorFn,
} from '@angular/common/http';

import { SessionStore } from '../store/session.store';
import { environment } from '../../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (
    request,
    next,
) => {
    const sessionStore = inject(SessionStore);

    const accessToken = sessionStore.accessToken();

    if (
        !accessToken ||
        !request.url.startsWith(environment.apiUrl)
    ) {
        return next(request);
    }

    const authenticatedRequest = request.clone({
        setHeaders: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return next(authenticatedRequest);
};