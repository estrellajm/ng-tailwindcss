import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KonamiCodeDirective } from '@directives/konami-code.directive';

@NgModule({
  declarations: [KonamiCodeDirective],
  exports: [KonamiCodeDirective],
  imports: [CommonModule],
})
export class CoreModule {}
