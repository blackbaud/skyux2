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
  SkyPopoverAlignment,
  SkyPopoverPlacement,
  SkyPopoverTrigger
} from './types';

import { SkyPopoverComponent } from './popover.component';

@Directive({
  selector: '[skyPopover]'
})
export class SkyPopoverDirective {
  @Input()
  public skyPopover: SkyPopoverComponent;

  @Input()
  public skyPopoverAlignment: SkyPopoverAlignment;

  @Input()
  public skyPopoverPlacement: SkyPopoverPlacement;

  @Input()
  public skyPopoverTrigger: SkyPopoverTrigger = 'click';

  constructor(
    public elementRef: ElementRef,
    private windowRef: SkyWindowRefService
  ) { }

  @HostListener('window:resize')
  public onWindowResize() {
    if (this.skyPopover.isOpen) {
      this.positionPopover();
    }
  }

  @HostListener('click', ['$event'])
  public togglePopover(event: MouseEvent) {
    event.preventDefault();

    if (this.skyPopover.isOpen) {
      this.closePopover();
      return;
    }

    this.positionPopover();
  }

  @HostListener('keydown', ['$event'])
  public onKeyUp(event: KeyboardEvent) {
    const key = event.key.toLowerCase();
    if (key === 'tab') {
      this.closePopover();
    }
  }

  @HostListener('mouseenter', ['$event'])
  public onMouseEnter(event: MouseEvent) {
    if (this.skyPopoverTrigger === 'mouseenter') {
      event.preventDefault();
      this.positionPopover();
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
            this.closePopover();
          }
        }
      });
    }
  }

  private positionPopover() {
    this.skyPopover.positionNextTo(
      this.elementRef,
      this.skyPopoverPlacement,
      this.skyPopoverAlignment
    );
  }

  private closePopover() {
    this.skyPopover.close();
  }
}
