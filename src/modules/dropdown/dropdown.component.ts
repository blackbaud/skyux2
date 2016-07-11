import {
  Component,
  ElementRef,
  Input
} from '@angular/core';

import { SkyDropdownAdapterService } from './dropdown-adapter.service';

@Component({
  selector: 'sky-dropdown',
  template: require('./dropdown.component.html'),
  styles: [require('./dropdown.component.scss')],
  providers: [SkyDropdownAdapterService]
})
export class SkyDropdownComponent {
  @Input()
  public set buttonType(value: string) {
    this._buttonType = value;
  }

  public get buttonType(): string {
    return this._buttonType || 'select';
  }

  private open = false;

  private opening = false;

  private _buttonType: string;

  constructor(
    private elRef: ElementRef,
    private adapterService: SkyDropdownAdapterService
  ) {
    this.adapterService.dropdownClose.subscribe(() => {
      this.open = false;
    });
  }

  public click() {
    if (!this.open) {
      this.adapterService.showDropdown(this.elRef);

      // Notify the window click handler that the menu was just opened so it doesn't try to
      // close it.
      this.opening = true;
    }
  }

  public windowClick() {
    if (this.opening) {
      this.opening = false;
      this.open = true;
    } else {
      this.adapterService.hideDropdown(this.elRef);
    }
  }
}
