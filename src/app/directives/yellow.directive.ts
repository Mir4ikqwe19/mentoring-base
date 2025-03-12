import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector:'[yellowDirect]',
    standalone: true
})
export class YellowDirective {
    color = '#4B565E'

    @HostBinding('style.backgroundColor')
    get backgroundColor() {
        return this.color;
    }

    @HostListener('mouseenter')
    enter() {
        this.color = '#f0ba4e'
    }

    @HostListener('mouseleave')
    leave() {
        this.color = '#4B565E'
    }
}