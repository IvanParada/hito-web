import { Component, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';
import { SessionService } from '../../../core/auth/service/session.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  private readonly router = inject(Router);
  private readonly sessionService = inject(SessionService);


onLogout(): void {
  this.sessionService.logout().subscribe(() => {
    this.router.navigate(['/']);
  });
}
}