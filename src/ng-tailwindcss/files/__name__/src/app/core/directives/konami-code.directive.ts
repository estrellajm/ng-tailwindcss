import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appKonamiCode]',
})
export class KonamiCodeDirective {
  @Output() private codeEntered: EventEmitter<boolean> = new EventEmitter<boolean>();
  private sequence: number[] = [];
  // private konamiCode: number[] = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  private konamiCode: number[] = [38, 38, 40, 40, 37, 39, 37, 39];

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // console.log(event);
    // console.log(event.code);
    // console.log(event.keyCode);
    
    if (event.keyCode) {
      this.sequence.push(event.keyCode);

      if (this.sequence.length > this.konamiCode.length) {
        this.sequence.shift();
      }

      if (this.isKonamiCode()) {
        this.codeEntered.emit(true);
      } else {
        this.codeEntered.emit(false);
      }
    }
  }
  constructor() {}

  private isKonamiCode(): boolean {
    return this.konamiCode.every(
      (code: number, index: number) => code === this.sequence[index]
    );
  }
}
