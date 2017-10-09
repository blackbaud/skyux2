import {
  Directive,
  ElementRef,
  HostListener,
  Input
} from '@angular/core';

import {
  SkyWindowRefService
} from '../window';

import {
  SkyPopoverComponent,
  SkyPopoverPlacement,
  SkyPopoverTrigger
} from './index';

@Directive({
  selector: '[skyPopover]'
})
export class SkyPopoverDirective {
  @Input()
  public skyPopover: SkyPopoverComponent;

  @Input()
  public skyPopoverPlacement: SkyPopoverPlacement;

  @Input()
  public skyPopoverTrigger: SkyPopoverTrigger = 'click';

  constructor(
    public elementRef: ElementRef,
    private windowRef: SkyWindowRefService
  ) { }

  @HostListener('click', ['$event'])
  public togglePopover(event: MouseEvent) {
    if (this.skyPopoverTrigger === 'click') {
      event.preventDefault();

      if (this.skyPopover.isOpen) {
        this.skyPopover.close();
        return;
      }

      this.skyPopover.positionNextTo(this.elementRef, this.skyPopoverPlacement);
    }
  }

  @HostListener('mouseenter', ['$event'])
  public onMouseEnter(event: MouseEvent) {
    if (this.skyPopoverTrigger === 'mouseenter') {
      event.preventDefault();

      this.skyPopover.positionNextTo(this.elementRef, this.skyPopoverPlacement);
    }
  }

  @HostListener('mouseleave', ['$event'])
  public onMouseLeave(event: MouseEvent) {
    if (this.skyPopoverTrigger === 'mouseenter') {
      event.preventDefault();

      // Give the popover a chance to set its isMouseEnter flag before checking to see
      // if it should be closed.
      this.windowRef.getWindow().setTimeout(() => {
        if (this.skyPopover.isOpen) {
          if (this.skyPopover.isMouseEnter) {
            this.skyPopover.markForCloseOnMouseLeave();
          } else {
            this.skyPopover.close();
          }
        }
      });
    }
  }
}
