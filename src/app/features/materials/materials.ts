import { Component } from "@angular/core";
import { PageHeader } from "../../shared/components/page-header/page-header";
import { Button } from "../../shared/components/button/button";
import { SearchBar } from "../../shared/components/search-bar/search-bar";

@Component({
  selector: 'app-materials',
  imports: [PageHeader, Button, SearchBar],
  templateUrl: './materials.html'
})
export class Materials {}
