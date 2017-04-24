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
      let rect = buttonEl.getBoundingClientRect();
      let top = rect.top + buttonEl.offsetHeight;
      let left = rect.left;

      renderer.setElementStyle(menuEl, 'top', top + 'px');
      renderer.setElementStyle(menuEl, 'left', left + 'px');
      renderer.setElementClass(menuEl, CLS_OPEN, true);
      this.activeDropdownCount++;
      if (this.activeDropdownCount === 1) {
        document.body.classList.add(CLS_NO_SCROLL);
      }
    }

  }

  public hideDropdown(dropdownEl: ElementRef, renderer: Renderer) {
    let menuEl = this.getMenuEl(dropdownEl);

    if (menuEl.classList.contains(CLS_OPEN)) {
      renderer.setElementClass(menuEl, CLS_OPEN, false);
      this.dropdownClose.emit(undefined);
      this.activeDropdownCount--;
      if (this.activeDropdownCount === 0) {
        document.body.classList.remove(CLS_NO_SCROLL);
      }
    }


  }

  private getMenuEl(dropdownEl: ElementRef) {
    return dropdownEl.nativeElement.querySelector('.sky-dropdown-menu');
  }

  private getButtonEl(dropdownEl: ElementRef) {
    return dropdownEl.nativeElement.querySelector('.sky-dropdown-button');
  }
}
