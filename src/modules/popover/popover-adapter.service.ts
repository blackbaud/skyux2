import {
  ElementRef,
  Injectable,
  Renderer2
} from '@angular/core';

import {
  SkyWindowRefService
} from '../window';

import {
  SkyPopoverAdapterArrowCoordinates,
  SkyPopoverAdapterCoordinates,
  SkyPopoverAdapterElements,
  SkyPopoverAdapterParentDimensions,
  SkyPopoverAlignment,
  SkyPopoverPlacement,
  SkyPopoverPosition
} from './types';

@Injectable()
export class SkyPopoverAdapterService {
  constructor(
    private renderer: Renderer2,
    private windowRef: SkyWindowRefService
  ) { }

  public getPopoverPosition(
    elements: SkyPopoverAdapterElements,
    placement: SkyPopoverPlacement,
    alignment: SkyPopoverAlignment
  ): SkyPopoverPosition {
    const max = 4;

    let counter = 0;
    let coords: SkyPopoverAdapterCoordinates = {
      top: undefined,
      left: undefined,
      isOutsideViewport: true
    };

    if (!placement || placement === 'fullscreen' || this.popoverLargerThanParent(elements)) {
      placement = 'fullscreen';
    } else {
      do {
        coords = this.getPopoverCoordinates(elements, placement, alignment);
        if (coords.isOutsideViewport) {
          placement = (counter % 2 === 0) ?
            this.getInversePlacement(placement) :
            this.getNextPlacement(placement);
        }
      } while (coords.isOutsideViewport && ++counter < max);

      if (counter === max) {
        placement = 'fullscreen';
      }
    }

    const arrowCoords = this.getArrowCoordinates(elements, coords, placement);

    return {
      top: coords.top,
      left: coords.left,
      arrowTop: arrowCoords.top,
      arrowLeft: arrowCoords.left,
      placement,
      alignment
    };
  }

  public hidePopover(elem: ElementRef): void {
    this.renderer.addClass(elem.nativeElement, 'sky-popover-hidden');
  }

  public showPopover(elem: ElementRef): void {
    this.renderer.removeClass(elem.nativeElement, 'sky-popover-hidden');
  }

  public clearConcreteDimensions(elem: ElementRef): void {
    this.renderer.removeStyle(elem.nativeElement, 'width');
    this.renderer.removeStyle(elem.nativeElement, 'height');
    this.renderer.removeClass(elem.nativeElement, 'sky-popover-placement-fullscreen');
  }

  private getPopoverCoordinates(
    elements: SkyPopoverAdapterElements,
    placement: SkyPopoverPlacement,
    alignment: SkyPopoverAlignment
  ): SkyPopoverAdapterCoordinates {
    const windowObj = this.windowRef.getWindow();
    const popoverRect = elements.popover.nativeElement.getBoundingClientRect();
    const callerRect = elements.caller.nativeElement.getBoundingClientRect();

    const scrollRight = windowObj.innerWidth + windowObj.pageXOffset;
    const scrollBottom = windowObj.innerHeight + windowObj.pageYOffset;

    let top: number;
    let left: number;
    let bleedRight = 0;
    let bleedTop = 0;
    let bleedBottom = 0;
    let isOutsideViewport = false;

    /* tslint:disable-next-line:switch-default */
    switch (placement) {
      case 'above':
      top = callerRect.top - popoverRect.height;
      bleedTop = top;
      break;

      case 'below':
      top = callerRect.top + callerRect.height;
      bleedBottom = scrollBottom - (top + popoverRect.height + windowObj.pageYOffset);
      break;

      case 'right':
      left = callerRect.left + callerRect.width;
      bleedRight = scrollRight - (left + popoverRect.width);
      break;

      case 'left':
      left = callerRect.left - popoverRect.width;
      break;
    }

    if (placement === 'right' || placement === 'left') {
      top = callerRect.top - (popoverRect.height / 2) + (callerRect.height / 2);
      bleedTop = windowObj.pageYOffset + top;
      bleedBottom = scrollBottom - top;
    }

    // Make adjustments based on horizontal alignment.
    if (placement === 'above' || placement === 'below') {
      /* tslint:disable-next-line:switch-default */
      switch (alignment) {
        case 'center':
        left = callerRect.left - (popoverRect.width / 2) + (callerRect.width / 2);
        bleedRight = scrollRight - (callerRect.left + (popoverRect.width / 2) + (callerRect.width / 2));
        break;

        case 'left':
        left = callerRect.left;
        bleedRight = scrollRight - (left + popoverRect.width);
        break;

        case 'right':
        left = callerRect.left - popoverRect.width + callerRect.width;
        bleedRight = scrollRight - callerRect.left + callerRect.width;
        break;
      }
    }

    // Clipped on left?
    if (left < 0) {
      if (placement === 'left') {
        isOutsideViewport = true;
      }

      left = 0;

      // Prevent popover's left boundary from leaving the bounds of the caller.
      if (callerRect.left < 0) {
        left = callerRect.left;
      }
    }

    // Clipped on right?
    if (bleedRight < 0) {
      if (placement === 'right') {
        isOutsideViewport = true;
      }

      left += bleedRight;

      // Prevent popover's right boundary from leaving the bounds of the caller.
      if (left + popoverRect.width < callerRect.left + callerRect.width) {
        left = callerRect.left - popoverRect.width + callerRect.width;
      }
    }

    // Clipped on top?
    if (bleedTop < 0) {
      if (placement === 'above') {
        isOutsideViewport = true;
      }

      top -= bleedTop;
    }

    // Clipped on bottom?
    if (bleedBottom < 0) {
      if (placement === 'below') {
        isOutsideViewport = true;
      }

      top += bleedBottom;
    }

    return {
      top,
      left,
      isOutsideViewport
    };
  }

  private getArrowCoordinates(
    elements: SkyPopoverAdapterElements,
    popoverCoords: SkyPopoverAdapterCoordinates,
    placement: SkyPopoverPlacement
  ): SkyPopoverAdapterArrowCoordinates {
    const callerRect = elements.caller.nativeElement.getBoundingClientRect();
    const popoverRect = elements.popover.nativeElement.getBoundingClientRect();

    let left: number;
    let top: number;

    switch (placement) {
      default:
      case 'above':
      case 'below':
      left = callerRect.left - popoverCoords.left + (callerRect.width / 2);
      break;

      case 'right':
      case 'left':
      top = callerRect.top - popoverCoords.top + (callerRect.height / 2);
      break;
    }

    // The arrow has exceded the bounds of the popover;
    // default to the CSS className position.
    if (left < 0 || left > popoverRect.width || isNaN(left)) {
      left = undefined;
    }

    return { top, left };
  }

  private popoverLargerThanParent(elements: SkyPopoverAdapterElements) {
    const parentDimensions = this.getParentDimensions();

    // Set concrete dimensions after we've determined the document height.
    this.setConcreteDimensions(elements.popover);

    const popoverRect = elements.popover.nativeElement.getBoundingClientRect();

    return (
      popoverRect.height > parentDimensions.height ||
      popoverRect.width > parentDimensions.width
    );
  }

  private getNextPlacement(placement: SkyPopoverPlacement): SkyPopoverPlacement {
    const placements: SkyPopoverPlacement[] = ['above', 'right', 'below', 'left'];
    const index = placements.indexOf(placement) + 1;
    return placements[index];
  }

  private getInversePlacement(placement: SkyPopoverPlacement): SkyPopoverPlacement {
    const pairings: any = { above: 'below', below: 'above', right: 'left', left: 'right' };
    return pairings[placement] as SkyPopoverPlacement;
  }

  private setConcreteDimensions(elementRef: ElementRef) {
    const element = elementRef.nativeElement;
    const rect = element.getBoundingClientRect();
    element.style.width = `${rect.width}px`;
    element.style.height = `${rect.height}px`;
  }

  private getParentDimensions(): SkyPopoverAdapterParentDimensions {
    const windowObj = this.windowRef.getWindow();

    const documentHeight = windowObj.document.body.clientHeight;
    const viewportHeight = windowObj.innerHeight;

    const width = windowObj.document.body.clientWidth;
    const height = (viewportHeight > documentHeight) ? viewportHeight : documentHeight;

    return {
      width,
      height
    };
  }
}
