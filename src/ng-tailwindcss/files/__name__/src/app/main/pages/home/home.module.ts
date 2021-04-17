import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './home.page';
import { RouterModule, Routes } from '@angular/router';

const route: Routes = [
	{
		path: '',
		component: HomePage,
		data: { title: 'Home' }
	}
];

@NgModule({
	declarations: [HomePage],
	imports: [CommonModule, RouterModule.forChild(route)]
})
export class HomeModule {}
