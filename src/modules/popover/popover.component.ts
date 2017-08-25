import { Component, HostListener, Input, ElementRef, Renderer2 } from '@angular/core';

import { SkyWindowRefService } from '../window';

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

  constructor(
    public elementRef: ElementRef,
    private renderer: Renderer2,
    private windowRef: SkyWindowRefService) {
    this.hide();
  }

  public positionNextTo(caller: ElementRef, placement: string): void {
    this.lastCaller = caller;

    switch (placement) {
      case 'top':
      case 'bottom':
      case 'left':
      case 'right':
        this.placement = placement;
        break;
      default:
        this.placement = 'top';
        break;
    }

    setTimeout(() => {
      const callerRect = caller.nativeElement.getBoundingClientRect();
      const popoverRect = this.elementRef.nativeElement.getBoundingClientRect();
      const window = this.windowRef.getWindow();
      const documentWidth = window.document.body.clientWidth;
      const screenX = window.pageXOffset;
      const screenY = window.pageYOffset;

      let left;
      let top;

      if (!this.elementRef.nativeElement.style.width) {
        this.elementRef.nativeElement.style.width = popoverRect.width + 'px';
      }

      switch (this.placement) {
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

      left += screenX;
      top += screenY;

      // Maybe instead of doing all this crazy stuff, we just check if the
      // popover is clipped. If it is, just make it a modal?

      // Is the popover clipped on the right-hand side?
      if (callerRect.right + popoverRect.width > documentWidth) {
        left = documentWidth - popoverRect.width + screenX;
      }

      // Is the popover clipped on the left-hand side?
      if (left < 0) {
        left = screenX;
      }

      if (top < 0) {
        top = screenY;
      }

      console.log(popoverRect.width, documentWidth);

      if (popoverRect.width > documentWidth) {
        // The popover is larger than the screen.
        // Add a class that will make it behave more like a modal.
      }

      this.setElementCoordinates(top, left);
      this.show();
    });
  }

  public hide(): void {
    this.lastCaller = undefined;
    this.renderer.addClass(this.elementRef.nativeElement, 'hidden');
  }

  public show(): void {
    this.renderer.removeClass(this.elementRef.nativeElement, 'hidden');
  }

  public getPlacementClassName(): any {
    return `sky-popover-placement-${this.placement}`;
  }

  private setElementCoordinates(top: number, left: number): void {
    this.elementRef.nativeElement.style.left = `${left}px`;
    this.elementRef.nativeElement.style.top = `${top}px`;
  }

  // Don't close the popover if it is clicked.
  @HostListener('click', ['$event'])
  private onClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}
