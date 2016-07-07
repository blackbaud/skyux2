import {
  ElementRef,
  EventEmitter,
  Injectable,
  Renderer
} from '@angular/core';

const CLS_OPEN = 'sky-dropdown-open';

@Injectable()
export class SkyDropdownAdapterService {
  public dropdownClose = new EventEmitter<any>();

  constructor(private renderer: Renderer) { }

  public showDropdown(dropdownEl: ElementRef) {
    let nativeEl = dropdownEl.nativeElement;

    let buttonEl = nativeEl.querySelector('.sky-dropdown-button');
    let menuEl = nativeEl.querySelector('.sky-dropdown-menu');

    let rect = buttonEl.getBoundingClientRect();

    let top = rect.top + document.body.scrollTop + buttonEl.offsetHeight;
    let left = rect.left + document.body.scrollLeft;

    this.renderer.setElementProperty(menuEl, 'top', top + 'px');
    this.renderer.setElementProperty(menuEl, 'left', left + 'px');
    this.renderer.setElementClass(menuEl, CLS_OPEN, true);

    let bodyClickHandler = () => {
      this.renderer.setElementClass(menuEl, CLS_OPEN, false);
      document.removeEventListener('click', bodyClickHandler);

      this.dropdownClose.emit(undefined);
    };

    setTimeout(() => {
      document.addEventListener('click', bodyClickHandler);
    }, 0);
  }
}
