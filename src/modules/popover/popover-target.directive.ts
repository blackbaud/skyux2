import {
  Directive,
  ElementRef,
  HostListener,
  Input
} from '@angular/core';

import { SkyPopoverComponent } from './popover.component';

@Directive({
  selector: '[skyPopoverTarget]'
})
export class SkyPopoverTargetDirective {
  @Input()
  public skyPopoverTarget: SkyPopoverComponent;

  @Input()
  public skyPopoverPlacement: string;

  constructor(private elementRef: ElementRef) { }

  @HostListener('click', ['$event'])
  private togglePopover(event: MouseEvent) {
    event.preventDefault();

    // Toggle display of popover
    const isRepeatedClick = (
      this.skyPopoverTarget.lastCaller &&
      event.target === this.skyPopoverTarget.lastCaller.nativeElement
    );

    if (isRepeatedClick) {
      this.skyPopoverTarget.hide();
      return;
    }

    this.skyPopoverTarget.positionNextTo(this.elementRef, this.skyPopoverPlacement);
  }

  @HostListener('document:click', ['$event'])
  private closePopover(event: MouseEvent): void {
    if (
      event.target === this.elementRef.nativeElement ||
      event.target === this.skyPopoverTarget.elementRef.nativeElement
    ) {
      return;
    }

    if (event.target !== this.skyPopoverTarget.elementRef.nativeElement) {
      const isLastCaller = (
        this.skyPopoverTarget.lastCaller &&
        this.elementRef.nativeElement === this.skyPopoverTarget.lastCaller.nativeElement
      );

      if (isLastCaller) {
        event.preventDefault();
        this.skyPopoverTarget.hide();
      }
    }
  }
}
