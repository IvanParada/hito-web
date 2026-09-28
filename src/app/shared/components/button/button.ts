import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export type ButtonVariant = 'primary' | 'secondary';

@Component({
  selector: 'app-button',
  imports: [RouterLink],
  templateUrl: './button.html',
})
export class Button {
  label = input.required<string>();
  variant = input<ButtonVariant>('primary');
  routerLink = input<string | null>(null);
  type = input<'button' | 'submit'>('button');
  disabled = input(false);
  fullWidth = input(false);
}