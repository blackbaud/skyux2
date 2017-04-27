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
      this.setMenuLocation(menuEl, buttonEl, renderer, windowObj);
      let parentEl = this.getScrollableParentEl(dropdownEl, windowObj);
      let parentCount = this.updateActiveParentEl(parentEl, true);
      if (parentEl && parentCount === 1) {
        parentEl.classList.add(CLS_NO_SCROLL);
      }
    }
  }

  public hideDropdown(dropdownEl: ElementRef, renderer: Renderer, windowObj: Window) {
    let menuEl = this.getMenuEl(dropdownEl);

    if (menuEl.classList.contains(CLS_OPEN)) {

      renderer.setElementClass(menuEl, CLS_OPEN, false);
      this.setMenuStyles(
        renderer,
        menuEl,
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        ''
      );
      this.dropdownClose.emit(undefined);
      let parentEl = this.getScrollableParentEl(dropdownEl, windowObj);
      let parentCount = this.updateActiveParentEl(parentEl, false);
      if (parentEl && parentCount === 0) {
        parentEl.classList.remove(CLS_NO_SCROLL);
      }
    }
  }

  private setMenuStyles(
    renderer: Renderer,
    menuEl: HTMLElement,
    top: string,
    left: string,
    maxHeight: string,
    maxWidth: string,
    height: string,
    width: string,
    overflowX: string,
    overflowY: string) {

    renderer.setElementStyle(menuEl, 'top', top);
    renderer.setElementStyle(menuEl, 'left', left);
    renderer.setElementStyle(menuEl, 'max-height', maxHeight);
    renderer.setElementStyle(menuEl, 'max-width', maxWidth);
    renderer.setElementStyle(menuEl, 'height', height);
    renderer.setElementStyle(menuEl, 'width', width);
    renderer.setElementStyle(menuEl, 'overflow-y', overflowY);
    renderer.setElementStyle(menuEl, 'overflow-x', overflowX);
  }

  private updateActiveParentEl(parentEl: HTMLElement, isAdd: boolean) {
    let i: number;
    for (i = 0; i < this.activeParentEls.length; i++) {
      if (this.activeParentEls[i].el === parentEl) {
        if (isAdd) {
          this.activeParentEls[i].count++;
          return this.activeParentEls[i].count;
        } else if (this.activeParentEls[i].count > 1) {
          this.activeParentEls[i].count--;
          return this.activeParentEls[i].count;
        } else {
          this.activeParentEls.splice(i, 1);
          return 0;
        }
      }
    }

    if (isAdd) {
      this.activeParentEls.push({
        el: parentEl,
        count: 1
      });
      return 1;
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
        return;
      }
    }

    /*
      None of the positions allowed the menu to be fully visible.
      In this case we put it in the upper left corner and set the max-height and width.
    */
    this.setMenuStyles(
      renderer,
      menuEl,
      '0px',
      '0px',
      windowObj.innerHeight + 'px',
      windowObj.innerWidth + 'px',
      windowObj.innerHeight + 'px',
      windowObj.innerWidth + 'px',
      'auto',
      'auto'
    );

    return;
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
