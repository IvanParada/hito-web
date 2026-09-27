import { Component } from '@angular/core';
import { Hero } from './components/hero/hero';

@Component({
  selector: 'app-landing',
  imports: [Hero],
  templateUrl: './landing.html'
})
export class Landing {}
