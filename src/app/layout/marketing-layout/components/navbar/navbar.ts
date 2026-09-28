import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../../../shared/components/button/button';

@Component({
    selector: 'app-marketing-navbar',
    imports: [
        RouterLink,
        Button,
    ],
    templateUrl: './navbar.html',
})
export class MarketingNavbar {
    readonly menuOpen = signal(false);

    readonly sections = signal([
        {
            label: 'Características',
            href: '#features',
        },
        {
            label: 'Precios',
            href: '#pricing',
        }
    ]);

    toggleMenu() {
        this.menuOpen.update(value => !value);
    }

    closeMenu() {
        this.menuOpen.set(false);
    }
}