import {
  ElementRef,
  Injectable,
  Renderer2
} from '@angular/core';

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
  constructor(
    private renderer: Renderer2,
    private windowRef: SkyWindowRefService) { }

  public setPopoverPosition(
    elements: SkyPopoverAdapterElements,
    placement: SkyPopoverPlacement = 'above'
  ) {
    this.clearElementCoordinates(elements.popover);
    this.clearElementCoordinates(elements.popoverArrow);

    const coords = this.getVisibleCoordinates(elements, placement);

    this.setElementCoordinates(elements.popover, coords.top, coords.left);
    this.setElementCoordinates(elements.popoverArrow, coords.arrowTop, coords.arrowLeft);
  }

  public hidePopover(elem: ElementRef): void {
    this.renderer.addClass(elem.nativeElement, 'hidden');
  }

  public showPopover(elem: ElementRef): void {
    this.renderer.removeClass(elem.nativeElement, 'hidden');
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
        placement = this.getNextPlacement(placement);
      }
    } while (coords.isOutsideViewport && ++counter < max);

    if (counter === max) {
      placement = this.getInversePlacement(placement);
      coords = this.getCoordinates(elements, placement);
    }

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

    // tslint:disable:switch-default
    // All possible types are represented; default unnecessary.
    switch (placement) {
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
    // tslint:enable:switch-default

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
    if (top + popoverRect.height >= documentHeight) {
      if (placement === 'below') {
        isOutsideViewport = true;
      }

      if (placement === 'left' || placement === 'right') {
        arrowTop = documentHeight - callerRect.top - window.pageYOffset + callerRect.height;
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

  private clearElementCoordinates(elem: ElementRef): void {
    this.renderer.removeStyle(elem.nativeElement, 'top');
    this.renderer.removeStyle(elem.nativeElement, 'left');
  }

  private setElementCoordinates(elem: ElementRef, top: number, left: number) {
    let topStyle;
    let leftStyle;

    if (top !== undefined) {
      topStyle = `${top}px`;
    }

    if (left !== undefined) {
      leftStyle = `${left}px`;
    }

    this.renderer.setStyle(elem.nativeElement, 'top', topStyle);
    this.renderer.setStyle(elem.nativeElement, 'left', leftStyle);
  }

  private getNextPlacement(placement: SkyPopoverPlacement): SkyPopoverPlacement {
    const placements: SkyPopoverPlacement[] = ['above', 'below', 'right', 'left'];

    let index = placements.indexOf(placement) + 1;
    if (index === placements.length) {
      index = 0;
    }

    return placements[index];
  }

  private getInversePlacement(placement: SkyPopoverPlacement): SkyPopoverPlacement {
    const pairings = { above: 'below', below: 'above', right: 'left', left: 'right' };
    return pairings[placement] as SkyPopoverPlacement;
  }
}
