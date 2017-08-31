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

  constructor(
    private elementRef: ElementRef) { }

  private movePopoverIntoPosition(): void {
    this.skyPopoverTarget.positionNextTo(this.elementRef, this.skyPopoverPlacement);
  }

  // A popover may have more than one caller.
  // That being the case, we need to make sure this caller has "permission" to execute
  // requests against its specific target.
  private isLastCaller(callerElement: any): boolean {
    return (
      this.skyPopoverTarget.lastCaller &&
      callerElement === this.skyPopoverTarget.lastCaller.nativeElement
    );
  }

  private closePopover(): void {
    this.skyPopoverTarget.hide();
  }

  @HostListener('click', ['$event'])
  private togglePopover(event: MouseEvent) {
    event.preventDefault();

    const isRepeatedClick = (this.isLastCaller(event.target));

    if (isRepeatedClick) {
      this.closePopover();
      return;
    }

    this.movePopoverIntoPosition();
  }

  @HostListener('document:click', ['$event'])
  private closePopoverOnDocumentClick(event: MouseEvent): void {
    // Yield to the specific event handler above, if the user clicks on the trigger itself.
    if (event.target === this.elementRef.nativeElement) {
      return;
    }

    if (this.skyPopoverTarget.isMouseEnter) {
      return;
    }

    if (this.isLastCaller(this.elementRef.nativeElement)) {
      event.preventDefault();
      this.closePopover();
    }
  }

  @HostListener('document:keyup', ['$event'])
  private closeOnEscapeKeyPressed(event: KeyboardEvent): void {
    const isLastCaller = this.isLastCaller(this.elementRef.nativeElement);
    if (event.which === 27 && isLastCaller) {
      event.preventDefault();
      this.closePopover();
    }
  }
}
