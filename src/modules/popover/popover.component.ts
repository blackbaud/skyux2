import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';

import { SkyPopoverCloseDirective } from './popover-close.directive';
import { SkyWindowRefService } from '../window';

@Component({
  selector: 'sky-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class SkyPopoverComponent implements AfterViewInit, AfterContentInit {
  @Input()
  public popoverTitle: string;

  @Input()
  public placement: string;

  @Output()
  public popoverOpened: EventEmitter<SkyPopoverComponent>;

  @Output()
  public popoverClosed: EventEmitter<SkyPopoverComponent>;

  @ContentChild(SkyPopoverCloseDirective)
  public skyPopoverClose: SkyPopoverCloseDirective;

  @ViewChild('popoverContainer')
  public popoverContainer: ElementRef;

  public lastCaller: ElementRef;
  public isVisible = false;

  constructor(
    private renderer: Renderer2,
    private windowRef: SkyWindowRefService) {
      this.popoverClosed = new EventEmitter<SkyPopoverComponent>();
      this.popoverOpened = new EventEmitter<SkyPopoverComponent>();
    }

  public ngAfterViewInit(): void {
    console.log('popover?', this.popoverContainer);
  }

  public ngAfterContentInit(): void {
    if (this.skyPopoverClose) {
      this.skyPopoverClose.target = this;
    }
  }

  public positionNextTo(caller: ElementRef, placement: string): void {
    if (!caller) {
      return;
    }

    this.lastCaller = caller;
    this.setPlacement(placement);

    // Wait for a tick
    setTimeout(() => {
      const result = this.determineCoordinates(caller);
      this.toggleArrowVisibility(!result.adjustedToFitViewport);
      this.setPopoverCoordinates(result.top, result.left);
      this.show();
    }, 0);
  }

  public show(): void {
    this.isVisible = true;
    this.renderer.removeClass(this.popoverContainer.nativeElement, 'hidden');
    this.popoverOpened.emit(this);
  }

  public hide(): void {
    this.lastCaller = undefined;
    this.isVisible = false;
    this.renderer.addClass(this.popoverContainer.nativeElement, 'hidden');
    this.popoverClosed.emit(this);
  }

  public getPlacementClassName(): any {
    if (this.placement) {
      return `sky-popover-placement-${this.placement}`;
    }
  }

  private determineCoordinates(caller: ElementRef): {
    top: number,
    left: number,
    adjustedToFitViewport: boolean
  } {
    const popoverElement = this.popoverContainer.nativeElement;
    const callerRect = caller.nativeElement.getBoundingClientRect();
    const popoverRect = popoverElement.getBoundingClientRect();
    const window = this.windowRef.getWindow();

    const documentWidth = window.document.body.clientWidth;
    const screenX = window.pageXOffset;
    const screenY = window.pageYOffset;

    let left;
    let top;

    // Set the width explicitly to better calculate when the popover is clipped in the viewport.
    if (!popoverElement.style.width) {
      this.renderer.setStyle(popoverElement, 'width', `${popoverRect.width}px`);
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

    let adjustedToFitViewport = false;

    if (callerRect.right + popoverRect.width > documentWidth) {
      left = documentWidth - popoverRect.width + screenX;
      adjustedToFitViewport = true;
    }

    if (left < 0) {
      left = screenX;
      adjustedToFitViewport = true;
    }

    if (top < 0) {
      top = screenY;
      adjustedToFitViewport = true;
    }

    return { top, left, adjustedToFitViewport };
  }

  private setPlacement(value: string): void {
    let placement;

    switch (value) {
      case 'top':
      case 'bottom':
      case 'left':
      case 'right':
        placement = value;
        break;
      default:
        placement = 'top';
        break;
    }

    this.placement = placement;
  }

  private setPopoverCoordinates(top: number, left: number): void {
    const elem = this.popoverContainer.nativeElement;
    this.renderer.setStyle(elem, 'left', `${left}px`);
    this.renderer.setStyle(elem, 'top', `${top}px`);
  }

  private toggleArrowVisibility(show: boolean): void {
    // Hide the arrow if the popover is clipped outside the viewport.
    // (As the arrow wouldn't be trained on the trigger element anymore.)
    if (show) {
      this.renderer.removeClass(this.popoverContainer.nativeElement, 'hidden-arrow');
    } else {
      this.renderer.addClass(this.popoverContainer.nativeElement, 'hidden-arrow');
    }
  }

  @HostListener('window:resize')
  private adjustOnResize(): void {
    this.positionNextTo(this.lastCaller, this.placement);
  }

  @HostListener('window:scroll')
  private adjustOnScroll(): void {
    this.positionNextTo(this.lastCaller, this.placement);
  }

  @HostListener('click', ['$event'])
  private preventCloseOperation(event: MouseEvent): void {
    // Don't close the popover if it is clicked, directly.
    event.stopPropagation();
  }
}
