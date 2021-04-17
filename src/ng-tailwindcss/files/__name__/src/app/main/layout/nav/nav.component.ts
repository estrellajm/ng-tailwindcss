import { Component, HostListener, OnInit } from '@angular/core';
import { Navigation } from 'src/app/app.navigation';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
	nav = Navigation;
	public isKonamiEntered: boolean = false;
	public show_mobile: boolean = false;

	constructor() {}

	ngOnInit(): void {}

	public mobileMenuToggle(): void {
		this.show_mobile = !this.show_mobile;
	}
	public show(event: boolean): void {
		if (event) this.isKonamiEntered = true;
	}
	@HostListener('document:keydown.escape', ['$event'])
	onKeydownHandler(event: KeyboardEvent) {
		if (this.isKonamiEntered === true) this.isKonamiEntered = false;
	}
}
