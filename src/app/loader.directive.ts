import { Directive, ElementRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appLoader]'
})
export class LoaderDirective {

  constructor(viewContainerRef: ViewContainerRef) {
  }

}
