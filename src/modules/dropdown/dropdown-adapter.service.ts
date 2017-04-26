import {
  ElementRef,
  EventEmitter,
  Injectable,
  Renderer
} from '@angular/core';

const CLS_OPEN = 'sky-dropdown-open';
const CLS_NO_SCROLL = 'sky-dropdown-no-scroll';

@Injectable()
export class SkyDropdownAdapterService {
  public dropdownClose = new EventEmitter<any>();
  private activeDropdownCount: number = 0;

  constructor() {
  }

  public showDropdown(dropdownEl: ElementRef, renderer: Renderer) {
    let buttonEl = this.getButtonEl(dropdownEl);
    let menuEl = this.getMenuEl(dropdownEl);

    if (!menuEl.classList.contains(CLS_OPEN)) {
      renderer.setElementClass(menuEl, CLS_OPEN, true);
      let isFullyVisible = this.setMenuLocation(menuEl, buttonEl, renderer);
      this.activeDropdownCount++;
      if (this.activeDropdownCount === 1) {
        let parentEl = this.getScrollableParentEl(dropdownEl);
        if (parentEl) {
          parentEl.classList.add(CLS_NO_SCROLL);
        }
      }
    }
  }

  public hideDropdown(dropdownEl: ElementRef, renderer: Renderer) {
    let menuEl = this.getMenuEl(dropdownEl);

    if (menuEl.classList.contains(CLS_OPEN)) {
      renderer.setElementClass(menuEl, CLS_OPEN, false);
      renderer.setElementStyle(menuEl, 'max-height', '');
      renderer.setElementStyle(menuEl, 'max-width', '');
      this.dropdownClose.emit(undefined);
      this.activeDropdownCount--;
      if (this.activeDropdownCount === 0) {
        let parentEl = this.getScrollableParentEl(dropdownEl);
        if (parentEl) {
          parentEl.classList.remove(CLS_NO_SCROLL);
        }
      }
    }
  }

  private setMenuLocation(menuEl: HTMLElement, buttonEl: HTMLElement, renderer: Renderer) {
    let possiblePositions = ['below', 'above', 'center'];
    let i: number;
    let fallbackVisibility: any = {
      visibleArea: 0
    };
    let fallbackCoordinates: any;
    let menuCoordinates: any;

    for (i = 0; i < possiblePositions.length; i++) {
      menuCoordinates = this.getElementCoordinates(buttonEl, menuEl, possiblePositions[i]);

      // Check if visible in viewport
      let elementVisibility = this.getElementVisibility(
        menuCoordinates.left,
        menuCoordinates.top,
        menuEl);

      if (elementVisibility.fitsInViewPort) {
        renderer.setElementStyle(menuEl, 'top', menuCoordinates.top + 'px');
        renderer.setElementStyle(menuEl, 'left', menuCoordinates.left + 'px');
        return true;
      } else if (elementVisibility.visibleArea >= fallbackVisibility.visibleArea) {
        fallbackVisibility = elementVisibility;
        fallbackCoordinates = menuCoordinates;
      }
    }

    /*
      None of the positions allowed the menu to be fully visible.
      In this case we put it in the upper left corner and set the max-height and width.
    */
    let viewportDimensions = this.getViewportDimensions();
    renderer.setElementStyle(menuEl, 'top', '0px');
    renderer.setElementStyle(menuEl, 'left','0px');
    renderer.setElementStyle(menuEl, 'max-height', viewportDimensions.height + 'px');
    renderer.setElementStyle(menuEl, 'max-width', viewportDimensions.width + 'px');

    return false;
  }

  private getElementCoordinates(
    originEl: HTMLElement,
    fixedEl: HTMLElement,
    position: string) {

    let fixedRect = fixedEl.getBoundingClientRect();
    let originRect = originEl.getBoundingClientRect();

    let leftPos: number;
    let topPos: number;

    if (position === 'below') {
      leftPos = originRect.left;
      topPos = originRect.top + originEl.offsetHeight;
    }

    if (position === 'above') {
      leftPos = originRect.left;
      topPos = originRect.top - fixedRect.height;
    }

    if (position === 'center') {
      leftPos = originRect.left + (originRect.width / 2) - (fixedRect.width / 2);
      topPos = originRect.top + (originRect.height / 2) - (fixedRect.height / 2);
    }

    return {
      left: leftPos,
      top: topPos
    };
  }

  private getElementVisibility(
    leftPos: number,
    topPos: number,
    el: HTMLElement): any {

    let viewportRect = this.getViewportDimensions();
    let elRect = el.getBoundingClientRect();

    let hiddenRightArea = leftPos + elRect.width - viewportRect.width;
    let hiddenLeftArea = 0 - leftPos;
    let hiddenBottomArea = topPos + elRect.height - viewportRect.height;
    let hiddenTopArea = 0 - topPos;

    let visibleMenuWidth
      = elRect.width - Math.max(0, hiddenRightArea) - Math.max(0, hiddenLeftArea);

    let visibleMenuHeight
      = elRect.height - Math.max(0, hiddenBottomArea) - Math.max(0, hiddenTopArea);

    let visibleArea = visibleMenuWidth * visibleMenuHeight;
    let fitsInViewPort = (elRect.width * elRect.height) === visibleArea;

    return {
      visibleArea: visibleArea,
      fitsInViewPort: fitsInViewPort
    };
  }

  private getViewportDimensions() {
    return {
      height: window.innerHeight,
      width: window.innerWidth
    };
  }

  private getScrollableParentEl(el: ElementRef): HTMLElement {
    let overflowY: string,
      parentEl = el.nativeElement.parentNode;

    while (parentEl !== undefined) {
      if (parentEl === document.body) {
        return parentEl;
      }

      overflowY = window.getComputedStyle(parentEl, null).overflowY;

      /*istanbul ignore else */
      /* sanity check  */
      if (overflowY) {
        switch (overflowY.toUpperCase()) {
        case 'AUTO':
        case 'HIDDEN':
        case 'SCROLL':
          return parentEl;
        }
      }

      parentEl = parentEl.parentNode;
    }
  }

  private getMenuEl(dropdownEl: ElementRef): HTMLElement {
    return dropdownEl.nativeElement.querySelector('.sky-dropdown-menu');
  }

  private getButtonEl(dropdownEl: ElementRef): HTMLElement {
    return dropdownEl.nativeElement.querySelector('.sky-dropdown-button');
  }
}
