import { Directive, ElementRef, HostListener, Input, OnInit, ChangeDetectorRef } from '@angular/core';

/* tslint:disable */
let tabbableSelector = 'a[href], area[href], input:not([disabled]):not([tabindex=\'-1\']), ' +
        'button:not([disabled]):not([tabindex=\'-1\']),select:not([disabled]):not([tabindex=\'-1\']), textarea:not([disabled]):not([tabindex=\'-1\']), ' +
        'iframe, object, embed, *[tabindex]:not([tabindex=\'-1\']), *[contenteditable=true]';
/* tslint:enable */

@Directive({
  selector: '[skyContainFocus]'
})
export class SkyContainFocusDirective implements OnInit {

  constructor(private elRef: ElementRef, private changeDetectorRef: ChangeDetectorRef) {
    console.log('load');
  }

  public ngOnInit() {
    console.log('init happened');
    this.changeDetectorRef.detectChanges();
  }

  @HostListener('document:keydown', ['$event'])
  public onDocumentKeyDown(event: KeyboardEvent) {
    console.log('key');
    if (event.which === 9) { // Tab pressed
      console.log('tab');
      let focusChanged = false;

      let focusElementList = this.loadFocusElementList();

      if (
        event.shiftKey &&
        (this.isFocusInFirstItem(event, focusElementList) ||
        this.isModalFocused(event, this.elRef))) {

        focusChanged = this.focusLastElement(focusElementList);
      } else if (this.isFocusInLastItem(event, focusElementList)) {
        focusChanged = this.focusFirstElement(focusElementList); // If focus is on the last element
      }

      if (focusChanged) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  }

  public loadFocusElementList(): Array<HTMLElement> {
    let elements: Array<HTMLElement>
      = Array.prototype.slice.call(this.elRef.nativeElement.querySelectorAll(tabbableSelector));

    return elements.filter((element) => {
      return this.isVisible(element);
    });
  }

  public isFocusInFirstItem(event: KeyboardEvent, list: Array<HTMLElement>): boolean {
    /* istanbul ignore next */
    /* sanity check */
    let eventTarget = event.target || event.srcElement;
    return list.length > 0 && eventTarget === list[0];
  }

  public isFocusInLastItem(event: KeyboardEvent, list: Array<HTMLElement>): boolean {
    /* istanbul ignore next */
    /* sanity check */
    let eventTarget = event.target || event.srcElement;
    return list.length > 0 && eventTarget === list[list.length - 1];
  }

  public isModalFocused(event: KeyboardEvent, modalEl: ElementRef): boolean {
    /* istanbul ignore next */
    /* sanity check */
    let eventTarget = event.target || event.srcElement;
    return modalEl &&
    eventTarget === modalEl.nativeElement.querySelector('.sky-modal-dialog');
  }

  public focusLastElement(list: Array<HTMLElement>): boolean {
    if (list.length > 0) {
      list[list.length - 1].focus();
      return true;
    }
    return false;
  }

  public focusFirstElement(list: Array<HTMLElement>): boolean {
    if (list.length > 0) {
      list[0].focus();
      return true;
    }
    return false;
  }

  private isVisible(element: HTMLElement) {
    return !!(element.offsetWidth ||
      element.offsetHeight ||
      element.getClientRects().length);
  }

}
