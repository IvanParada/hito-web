import { inject } from "@angular/core";
import { SessionStore } from "../store/session.store";
import { CanActivateFn, Router } from "@angular/router";

export const authGuard: CanActivateFn = () => {
    const sessionStore = inject(SessionStore);
    const router = inject(Router);

    if (sessionStore.accessToken() && sessionStore.currentUser()) {
        return true;
    }

    return router.createUrlTree(['/login']);
}