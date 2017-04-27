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
  private activeParentEls: Array<any> = [];

  constructor() {
  }

  public showDropdown(dropdownEl: ElementRef, renderer: Renderer, windowObj: Window) {
    let buttonEl = this.getButtonEl(dropdownEl);
    let menuEl = this.getMenuEl(dropdownEl);

    /* istanbul ignore else */
    /* sanity check */
    if (!menuEl.classList.contains(CLS_OPEN)) {
      renderer.setElementClass(menuEl, CLS_OPEN, true);
      let isFullScreen = this.setMenuLocation(menuEl, buttonEl, renderer, windowObj);

      // Do not need to disable scroll when in full screen dropdown mode
      if (!isFullScreen) {
        this.setupParentScrollHandler(dropdownEl, windowObj, renderer);
      }

    }
  }

  public hideDropdown(dropdownEl: ElementRef, renderer: Renderer, windowObj: Window) {
    let menuEl = this.getMenuEl(dropdownEl);

    if (menuEl.classList.contains(CLS_OPEN)) {

      this.setDropdownDefaults(menuEl, renderer, windowObj, false);
      this.dropdownClose.emit(undefined);
      let parentEl = this.getScrollableParentEl(dropdownEl, windowObj);
      this.updateActiveParentEl(parentEl, false);
    }
  }

  private setupParentScrollHandler(dropdownEl: ElementRef, windowObj: Window, renderer: Renderer) {
    let parentEl = this.getScrollableParentEl(dropdownEl, windowObj);
    let currentIndex = this.updateActiveParentEl(parentEl, true);
    if (parentEl && this.activeParentEls[currentIndex].count === 1) {
      let listener: any;
      if (parentEl === document.body) {
        listener = renderer.listenGlobal('window', 'wheel', (evt: any) => {
          /* istanbul ignore next */
          /* sanity check */
          evt = evt || windowObj.event;
          evt.preventDefault();
          evt.stopPropagation();
          evt.returnValue = false;
        });

      } else {
        listener = renderer.listen(parentEl, 'wheel', (evt: any) => {
          evt.preventDefault();
          evt.stopPropagation();
          evt.returnValue = false;
        });
      }

      this.activeParentEls[currentIndex].listener = listener;
    }
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
    let overflowVal = isOpen ? 'auto': '';
    this.setMenuStyles(
      renderer,
      menuEl,
      topLeftVal,
      heightVal,
      widthVal,
      overflowVal,
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

  private updateActiveParentEl(parentEl: HTMLElement, isAdd: boolean) {
    let i: number;
    for (i = 0; i < this.activeParentEls.length; i++) {
      if (this.activeParentEls[i].el === parentEl) {
        if (isAdd) {
          this.activeParentEls[i].count++;
          return i;
        } else if (this.activeParentEls[i].count > 1) {
          this.activeParentEls[i].count--;
          return i;
        } else {
          this.activeParentEls[i].listener();
          this.activeParentEls.splice(i, 1);
          return -1;
        }
      }
    }

    if (isAdd) {
      this.activeParentEls.push({
        el: parentEl,
        count: 1
      });
      return this.activeParentEls.length - 1;
    }

  }

  private setMenuLocation(
    menuEl: HTMLElement,
    buttonEl: HTMLElement,
    renderer: Renderer,
    windowObj: Window) {
    let possiblePositions = ['below', 'above', 'center'];
    let i: number;

    for (i = 0; i < possiblePositions.length; i++) {
      let menuCoordinates = this.getElementCoordinates(buttonEl, menuEl, possiblePositions[i]);

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

    /*
      None of the positions allowed the menu to be fully visible.
      In this case we put it in the upper left corner and set the max-height and width.
    */
    this.setDropdownDefaults(menuEl, renderer, windowObj, true);

    return true;
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

  private getScrollableParentEl(el: ElementRef, windowObj: Window): HTMLElement {
    let overflowY: string,
      parentEl = el.nativeElement.parentNode;

    while (parentEl !== undefined && parentEl instanceof HTMLElement) {
      if (parentEl === document.body) {
        return parentEl;
      }

      overflowY = windowObj.getComputedStyle(parentEl, undefined).overflowY;

      /*istanbul ignore else */
      /* sanity check  */
      if (overflowY) {
        switch (overflowY.toUpperCase()) {
        case 'AUTO':
        case 'HIDDEN':
        case 'SCROLL':
          return parentEl;
        default:
          break;
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
