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
  private scrollListeners: Array<Function> = [];

  constructor() {
  }

  public showDropdown(
    dropdownEl: ElementRef,
    renderer: Renderer,
    windowObj: Window,
    alignment: string) {

    let menuEl = this.getMenuEl(dropdownEl);

    /* istanbul ignore else */
    /* sanity check */
    if (!menuEl.classList.contains(CLS_OPEN)) {
      renderer.setElementClass(menuEl, CLS_OPEN, true);
      let isFullScreen = this.setMenuLocation(dropdownEl, renderer, windowObj, alignment);

      // Do not need to disable scroll when in full screen dropdown mode
      if (!isFullScreen) {
        this.scrollListeners = this.setupParentScrollHandler(dropdownEl, windowObj, renderer);
      }

    }
  }

  public hideDropdown(dropdownEl: ElementRef, renderer: Renderer, windowObj: Window) {
    let menuEl = this.getMenuEl(dropdownEl);

    if (menuEl.classList.contains(CLS_OPEN)) {

      this.setDropdownDefaults(menuEl, renderer, windowObj, false);
      this.dropdownClose.emit(undefined);

      if (this.scrollListeners.length > 0) {
        for (let i = 0; i < this.scrollListeners.length; i++) {
          this.scrollListeners[i]();
        }

        this.scrollListeners = [];
      }
    }
  }

  public setMenuLocation(
    dropdownEl: ElementRef,
    renderer: Renderer,
    windowObj: Window,
    alignment: string) {

    let buttonEl = this.getButtonEl(dropdownEl);
    let menuEl = this.getMenuEl(dropdownEl);

    let possiblePositions = ['below', 'above', 'ycenter', 'center', 'ybottom', 'ytop'];
    let possibleAlignments = [alignment];
    if (alignment === 'right') {
      possibleAlignments.push('left');
    } else {
      possibleAlignments.push('right');
    }
    let i: number;
    let n: number;
    for (n = 0; n < possibleAlignments.length; n++) {
      for (i = 0; i < possiblePositions.length; i++) {
        let menuCoordinates = this.getElementCoordinates(
          buttonEl,
          menuEl,
          possiblePositions[i],
          possibleAlignments[n]);

        // Check if visible in viewport
        let elementVisibility = this.getElementVisibility(
          menuCoordinates.left,
          menuCoordinates.top,
          menuEl,
          windowObj);

        if (elementVisibility.fitsInViewPort) {
          renderer.setElementStyle(menuEl, 'top', menuCoordinates.top + 'px');
          renderer.setElementStyle(menuEl, 'left', menuCoordinates.left + 'px');
          return false;
        }
      }
    }

    /*
      None of the positions allowed the menu to be fully visible.
      In this case we put it in the upper left corner and set the max-height and width.
    */
    this.setDropdownDefaults(menuEl, renderer, windowObj, true);

    return true;
  }

  private setupParentScrollHandler(
    dropdownEl: ElementRef,
    windowObj: Window,
    renderer: Renderer): Array<Function> {

    let parentEls = this.getAllScrollableParentEl(dropdownEl, windowObj);
    let listeners: Array<Function> = [];
    /* istanbul ignore else */
    /* sanity check */
    for (let i = 0; i < parentEls.length; i++) {
      let listener: Function;
      let parentEl = parentEls[i];
      if (parentEl === document.body) {
        listener = renderer.listenGlobal('window', 'scroll', () => {
          this.dropdownClose.emit(undefined);
          this.hideDropdown(dropdownEl, renderer, windowObj);
        });

      } else {
        listener = renderer.listen(parentEl, 'scroll', () => {
          this.dropdownClose.emit(undefined);
          this.hideDropdown(dropdownEl, renderer, windowObj);
        });
      }

      listeners.push(listener);

    }
    return listeners;
  }

  private setDropdownDefaults(
    menuEl: HTMLElement,
    renderer: Renderer,
    windowObj: Window,
    isOpen: boolean) {
    renderer.setElementClass(menuEl, CLS_OPEN, isOpen);
    renderer.setElementClass(document.body, CLS_NO_SCROLL, isOpen);
    let topLeftVal = isOpen ? '10px' : '';
    let heightVal = isOpen ? (windowObj.innerHeight - 20) + 'px' : '';
    let widthVal = isOpen ? (windowObj.innerWidth - 20) + 'px' : '';
    let overflowVal = isOpen ? 'auto' : '';
    this.setMenuStyles(
      renderer,
      menuEl,
      topLeftVal,
      heightVal,
      widthVal,
      overflowVal
    );
  }

  private setMenuStyles(
    renderer: Renderer,
    menuEl: HTMLElement,
    topLeftVal: string,
    heightVal: string,
    widthVal: string,
    overflowVal: string) {

    renderer.setElementStyle(menuEl, 'top', topLeftVal);
    renderer.setElementStyle(menuEl, 'left', topLeftVal);
    renderer.setElementStyle(menuEl, 'max-height', heightVal);
    renderer.setElementStyle(menuEl, 'max-width', widthVal);
    renderer.setElementStyle(menuEl, 'height', heightVal);
    renderer.setElementStyle(menuEl, 'width', widthVal);
    renderer.setElementStyle(menuEl, 'overflow-y', overflowVal);
    renderer.setElementStyle(menuEl, 'overflow-x', overflowVal);
  }

  private getElementCoordinates(
    originEl: HTMLElement,
    fixedEl: HTMLElement,
    position: string,
    alignment: string) {

    let fixedRect = fixedEl.getBoundingClientRect();
    let originRect = originEl.getBoundingClientRect();

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

  private getElementVisibility(
    leftPos: number,
    topPos: number,
    el: HTMLElement,
    windowObj: Window): any {

    let elRect = el.getBoundingClientRect();

    let hiddenRightArea = leftPos + elRect.width - windowObj.innerWidth;
    let hiddenLeftArea = 0 - leftPos;
    let hiddenBottomArea = topPos + elRect.height - windowObj.innerHeight;
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

  private getAllScrollableParentEl(el: ElementRef, windowObj: Window): Array<HTMLElement> {
    let overflowY: string,
      result: Array<HTMLElement> = [document.body],
      parentEl = el.nativeElement.parentNode;

    while (
      parentEl !== undefined &&
      parentEl instanceof HTMLElement &&
      parentEl !== document.body) {

      overflowY = windowObj.getComputedStyle(parentEl, undefined).overflowY;

      /*istanbul ignore else */
      /* sanity check  */
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
