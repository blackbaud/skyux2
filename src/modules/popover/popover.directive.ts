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
    private elementRef: ElementRef) { }

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent) {
    event.preventDefault();
    this.togglePopover();
  }

  private togglePopover() {
    if (this.skyPopover.isOpen) {
      this.skyPopover.close();
      return;
    }

    this.skyPopover.positionNextTo(this.elementRef, this.skyPopoverPlacement);
  }
}
