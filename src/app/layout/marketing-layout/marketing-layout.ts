import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MarketingNavbar } from './components/navbar/navbar';

@Component({
  selector: 'app-marketing-layout',
  imports: [RouterOutlet, MarketingNavbar],
  templateUrl: './marketing-layout.html',
})
export class MarketingLayout { }
