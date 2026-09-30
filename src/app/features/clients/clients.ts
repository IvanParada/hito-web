import { Component } from "@angular/core";
import { PageHeader } from "../../shared/components/page-header/page-header";
import { SearchBar } from "../../shared/components/search-bar/search-bar";
import { Button } from "../../shared/components/button/button";

@Component({
  selector: 'app-clients',
  imports: [PageHeader, SearchBar, Button],
  templateUrl: './clients.html'
})
export class Clients {}
