import { Component, Input } from "@angular/core";

@Component({
    selector: "app-page-header",
    templateUrl: "./page-header.html",
})
export class PageHeader {

    @Input() title: string = "";
    @Input() subtitle: string = "";

}