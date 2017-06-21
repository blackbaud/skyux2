import {
  Component,
  ElementRef,
  Input,
  Renderer,
  OnDestroy
} from '@angular/core';

import { SkyDropdownAdapterService } from './dropdown-adapter.service';

import { SkyWindowRefService } from '../window';

@Component({
  selector: 'sky-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    SkyDropdownAdapterService
  ]
})
export class SkyDropdownComponent implements OnDestroy {
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

  @Input()
  public alignment: string = 'left';

  @Input()
  public get buttonStyle(): string{
    return this._buttonStyle || 'default';
  }

  public set buttonStyle(value: string) {
    this._buttonStyle = value;
  }

  private open = false;

  private opening = false;

  private _buttonType: string;

  private _buttonStyle: string;

  private _trigger: string;

  constructor(
    private renderer: Renderer,
    private elRef: ElementRef,
    private adapterService: SkyDropdownAdapterService,
    private windowObj: SkyWindowRefService
  ) {
    this.adapterService.dropdownClose.subscribe(() => {
      this.open = false;
    });
  }

  public click() {
    this.openMenu();
  }

  public resetDropdownPosition() {
    this.adapterService.setMenuLocation(
      this.elRef,
      this.renderer,
      this.windowObj.getWindow(),
      this.alignment
    );
  }

  public windowClick() {
    if (this.opening) {
      this.opening = false;
      this.open = true;
    } else {
      this.adapterService.hideDropdown(this.elRef, this.renderer, this.windowObj.getWindow());
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
      this.adapterService.hideDropdown(this.elRef, this.renderer, this.windowObj.getWindow());
    }
  }

  public ngOnDestroy() {
    this.adapterService.hideDropdown(this.elRef, this.renderer, this.windowObj.getWindow());
  }

  private openMenu() {
    if (!this.open) {
      this.adapterService.showDropdown(
        this.elRef,
        this.renderer,
        this.windowObj.getWindow(),
        this.alignment
      );

      // Notify the window click handler that the menu was just opened so it doesn't try to
      // close it.
      this.opening = true;
    }
  }

}
