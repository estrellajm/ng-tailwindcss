import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	template: `
		<div class="min-h-screen bg-white">
			<app-nav></app-nav>
			<router-outlet></router-outlet>
			<app-footer></app-footer>
		</div>
	`
})
export class AppComponent {}
