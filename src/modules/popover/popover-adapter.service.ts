import {
  ElementRef,
  Injectable,
  Renderer2
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { SkyWindowRefService } from '../window';
import { SkyPopoverPlacement } from './index';

export interface SkyPopoverCoordinates {
  top: number;
  left: number;
  arrowTop: number;
  arrowLeft: number;
  isOutsideViewport: boolean;
}

export interface SkyPopoverAdapterElements {
  popover: ElementRef;
  popoverArrow: ElementRef;
  caller: ElementRef;
}

@Injectable()
export class SkyPopoverAdapterService {
  public placementChanges: Observable<SkyPopoverPlacement>;

  private placementSubject: Subject<SkyPopoverPlacement>;

  constructor(
    private renderer: Renderer2,
    private windowRef: SkyWindowRefService
  ) {
    this.placementSubject = new Subject<SkyPopoverPlacement>();
    this.placementChanges = this.placementSubject.asObservable();
  }

  public setPopoverPosition(
    elements: SkyPopoverAdapterElements,
    placement: SkyPopoverPlacement
  ) {
    const coords = this.getVisibleCoordinates(elements, placement);
    this.setElementCoordinates(elements.popover, coords.top, coords.left);
    this.setElementCoordinates(elements.popoverArrow, coords.arrowTop, coords.arrowLeft);
  }

  private getVisibleCoordinates(
    elements: SkyPopoverAdapterElements,
    placement: SkyPopoverPlacement
  ): SkyPopoverCoordinates {
    const max = 4;

    let counter = 0;
    let coords: SkyPopoverCoordinates;

    do {
      coords = this.getCoordinates(elements, placement);

      if (coords.isOutsideViewport) {
        placement = this.getInversePlacement(placement);
      }

    } while (coords.isOutsideViewport && ++counter < max);

    this.sendChanges(placement);

    return coords;
  }

  private getCoordinates(
    elements: SkyPopoverAdapterElements,
    placement: SkyPopoverPlacement
  ): SkyPopoverCoordinates {
    const callerRect = elements.caller.nativeElement.getBoundingClientRect();
    const popoverRect = elements.popover.nativeElement.getBoundingClientRect();
    const window = this.windowRef.getWindow();

    const documentWidth = window.document.body.clientWidth;
    const documentHeight = window.document.body.clientHeight;

    const leftCenter = callerRect.left - (popoverRect.width / 2) + (callerRect.width / 2);
    const topCenter = callerRect.top - (popoverRect.height / 2) + (callerRect.height / 2);

    let top;
    let left;
    let arrowTop;
    let arrowLeft;

    let isOutsideViewport = false;

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
        isOutsideViewport = true;
      }

      if (placement === 'above' || placement === 'below') {
        arrowLeft = popoverRect.width - (documentWidth - callerRect.right + (callerRect.width / 2));
        left = documentWidth - popoverRect.width;
      }
    }

    // Clipped on the left?
    if (left <= 0) {
      if (placement === 'left') {
        isOutsideViewport = true;
      }

      if (placement === 'above' || placement === 'below') {
        arrowLeft = callerRect.left + (callerRect.width / 2);
        left = window.pageXOffset;
      }
    }

    // Clipped above?
    if (top <= 0) {
      if (placement === 'above') {
        isOutsideViewport = true;
      }

      if (placement === 'left' || placement === 'right') {
        arrowTop = callerRect.top + (callerRect.height / 2);
        top = window.pageYOffset;
      }
    }

    // Clipped below?
    if (top >= documentHeight) {
      if (placement === 'below') {
        isOutsideViewport = true;
      }

      if (placement === 'left' || placement === 'right') {
        arrowTop = callerRect.top + (callerRect.height / 2);
        top = documentHeight - popoverRect.height;
      }
    }

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

  private getInversePlacement(placement: SkyPopoverPlacement): SkyPopoverPlacement {
    const pairings = { above: 'below', below: 'above', right: 'left', left: 'right' };
    return pairings[placement] as SkyPopoverPlacement;
  }

  private sendChanges(placement: SkyPopoverPlacement) {
    this.placementSubject.next(placement);
  }
}
