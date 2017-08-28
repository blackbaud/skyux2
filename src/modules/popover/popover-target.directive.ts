import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output
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

  @Output()
  public skyPopoverOpened: EventEmitter<SkyPopoverComponent>;

  @Output()
  public skyPopoverClosed: EventEmitter<SkyPopoverComponent>;

  constructor(private elementRef: ElementRef) {
    this.skyPopoverClosed = new EventEmitter<SkyPopoverComponent>();
    this.skyPopoverOpened = new EventEmitter<SkyPopoverComponent>();
  }

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
    this.skyPopoverClosed.emit(this.skyPopoverTarget);
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
    this.skyPopoverOpened.emit(this.skyPopoverTarget);
  }

  @HostListener('document:click', ['$event'])
  private closePopoverOnDocumentClick(event: MouseEvent): void {
    // Yield to the specific event handler above, if the user clicks on the trigger itself.
    if (event.target === this.elementRef.nativeElement) {
      return;
    }

    if (this.isLastCaller(this.elementRef.nativeElement)) {
      event.preventDefault();
      this.closePopover();
    }
  }
}
