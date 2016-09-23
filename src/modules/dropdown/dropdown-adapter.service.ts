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
    let buttonEl = this.getButtonEl(dropdownEl);
    let menuEl = this.getMenuEl(dropdownEl);

    let rect = buttonEl.getBoundingClientRect();

    let top = rect.top + document.body.scrollTop + buttonEl.offsetHeight;
    let left = rect.left + document.body.scrollLeft;

    this.renderer.setElementProperty(menuEl, 'top', top + 'px');
    this.renderer.setElementProperty(menuEl, 'left', left + 'px');
    this.renderer.setElementClass(menuEl, CLS_OPEN, true);
  }

  public hideDropdown(dropdownEl: ElementRef) {
    let menuEl = this.getMenuEl(dropdownEl);

    this.renderer.setElementClass(menuEl, CLS_OPEN, false);
    this.dropdownClose.emit(undefined);
  }

  private getMenuEl(dropdownEl: ElementRef) {
    return dropdownEl.nativeElement.querySelector('.sky-dropdown-menu');
  }

  private getButtonEl(dropdownEl: ElementRef) {
    return dropdownEl.nativeElement.querySelector('.sky-dropdown-button');
  }
}
