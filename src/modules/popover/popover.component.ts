import { Component, HostListener, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'sky-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class SkyPopoverComponent {
  @Input()
  public popoverTitle: string;

  @Input()
  public placement: string;
  public lastCaller: ElementRef;

  constructor(public elementRef: ElementRef) {
    this.hide();
  }

  public positionNextTo(caller: ElementRef, placement: string): void {
    this.lastCaller = caller;
    this.placement = placement;

    setTimeout(() => {
      const callerRect = caller.nativeElement.getBoundingClientRect();
      const popoverRect = this.elementRef.nativeElement.getBoundingClientRect();

      let left;
      let top;

      switch (placement) {
        default:
        case 'top':
          left = callerRect.left - (popoverRect.width / 2) + (callerRect.width / 2);
          top = callerRect.top - popoverRect.height;
          break;
        case 'right':
          left = callerRect.right;
          top = callerRect.top - (popoverRect.height / 2) + (callerRect.height / 2);
          break;
        case 'bottom':
          left = callerRect.left - (popoverRect.width / 2) + (callerRect.width / 2);
          top = callerRect.bottom;
          break;
        case 'left':
          left = callerRect.left - popoverRect.width;
          top = callerRect.top - (popoverRect.height / 2) + (callerRect.height / 2);
          break;
      }

      this.setElementCoordinates(top, left);
    });
  }

  // Don't close the popover if it is clicked.
  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  public hide(): void {
    this.lastCaller = undefined;
    this.setElementCoordinates(-999999, 0);
  }

  public getPlacementClassName(): any {
    return `sky-popover-placement-${this.placement}`;
  }

  private setElementCoordinates(top: number, left: number): void {
    this.elementRef.nativeElement.style.left = `${left}px`;
    this.elementRef.nativeElement.style.top = `${top}px`;
  }
}
