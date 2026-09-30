import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './siderbar/sidebar';

@Component({
  selector: 'app-private-layout',
  imports: [RouterOutlet, Sidebar],
  templateUrl: './private-layout.html',
})
export class PrivateLayout { }
