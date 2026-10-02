import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

export interface DropdownOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dropdown.html',
})
export class Dropdown {
  label = input<string>();
  placeholder = input('Selecciona una opción');

  options = input.required<DropdownOption[]>();

  control = input.required<FormControl<string>>();

  errorMessage = input('');
}