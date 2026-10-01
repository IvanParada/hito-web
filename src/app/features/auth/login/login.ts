import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Input } from '../../../shared/components/input/input';
import { Button } from '../../../shared/components/button/button';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/service/auth.service';
import { LoginDto } from '../../../core/auth/dto/login.dto';
import { SessionStore } from '../../../core/auth/store/session.store';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, Input, Button],
  templateUrl: './login.html',
})
export class Login {

  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly sessionStore = inject(SessionStore);

  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);


  readonly loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email,
      ],
    }),

    password: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
      ],
    }),
  });

  readonly emailControl = this.loginForm.controls.email;
  readonly passwordControl = this.loginForm.controls.password;

  onSubmit() {
    if (this.loginForm.invalid || this.isLoading()) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const formValue = this.loginForm.getRawValue();

    const dto: LoginDto = {
      email: formValue.email.trim(),
      password: formValue.password,
    };

    this.authService
      .login(dto)
      .pipe(
        tap((response) => {
          this.sessionStore.setSession(response);
        }),

        switchMap(() => {
          return this.authService.me();
        }),

        tap((me) => {
          this.sessionStore.setCurrentUser(me);
        }),

        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/app/dashboard']);
        },

        error: (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.errorMessage.set(
              'Correo o contraseña incorrectos',
            );
            return;
          }

          this.errorMessage.set(
            'No fue posible iniciar sesión. Intenta nuevamente.',
          );
        },
      });
  }

}