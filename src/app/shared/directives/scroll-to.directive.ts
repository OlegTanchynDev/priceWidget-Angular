import {Directive, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appScrollTo]'
})
export class ScrollToDirective {

  constructor() { }

  @Input('appScrollTo')public appScrollTo: any;

  @HostListener('click')
  public  onClick() {
    if (this.appScrollTo instanceof HTMLElement) {
      const { offsetTop } = this.appScrollTo;
      const step = 15;
      let i = window.scrollY;
      if (i < offsetTop) {
        const interval = setInterval(() => {
          i + step > offsetTop ? i += 1 : i += step;
          window.scroll(0, i);
          if (i > offsetTop) {
            clearInterval(interval);
          }
        });
      } else {
        const interval = setInterval(() => {
          i + step < offsetTop  ? i -= 1 : i -= step;
          window.scroll(0, i);
          if (i < offsetTop) {
            clearInterval(interval);
          }
        });
      }
    }

  }

}
