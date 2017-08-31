import {
  AfterContentInit,
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

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { SkyMediaQueryService } from '../media-queries/media-query.service';
import { SkyMediaBreakpoints } from '../media-queries/media-breakpoints';
import { SkyPopoverCloseDirective } from './popover-close.directive';
import { SkyWindowRefService } from '../window';

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
export class SkyPopoverComponent implements AfterContentInit {
  @Input()
  public popoverTitle: string;

  @Input()
  public placement: string;

  @Output()
  public popoverOpened: EventEmitter<SkyPopoverComponent> = new EventEmitter<SkyPopoverComponent>();

  @Output()
  public popoverClosed: EventEmitter<SkyPopoverComponent> = new EventEmitter<SkyPopoverComponent>();

  @ContentChild(SkyPopoverCloseDirective)
  public skyPopoverClose: SkyPopoverCloseDirective;

  @ViewChild('popoverContainer')
  public popoverContainer: ElementRef;

  @ViewChild('popoverArrow')
  public popoverArrow: ElementRef;

  public lastCaller: ElementRef;
  public isMouseEnter = false;

  private isVisible = false;

  constructor(
    private renderer: Renderer2,
    private mediaQueryService: SkyMediaQueryService,
    private windowRef: SkyWindowRefService) { }

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

    // if (this.isMobile()) {
    //   this.show();
    //   return;
    // }

    // Wait for a tick
    setTimeout(() => {
      const result = this.determineCoordinates(caller);
      this.renderer.setStyle(this.popoverArrow.nativeElement, 'left', `${result.arrowLeft}px`);
      this.renderer.setStyle(this.popoverArrow.nativeElement, 'top', `${result.arrowTop}px`);
      // this.toggleArrowVisibility(!result.adjustedToFitViewport);
      this.setPopoverCoordinates(result.top, result.left);
      this.show();
    }, 0);
  }

  public show(): void {
    this.isVisible = true;
  }

  public hide(): void {
    this.lastCaller = undefined;
    this.isVisible = false;
  }

  public getPlacementClassName(): any {
    if (this.placement) {
      return `sky-popover-placement-${this.placement}`;
    }
  }

  public getState(): string {
    return (this.isVisible) ? 'visible' : 'hidden';
  }

  public onAnimationChanged(event: any): void {
    if (event.fromState === 'void') {
      return;
    }

    if (event.phaseName === 'done') {
      if (event.toState === 'hidden') {
        this.renderer.addClass(this.popoverContainer.nativeElement, 'hidden');
        this.popoverClosed.emit(this);
      } else {
        this.popoverOpened.emit(this);
      }
    } else {
      if (event.toState === 'visible') {
        this.renderer.removeClass(this.popoverContainer.nativeElement, 'hidden');
      }
    }
  }

  private determineCoordinates(caller: ElementRef): any {
    const isMobile = this.isMobile();

    const callerRect = caller.nativeElement.getBoundingClientRect();
    const popoverRect = this.popoverContainer.nativeElement.getBoundingClientRect();
    const arrowRect = this.popoverArrow.nativeElement.getBoundingClientRect();
    const window = this.windowRef.getWindow();

    const documentWidth = window.document.body.clientWidth;
    const documentHeight = window.document.body.clientHeight;
    const screenX = window.pageXOffset;
    const screenY = window.pageYOffset;

    if (!this.popoverContainer.nativeElement.style.width) {
      this.popoverContainer.nativeElement.style.width = `${popoverRect.width}px`;
    }

    let left;
    let top;
    let arrowLeft;
    let arrowTop;

    switch (this.placement) {
      default:
      case 'top':
        left = callerRect.left - (popoverRect.width / 2) + (callerRect.width / 2);
        top = callerRect.top - popoverRect.height;
        arrowLeft = (popoverRect.width / 2);
        break;
      case 'right':
        left = callerRect.right;
        top = callerRect.top - (popoverRect.height / 2) + (callerRect.height / 2);
        arrowTop = (popoverRect.height / 2);
        break;
      case 'bottom':
        left = callerRect.left - (popoverRect.width / 2) + (callerRect.width / 2);
        top = callerRect.bottom;
        arrowLeft = (popoverRect.width / 2);
        break;
      case 'left':
        left = callerRect.left - popoverRect.width;
        top = callerRect.top - (popoverRect.height / 2) + (callerRect.height / 2);
        arrowTop = (popoverRect.height / 2);
        break;
    }

    left += screenX;
    top += screenY;

    if (isMobile) {
      return { top, left, arrowTop, arrowLeft };
    }

    // let adjustedToFitViewport = false;

    // Clipped at right of screen?
    if (callerRect.right + popoverRect.width > documentWidth) {
      console.log('clipped at right');
      if (this.placement === 'top' || this.placement === 'bottom') {
        // Move arrow to follow the trigger element.
        console.log(documentWidth, callerRect.right);
        arrowLeft = popoverRect.width - (documentWidth - callerRect.right + (callerRect.width / 2));
        left = documentWidth - popoverRect.width;
        // adjustedToFitViewport = true;
      } else if (this.placement === 'right') {
        this.setPlacement('left');
        return this.determineCoordinates(caller);
      }
    }

    // Clipped at left of screen?
    if (left <= 0) {
      console.log('clipped at left');
      if (this.placement === 'top' || this.placement === 'bottom') {
        // Move arrow to follow the trigger element.
        arrowLeft = callerRect.left + (callerRect.width / 2);
        left = screenX;
        // adjustedToFitViewport = true;
      } else if (this.placement === 'left') {
        this.setPlacement('right');
        return this.determineCoordinates(caller);
      }
    }

    // Clipped at top of screen?
    if (top <= 0) {
      if (this.placement === 'left' || this.placement === 'right') {
        // Move arrow to follow the trigger element.
        arrowTop = callerRect.top + (callerRect.height / 2);
        top = screenY;
        // adjustedToFitViewport = true;
      } else if (this.placement === 'top') {
        this.setPlacement('bottom');
        return this.determineCoordinates(caller);
      }
    }

    // Clipped at bottom of screen?
    if (top >= documentHeight) {
      if (this.placement === 'left' || this.placement === 'right') {
        // Move arrow to follow the trigger element.
        arrowTop = callerRect.top + (callerRect.height / 2);
        top = documentHeight - popoverRect.height;
        // adjustedToFitViewport = true;
      } else if (this.placement === 'bottom') {
        this.setPlacement('top');
        return this.determineCoordinates(caller);
      }
    }

    // if (this.placement === 'left' && arrowLeft < popoverRect.width) {
    //   arrowLeft = popoverRect.width - arrowRect.width;
    // }

    // if (this.placement === 'right' && arrowLeft > 0) {
    //   arrowLeft = arrowRect.height * -1;
    // }

    return { top, left, arrowTop, arrowLeft };
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

  // private toggleArrowVisibility(show: boolean): void {
  //   // Hide the arrow if the popover is clipped outside the viewport.
  //   // (As the arrow wouldn't be trained on the trigger element anymore.)
  //   if (show) {
  //     this.renderer.removeClass(this.popoverContainer.nativeElement, 'hidden-arrow');
  //   } else {
  //     this.renderer.addClass(this.popoverContainer.nativeElement, 'hidden-arrow');
  //   }
  // }

  private isMobile(): boolean {
    return this.mediaQueryService.current === SkyMediaBreakpoints.xs;
  }

  @HostListener('window:resize')
  private adjustOnResize(): void {
    this.positionNextTo(this.lastCaller, this.placement);
  }

  // @HostListener('window:scroll')
  // private adjustOnScroll(): void {
  //   this.positionNextTo(this.lastCaller, this.placement);
  // }

  @HostListener('mouseenter', ['$event'])
  private handleMouseEnter(event: MouseEvent): void {
    this.isMouseEnter = true;
  }

  @HostListener('mouseleave', ['$event'])
  private handleMouseLeave(event: MouseEvent): void {
    this.isMouseEnter = false;
  }
}
