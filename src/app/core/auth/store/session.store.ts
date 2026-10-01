import { Injectable, signal } from '@angular/core';
import type { LoginResponse } from '../dto/login.dto';
import type { MeResponse } from '../dto/me.dto';

@Injectable({
  providedIn: 'root',
})
export class SessionStore {
  readonly currentUser = signal<MeResponse | null>(null);

  readonly accessToken = signal<string | null>(
    sessionStorage.getItem('accessToken'),
  );

  readonly refreshToken = signal<string | null>(
    sessionStorage.getItem('refreshToken'),
  );

  setSession(response: LoginResponse): void {
    this.accessToken.set(response.accessToken);
    this.refreshToken.set(response.refreshToken);

    sessionStorage.setItem(
      'accessToken',
      response.accessToken,
    );

    sessionStorage.setItem(
      'refreshToken',
      response.refreshToken,
    );
  }

  setCurrentUser(user: MeResponse): void {
    this.currentUser.set(user);
  }

  clearSession(): void {
    this.currentUser.set(null);
    this.accessToken.set(null);
    this.refreshToken.set(null);

    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
  }
}