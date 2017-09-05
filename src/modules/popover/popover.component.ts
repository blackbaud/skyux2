import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';

import {
  AnimationEvent,
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { SkyWindowRefService } from '../window';
import { SkyPopoverPlacement } from './index';

export interface SkyPopoverCoordinates {
  top: number;
  left: number;
  arrowTop: number;
  arrowLeft: number;
  isOutsideViewport: boolean;
}

@Component({
  selector: 'sky-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  animations: [
    trigger('popoverState', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('hidden => visible', animate('150ms')),
      transition('visible => hidden', animate('150ms'))
    ])
  ]
})
export class SkyPopoverComponent {
  @Input()
  public popoverTitle: string;

  @Input()
  public placement: SkyPopoverPlacement;

  @Output()
  public popoverOpened: EventEmitter<SkyPopoverComponent>;

  @Output()
  public popoverClosed: EventEmitter<SkyPopoverComponent>;

  @ViewChild('popoverContainer')
  public popoverContainer: ElementRef;

  @ViewChild('popoverArrow')
  public popoverArrow: ElementRef;
  public isOpen = false;

  private lastCaller: ElementRef;
  private isMouseEnter = false;
  private defaultPlacement: SkyPopoverPlacement = 'above';

  constructor(
    private renderer: Renderer2,
    private windowRef: SkyWindowRefService
  ) {
    this.placement = this.defaultPlacement;
    this.popoverOpened = new EventEmitter<SkyPopoverComponent>();
    this.popoverClosed = new EventEmitter<SkyPopoverComponent>();
  }

  @HostListener('window:resize')
  public adjustOnResize() {
    this.positionNextTo(this.lastCaller, this.placement);
  }

  @HostListener('document:keyup', ['$event'])
  public closeOnEscapeKeyPressed(event: KeyboardEvent): void {
    if (this.isOpen && event.which === 27) {
      this.close();
    }
  }

  @HostListener('document:click', ['$event'])
  public closeOnDocumentClick(event: MouseEvent): void {
    if (this.isOpen && !this.isMouseEnter) {
      this.close();
    }
  }

  @HostListener('mouseenter')
  public onMouseEnter() {
    this.isMouseEnter = true;
  }

  @HostListener('mouseleave')
  public onMouseLeave() {
    this.isMouseEnter = false;
  }

  public positionNextTo(caller: ElementRef, placement: SkyPopoverPlacement) {
    if (!caller) {
      return;
    }

    this.lastCaller = caller;
    this.placement = placement || this.defaultPlacement;

    // Wait for a tick to allow placement styles to render.
    this.windowRef.getWindow().setTimeout(() => {
      const coords = this.getVisibleCoordinates();
      this.setElementCoordinates(this.popoverContainer, coords.top, coords.left);
      this.setElementCoordinates(this.popoverArrow, coords.arrowTop, coords.arrowLeft);
      this.isOpen = true;
    });
  }

  public close() {
    this.lastCaller = undefined;
    this.isOpen = false;
  }

  public getPlacementClassName(): string {
    return `sky-popover-placement-${this.placement}`;
  }

  public onAnimationStart(event: AnimationEvent) {
    if (event.fromState === 'void') {
      return;
    }

    if (event.toState === 'visible') {
      this.renderer.removeClass(this.popoverContainer.nativeElement, 'hidden');
    }
  }

  public onAnimationDone(event: AnimationEvent) {
    if (event.fromState === 'void') {
      return;
    }

    if (event.toState === 'hidden') {
      this.renderer.addClass(this.popoverContainer.nativeElement, 'hidden');
      this.popoverClosed.emit(this);
    } else {
      this.popoverOpened.emit(this);
    }
  }

  public getAnimationState(): string {
    return (this.isOpen) ? 'visible' : 'hidden';
  }

  private getVisibleCoordinates(): SkyPopoverCoordinates {
    const max = 5; // If all cardinal directions fail, just mirror the placement (4 plus 1)

    let counter = 0;
    let coords: SkyPopoverCoordinates;

    do {
      coords = this.getCoordinates();
    } while (coords.isOutsideViewport && ++counter < max);

    return coords;
  }

  private getCoordinates(): SkyPopoverCoordinates {
    const callerRect = this.lastCaller.nativeElement.getBoundingClientRect();
    const popoverRect = this.popoverContainer.nativeElement.getBoundingClientRect();
    const window = this.windowRef.getWindow();

    const documentWidth = window.document.body.clientWidth;
    const documentHeight = window.document.body.clientHeight;
    const placement = this.placement;

    const leftCenter = callerRect.left - (popoverRect.width / 2) + (callerRect.width / 2);
    const topCenter = callerRect.top - (popoverRect.height / 2) + (callerRect.height / 2);

    let top;
    let left;
    let arrowTop;
    let arrowLeft;

    switch (placement) {
      default:
      case 'above':
        left = leftCenter;
        top = callerRect.top - popoverRect.height;
        arrowLeft = (popoverRect.width / 2);
        break;

      case 'below':
        left = leftCenter;
        top = callerRect.top + callerRect.height;
        arrowLeft = (popoverRect.width / 2);
        break;

      case 'right':
        top = topCenter;
        left = callerRect.right;
        arrowTop = (popoverRect.height / 2);
        break;

      case 'left':
        top = topCenter;
        left = callerRect.left - popoverRect.width;
        arrowTop = (popoverRect.height / 2);
        break;
    }

    left += window.pageXOffset;
    top += window.pageYOffset;

    // Clipped on the right?
    if (callerRect.right + (popoverRect.width / 2) > documentWidth) {
      if (placement === 'right') {
        this.placement = 'left';
      }

      if (placement === 'above' || placement === 'below') {
        arrowLeft = popoverRect.width - (documentWidth - callerRect.right + (callerRect.width / 2));
        left = documentWidth - popoverRect.width;
      }
    }

    // Clipped on the left?
    if (left <= 0) {
      if (placement === 'left') {
        this.placement = 'right';
      }

      if (placement === 'above' || placement === 'below') {
        arrowLeft = callerRect.left + (callerRect.width / 2);
        left = window.pageXOffset;
      }
    }

    // Clipped above?
    if (top <= 0) {
      if (placement === 'above') {
        this.placement = 'below';
      }

      if (placement === 'left' || placement === 'right') {
        arrowTop = callerRect.top + (callerRect.height / 2);
        top = window.pageYOffset;
      }
    }

    // Clipped below?
    if (top >= documentHeight) {
      if (placement === 'below') {
        this.placement = 'above';
      }

      if (placement === 'left' || placement === 'right') {
        arrowTop = callerRect.top + (callerRect.height / 2);
        top = documentHeight - popoverRect.height;
      }
    }

    const isOutsideViewport = (placement !== this.placement);

    return {
      top,
      left,
      arrowTop,
      arrowLeft,
      isOutsideViewport
    } as SkyPopoverCoordinates;
  }

  private setElementCoordinates(elem: ElementRef, top: number, left: number) {
    this.renderer.setStyle(elem.nativeElement, 'top', `${top}px`);
    this.renderer.setStyle(elem.nativeElement, 'left', `${left}px`);
  }
}
