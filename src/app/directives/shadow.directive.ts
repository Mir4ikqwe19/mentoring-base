import { Directive, ElementRef, HostBinding, HostListener, } from "@angular/core";

@Directive({
    selector:'[shadowDirect]',
    standalone:true
})
export class ShadowDirective {
    constructor(private shadow: ElementRef) {}

    @HostListener('mouseenter') 
    enter() {
      this.shadow.nativeElement.style.boxShadow = '0px 4px 10px #f0ba4e';
    }
  
    @HostListener('mouseleave')
    leave() {
      this.shadow.nativeElement.style.boxShadow = '10px 5px 5px #c9c9c9';
    }
}