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

  @Input()
  public set trigger(value: string) {
    this._trigger = value;
  }

  public get trigger(): string {
    return this._trigger || 'click';
  }

  @Input()
  public label: string;

  private open = false;

  private opening = false;

  private _buttonType: string;

  private _trigger: string;

  constructor(
    private elRef: ElementRef,
    private adapterService: SkyDropdownAdapterService
  ) {
    this.adapterService.dropdownClose.subscribe(() => {
      this.open = false;
    });
  }

  public click() {
    this.openMenu();
  }

  public windowClick() {
    if (this.opening) {
      this.opening = false;
      this.open = true;
    } else {
      this.adapterService.hideDropdown(this.elRef);
    }
  }

  public mouseEnter() {
    if (this.trigger === 'hover') {
      this.openMenu();
      this.opening = false;
      this.open = true;
    }
  }

  public mouseLeave() {
    if (this.trigger === 'hover') {
      this.adapterService.hideDropdown(this.elRef);
    }
  }

  private openMenu() {
    if (!this.open) {
      this.adapterService.showDropdown(this.elRef);

      // Notify the window click handler that the menu was just opened so it doesn't try to
      // close it.
      this.opening = true;
    }
  }
}
