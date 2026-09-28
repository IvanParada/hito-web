import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Input } from '../../../shared/components/input/input';
import { Button } from '../../../shared/components/button/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, Input, Button],
  templateUrl: './register.html',
})
export class Register {
  registerForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),],
    }),
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

  nameControl = this.registerForm.controls.name;
  emailControl = this.registerForm.controls.email;
  passwordControl = this.registerForm.controls.password;
}