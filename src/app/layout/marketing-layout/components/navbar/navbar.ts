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
    sections = signal([
        { id: 'features', label: 'Características' },
        { id: 'pricing', label: 'Precios' },
    ]);
    scrollToSection(id: string) {
        document.getElementById(id)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }


    toggleMenu() {
        this.menuOpen.update(value => !value);
    }

    closeMenu() {
        this.menuOpen.set(false);
    }
}