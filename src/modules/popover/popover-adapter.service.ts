import {
  ElementRef,
  Injectable,
  Renderer2
} from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { SkyWindowRefService } from '../window';

import {
  SkyPopoverAlignment,
  SkyPopoverPlacement,
  SkyPopoverPlacementChange
} from './types';

export interface SkyPopoverCoordinates {
  top: number;
  left: number;
  isOutsideViewport: boolean;
  arrow?: SkyPopoverArrowCoordinates;
}

export interface SkyPopoverArrowCoordinates {
  top: number;
  left: number;
}

export interface SkyPopoverAdapterElements {
  popover: ElementRef;
  popoverArrow: ElementRef;
  caller: ElementRef;
}

@Injectable()
export class SkyPopoverAdapterService {
  public placementChanges = new Subject<SkyPopoverPlacementChange>();

  constructor(
    private renderer: Renderer2,
    private windowRef: SkyWindowRefService
  ) { }

  public setPopoverPosition(
    elements: SkyPopoverAdapterElements,
    placement: SkyPopoverPlacement,
    alignment: SkyPopoverAlignment
  ) {
    this.clearElementCoordinates(elements.popover);
    this.clearElementCoordinates(elements.popoverArrow);

    const coords = this.getVisibleCoordinates(elements, placement, alignment);

    this.setElementCoordinates(elements.popover, coords.top, coords.left);
    this.setElementCoordinates(elements.popoverArrow, coords.arrow.top, coords.arrow.left);
  }

  public hidePopover(elem: ElementRef): void {
    this.renderer.addClass(elem.nativeElement, 'hidden');
  }

  public showPopover(elem: ElementRef): void {
    this.renderer.removeClass(elem.nativeElement, 'hidden');
  }

  private getVisibleCoordinates(
    elements: SkyPopoverAdapterElements,
    placement: SkyPopoverPlacement,
    alignment: SkyPopoverAlignment
  ): SkyPopoverCoordinates {
    const originalPlacement = placement;
    const max = 4;

    let counter = 0;
    let coords: SkyPopoverCoordinates;

    do {
      coords = this.getPopoverCoordinates(elements, placement, alignment);
      if (coords.isOutsideViewport) {
        placement = this.getNextPlacement(placement);
      }
    } while (coords.isOutsideViewport && ++counter < max);

    if (counter === max) {
      placement = this.getInversePlacement(placement);
      coords = this.getPopoverCoordinates(elements, placement, alignment);
    }

    coords.arrow = this.getArrowCoordinates(elements, coords, placement);

    // Notify subscribers of placement change.
    if (originalPlacement !== placement) {
      this.placementChanges.next({ placement });
    }

    return coords;
  }

  private getPopoverCoordinates(
    elements: SkyPopoverAdapterElements,
    placement: SkyPopoverPlacement,
    alignment: SkyPopoverAlignment
  ): SkyPopoverCoordinates {
    const callerElement = elements.caller.nativeElement;
    const callerRect = callerElement.getBoundingClientRect();
    const callerOffsetTop = callerElement.offsetTop;
    const callerOffsetLeft = callerElement.offsetLeft;
    const popoverRect = elements.popover.nativeElement.getBoundingClientRect();

    const windowObj = this.windowRef.getWindow();
    const parentHeight = windowObj.document.body.clientHeight;

    let parentWidth: number;
    let left: number;
    let top: number;

    if (callerElement.offsetParent) {
      parentWidth = callerElement.offsetParent.getBoundingClientRect().width;
    } else {
      parentWidth = windowObj.document.body.clientWidth;
    }

    // Determine left position based on alignment:
    switch (alignment) {
      default:
      case 'center':
        left = callerOffsetLeft - (popoverRect.width / 2) + (callerRect.width / 2);
      break;
      case 'left':
        left = callerOffsetLeft;
      break;
      case 'right':
        left = callerOffsetLeft - popoverRect.width + callerRect.width;
      break;
    }

    switch (placement) {
      default:
      case 'above':
        top = callerOffsetTop - popoverRect.height;
        break;
      case 'below':
        top = callerOffsetTop + callerRect.height;
        break;
      case 'right':
        top = callerOffsetTop - (popoverRect.height / 2) + (callerRect.height / 2);
        left = callerOffsetLeft + callerRect.width;
        break;
      case 'left':
        top = callerOffsetTop - (popoverRect.height / 2) + (callerRect.height / 2);
        left = callerOffsetLeft - popoverRect.width;
        break;
    }

    let isOutsideViewport = false;
    let clippedOnRight: boolean;

    switch (alignment) {
      default:
      case 'center':
        clippedOnRight = (callerOffsetLeft + callerRect.width + (popoverRect.width / 2) > parentWidth);
      break;
      case 'left':
        clippedOnRight = (callerOffsetLeft + popoverRect.width > parentWidth);
      break;
      case 'right':
        clippedOnRight = (callerOffsetLeft + callerRect.width > parentWidth);
      break;
    }

    if (clippedOnRight) {
      if (placement === 'right') {
        isOutsideViewport = true;
      }

      if (placement === 'above' || placement === 'below') {
        left = parentWidth - popoverRect.width;
      }
    }

    // Clipped on the left?
    if (left <= 0) {
      if (placement === 'left') {
        isOutsideViewport = true;
      }

      if (placement === 'above' || placement === 'below') {
        left = windowObj.pageXOffset;
      }
    }

    // Clipped above?
    if (top <= 0) {
      if (placement === 'above') {
        isOutsideViewport = true;
      }

      if (placement === 'left' || placement === 'right') {
        top = windowObj.pageYOffset;
      }
    }

    // Clipped below?
    if (top + popoverRect.height >= parentHeight) {
      if (placement === 'below') {
        isOutsideViewport = true;
      }

      if (placement === 'left' || placement === 'right') {
        top = parentHeight - popoverRect.height;
      }
    }

    return {
      top,
      left,
      isOutsideViewport
    };
  }

  private getArrowCoordinates(
    elements: SkyPopoverAdapterElements,
    popoverCoords: SkyPopoverCoordinates,
    placement: SkyPopoverPlacement
  ): SkyPopoverArrowCoordinates {
    const callerRect = elements.caller.nativeElement.getBoundingClientRect();
    const popoverRect = elements.popover.nativeElement.getBoundingClientRect();

    const callerOffsetTop = elements.caller.nativeElement.offsetTop;
    const callerOffsetLeft = elements.caller.nativeElement.offsetLeft;

    let left: number;
    let top: number;

    switch (placement) {
      default:
      case 'above':
      case 'below':
        left = callerOffsetLeft - popoverCoords.left + (callerRect.width / 2);
      break;

      case 'right':
      case 'left':
        top = callerOffsetTop - popoverCoords.top + (callerRect.height / 2);
      break;
    }

    // The arrow has exceded the bounds of the popover;
    // default to the CSS className position.
    if (left < 0 || left > popoverRect.width) {
      left = undefined;
    }

    return { top, left };
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
