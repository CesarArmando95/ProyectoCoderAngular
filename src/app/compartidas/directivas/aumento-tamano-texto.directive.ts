import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAumentoTamanoTexto]'
})
export class AumentoTamanoTextoDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) 
  {
    this.setFontSize();
  }

  private setFontSize() {
    this.renderer.setStyle(this.el.nativeElement, 'fontSize', '20px');
  }
}
