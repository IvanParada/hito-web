import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.html'
})
export class SearchBar {
    @Input() placeholder: string = "Buscar...";


}