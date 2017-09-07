import {
  Directive,
  ElementRef,
  HostListener,
  Input
} from '@angular/core';

import {
  SkyPopoverComponent,
  SkyPopoverPlacement
} from './index';

@Directive({
  selector: '[skyPopover]'
})
export class SkyPopoverDirective {
  @Input()
  public skyPopover: SkyPopoverComponent;

  @Input()
  public skyPopoverPlacement: SkyPopoverPlacement;

  constructor(
    public elementRef: ElementRef) { }

  @HostListener('click', ['$event'])
  public togglePopover(event: MouseEvent) {
    event.preventDefault();

    if (this.skyPopover.isOpen) {
      this.skyPopover.close();
      return;
    }

    this.skyPopover.positionNextTo(this.elementRef, this.skyPopoverPlacement);
  }
}
