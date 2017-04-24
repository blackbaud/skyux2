import {
  Component,
  ElementRef,
  Input,
  Renderer
} from '@angular/core';

import { SkyDropdownAdapterService } from './dropdown-adapter.service';

@Component({
  selector: 'sky-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
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

  @Input()
  public title: string;

  private open = false;

  private opening = false;

  private _buttonType: string;

  private _trigger: string;

  constructor(
    private renderer: Renderer,
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
      this.adapterService.hideDropdown(this.elRef, this.renderer);
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
      this.adapterService.hideDropdown(this.elRef, this.renderer);
    }
  }

  private openMenu() {
    if (!this.open) {
      this.adapterService.showDropdown(this.elRef, this.renderer);

      // Notify the window click handler that the menu was just opened so it doesn't try to
      // close it.
      this.opening = true;
    }
  }
}
