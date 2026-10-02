import { ApplicationConfig, inject, provideAppInitializer } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './core/auth/interceptors/auth.interceptor';
import { firstValueFrom } from 'rxjs';
import { SessionService } from './core/auth/service/session.service';
import { refreshInterceptor } from './core/auth/interceptors/refresh.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(
      withInterceptors([authInterceptor, refreshInterceptor]),
    ),
    provideAppInitializer(() => {
      const sessionService = inject(SessionService);

      return firstValueFrom(
        sessionService.restoreSession(),
      );
    }),
  ],
};