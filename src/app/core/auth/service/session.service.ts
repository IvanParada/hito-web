import { inject, Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';

import { AuthService } from './auth.service';
import { SessionStore } from '../store/session.store';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private readonly authService = inject(AuthService);
  private readonly sessionStore = inject(SessionStore);

  restoreSession() {
    const accessToken = this.sessionStore.accessToken();

    if (!accessToken) {
      return of(false);
    }

    return this.authService.me().pipe(
      tap((me) => {
        this.sessionStore.setCurrentUser(me);
      }),

      map(() => true),

      catchError(() => {
        this.sessionStore.clearSession();
        return of(false);
      }),
    );
  }
}