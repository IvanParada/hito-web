import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Input } from '../../../shared/components/input/input';
import { Button } from '../../../shared/components/button/button';
import { Dropdown } from '../../../shared/components/dropdown/dropdown';

import { AuthService } from '../../../core/auth/service/auth.service';
import {
  ORGANIZATION_TYPE,
  OrganizationType,
  RegisterDto,
} from '../../../core/auth/dto/register.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    Input,
    Button,
    Dropdown,
  ],
  templateUrl: './register.html',
})
export class Register {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly organizationTypes = [
    {
      label: 'Persona',
      value: ORGANIZATION_TYPE.PERSONAL,
    },
    {
      label: 'Empresa',
      value: ORGANIZATION_TYPE.BUSINESS,
    },
  ];

  readonly passwordControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(8)],
  });

  readonly confirmPasswordControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(8),
    (control) => {
      if (!control.value) {
        return null;
      }

      if (control.value !== this.passwordControl.value) {
        return {
          passwordMismatch: true,
        };
      }

      return null;
    },
    ],
  });

  readonly registerForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),

    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),

    password: this.passwordControl,

    confirmPassword: this.confirmPasswordControl,

    organizationType: new FormControl<OrganizationType | ''>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    organizationName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  readonly nameControl = this.registerForm.controls.name;
  readonly emailControl = this.registerForm.controls.email;
  readonly organizationTypeControl = this.registerForm.controls.organizationType;
  readonly organizationNameControl = this.registerForm.controls.organizationName;

  constructor() {
    this.passwordControl.valueChanges
      .pipe(
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.confirmPasswordControl.updateValueAndValidity({
          emitEvent: false,
        });
      });
  }

  onSubmit(): void {
    if (
      this.registerForm.invalid ||
      this.isLoading()
    ) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.errorMessage.set(null);

    const formValue =
      this.registerForm.getRawValue();

    if (!formValue.organizationType) {
      return;
    }

    this.isLoading.set(true);

    const dto: RegisterDto = {
      name: formValue.name.trim(),
      email: formValue.email.trim(),
      password: formValue.password,
      organizationType:
        formValue.organizationType,
      organizationName:
        formValue.organizationName.trim(),
    };

    this.authService
      .register(dto)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },

        error: (error: HttpErrorResponse) => {
          if (error.status === 409) {
            this.errorMessage.set(
              'Ya existe una cuenta asociada a este correo.',
            );
            return;
          }

          this.errorMessage.set(
            'No fue posible crear la cuenta. Intenta nuevamente.',
          );
        },
      });
  }
}