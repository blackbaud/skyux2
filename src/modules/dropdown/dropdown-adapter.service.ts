import {
  ElementRef,
  EventEmitter,
  Injectable,
  Renderer
} from '@angular/core';

import { SkyWindowRefService } from '../window';

const CLS_OPEN = 'sky-dropdown-open';
const CLS_NO_SCROLL = 'sky-dropdown-no-scroll';

@Injectable()
export class SkyDropdownAdapterService {
  public dropdownClose = new EventEmitter<any>();
  private scrollListeners: Function[] = [];

  public constructor(
    private renderer: Renderer,
    private windowRef: SkyWindowRefService
  ) { }

  public showDropdown(dropdownEl: ElementRef, alignment: string) {
    const menuEl = this.getMenuEl(dropdownEl);

    /* istanbul ignore else */
    if (!menuEl.classList.contains(CLS_OPEN)) {
      this.renderer.setElementClass(menuEl, CLS_OPEN, true);

      let isFullScreen = this.setMenuLocation(dropdownEl, alignment);

      // Do not need to disable scroll when in full screen dropdown mode
      if (!isFullScreen) {
        this.scrollListeners = this.setupParentScrollHandler(dropdownEl);
      }
    }
  }

  public hideDropdown(dropdownEl: ElementRef) {
    const menuEl = this.getMenuEl(dropdownEl);
    const buttonEl = this.getButtonEl(dropdownEl);

    if (menuEl.classList.contains(CLS_OPEN)) {
      this.setDropdownDefaults(menuEl, false);
      this.dropdownClose.emit(undefined);

      if (this.scrollListeners.length > 0) {
        for (let i = 0; i < this.scrollListeners.length; i++) {
          this.scrollListeners[i]();
        }

        this.scrollListeners = [];
      }
    }

    // Return focus to the trigger element.
    buttonEl.focus();
  }

  public setMenuLocation(dropdownEl: ElementRef, alignment: string) {
    const buttonEl = this.getButtonEl(dropdownEl);
    const menuEl = this.getMenuEl(dropdownEl);

    const possiblePositions = ['below', 'above', 'ycenter', 'center', 'ybottom', 'ytop'];
    const possibleAlignments = [alignment];

    if (alignment === 'right') {
      possibleAlignments.push('left');
    } else {
      possibleAlignments.push('right');
    }

    for (let n = 0; n < possibleAlignments.length; n++) {
      for (let i = 0; i < possiblePositions.length; i++) {
        const menuCoordinates = this.getElementCoordinates(
          buttonEl,
          menuEl,
          possiblePositions[i],
          possibleAlignments[n]
        );

        // Check if visible in viewport
        const elementVisibility = this.getElementVisibility(
          menuCoordinates.left,
          menuCoordinates.top,
          menuEl
        );

        if (elementVisibility.fitsInViewPort) {
          this.renderer.setElementStyle(menuEl, 'top', menuCoordinates.top + 'px');
          this.renderer.setElementStyle(menuEl, 'left', menuCoordinates.left + 'px');

          return false;
        }
      }
    }

    /*
      None of the positions allowed the menu to be fully visible.
      In this case we put it in the upper left corner and set the max-height and width.
    */
    this.setDropdownDefaults(menuEl, true);

    return true;
  }

  private setupParentScrollHandler(dropdownEl: ElementRef): Function[] {
    const parentEls = this.getAllScrollableParentEl(dropdownEl);
    const listeners: Function[] = [];

    /* istanbul ignore else */
    for (let i = 0; i < parentEls.length; i++) {
      const parentEl = parentEls[i];
      let listener: Function;

      if (parentEl === document.body) {
        listener = this.renderer.listenGlobal('window', 'scroll', () => {
          this.dropdownClose.emit(undefined);
          this.hideDropdown(dropdownEl);
        });

      } else {
        listener = this.renderer.listen(parentEl, 'scroll', () => {
          this.dropdownClose.emit(undefined);
          this.hideDropdown(dropdownEl);
        });
      }

      listeners.push(listener);
    }

    return listeners;
  }

  private setDropdownDefaults(menuEl: HTMLElement, isOpen: boolean) {
    const windowObj = this.windowRef.getWindow();

    this.renderer.setElementClass(menuEl, CLS_OPEN, isOpen);
    this.renderer.setElementClass(document.body, CLS_NO_SCROLL, isOpen);

    const topLeftVal = isOpen ? '10px' : '';
    const heightVal = isOpen ? (windowObj.innerHeight - 20) + 'px' : '';
    const widthVal = isOpen ? (windowObj.innerWidth - 20) + 'px' : '';
    const overflowVal = isOpen ? 'auto' : '';

    this.setMenuStyles(
      menuEl,
      topLeftVal,
      heightVal,
      widthVal,
      overflowVal
    );
  }

  private setMenuStyles(
    menuEl: HTMLElement,
    topLeftVal: string,
    heightVal: string,
    widthVal: string,
    overflowVal: string
  ) {
    this.renderer.setElementStyle(menuEl, 'top', topLeftVal);
    this.renderer.setElementStyle(menuEl, 'left', topLeftVal);
    this.renderer.setElementStyle(menuEl, 'max-height', heightVal);
    this.renderer.setElementStyle(menuEl, 'max-width', widthVal);
    this.renderer.setElementStyle(menuEl, 'height', heightVal);
    this.renderer.setElementStyle(menuEl, 'width', widthVal);
    this.renderer.setElementStyle(menuEl, 'overflow-y', overflowVal);
    this.renderer.setElementStyle(menuEl, 'overflow-x', overflowVal);
  }

  private getElementCoordinates(
    originEl: HTMLElement,
    fixedEl: HTMLElement,
    position: string,
    alignment: string
  ) {
    const fixedRect = fixedEl.getBoundingClientRect();
    const originRect = originEl.getBoundingClientRect();

    let leftPos: number;
    let topPos: number;

    if (position === 'center') {
      leftPos = originRect.left + (originRect.width / 2) - (fixedRect.width / 2);
      topPos = originRect.top + (originRect.height / 2) - (fixedRect.height / 2);

      return {
        left: leftPos,
        top: topPos
      };
    }

    if (alignment === 'right') {
      if (fixedRect.width > originRect.width) {
        leftPos = originRect.left - (fixedRect.width - originRect.width);
      } else {
        leftPos = originRect.left + (originRect.width - fixedRect.width);
      }
    } else {
      leftPos = originRect.left;
    }

    if (position === 'below') {
      topPos = originRect.top + originEl.offsetHeight;
    }

    if (position === 'above') {
      topPos = originRect.top - fixedRect.height;
    }

    if (position === 'ycenter') {
      topPos = originRect.top + (originRect.height / 2) - (fixedRect.height / 2);
    }

    if (position === 'ybottom') {
      topPos = fixedRect.height;
    }

    if (position === 'ytop') {
      topPos = 0;
    }

    return {
      left: leftPos,
      top: topPos
    };
  }

  private getElementVisibility(leftPos: number, topPos: number, el: HTMLElement): any {
    const elRect = el.getBoundingClientRect();
    const windowObj = this.windowRef.getWindow();

    const hiddenRightArea = leftPos + elRect.width - windowObj.innerWidth;
    const hiddenLeftArea = 0 - leftPos;
    const hiddenBottomArea = topPos + elRect.height - windowObj.innerHeight;
    const hiddenTopArea = 0 - topPos;

    const visibleMenuWidth = elRect.width - Math.max(0, hiddenRightArea) - Math.max(0, hiddenLeftArea);
    const visibleMenuHeight = elRect.height - Math.max(0, hiddenBottomArea) - Math.max(0, hiddenTopArea);

    const visibleArea = visibleMenuWidth * visibleMenuHeight;
    const fitsInViewPort = (elRect.width * elRect.height) === visibleArea;

    return {
      visibleArea,
      fitsInViewPort
    };
  }

  private getAllScrollableParentEl(el: ElementRef): HTMLElement[] {
    const result: Array<HTMLElement> = [document.body];
    const windowObj = this.windowRef.getWindow();

    let parentEl = el.nativeElement.parentNode;
    let overflowY: string;

    while (
      parentEl !== undefined &&
      parentEl instanceof HTMLElement &&
      parentEl !== document.body
    ) {
      overflowY = windowObj.getComputedStyle(parentEl, undefined).overflowY.toLowerCase();

      /*istanbul ignore else */
      if (overflowY) {
        switch (overflowY.toUpperCase()) {
        case 'AUTO':
        case 'HIDDEN':
        case 'SCROLL':
          result.push(parentEl);
          break;
        default:
          break;
        }
      }

      parentEl = parentEl.parentNode;
    }

    return result;
  }

  private getMenuEl(dropdownEl: ElementRef): HTMLElement {
    return dropdownEl.nativeElement.querySelector('.sky-dropdown-menu');
  }

  private getButtonEl(dropdownEl: ElementRef): HTMLElement {
    return dropdownEl.nativeElement.querySelector('.sky-dropdown-button');
  }
}
