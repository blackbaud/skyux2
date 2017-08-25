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

  private movePopoverIntoPosition(): void {
    this.skyPopoverTarget.positionNextTo(this.elementRef, this.skyPopoverPlacement);
  }

  private isLastCaller(): boolean {
    return (
      this.skyPopoverTarget.lastCaller &&
      this.elementRef.nativeElement === this.skyPopoverTarget.lastCaller.nativeElement
    );
  }

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

    this.movePopoverIntoPosition();
  }

  @HostListener('document:click', ['$event'])
  private closePopover(event: MouseEvent): void {
    if (
      event.target === this.elementRef.nativeElement ||
      event.target === this.skyPopoverTarget.elementRef.nativeElement
    ) {
      return;
    }

    if (this.isLastCaller()) {
      event.preventDefault();
      this.skyPopoverTarget.hide();
    }
  }

  @HostListener('window:resize')
  private readjustOnResize(): void {
    if (this.isLastCaller()) {
      this.movePopoverIntoPosition();
    }
  }

  @HostListener('window:scroll')
  private readjustOnScroll(): void {
    if (this.isLastCaller()) {
      this.movePopoverIntoPosition();
    }
  }
}
