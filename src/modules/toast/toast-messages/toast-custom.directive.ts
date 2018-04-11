import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[sky-toast-custom]'
})
export class SkyCustomToastDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}