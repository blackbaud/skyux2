import {
  Component,
  ElementRef,
  Input,
  Renderer,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  Observable
} from 'rxjs/Observable';

import { SkyWindowRefService } from '../window';
import { SkyResources } from '../resources';

import { SkyDropdownAdapterService } from './dropdown-adapter.service';

@Component({
  selector: 'sky-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    SkyDropdownAdapterService
  ]
})
export class SkyDropdownComponent implements OnInit, OnDestroy {
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
  public get label(): string{
    return this._label || SkyResources.getString('context_menu_default_label');
  }

  public set label(value: string) {
    this._label = value;
  }

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

  @Input()
  public commandStream: Observable<any> = Observable.of();

  private open = false;

  private opening = false;

  private _buttonType: string;

  private _buttonStyle: string;

  private _trigger: string;

  private _label: string;

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
      this.closeMenu();
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

  public ngOnInit() {
    // this.commandStream.subscribe((args: any) => {
    //   console.log('args?', args.command);
    //   switch (args.command) {
    //     case 'open':
    //     this.openMenu();
    //     break;
    //     case 'close':
    //     this.closeMenu();
    //     break;
    //     default:
    //     break;
    //   }
    // });
  }

  public ngOnDestroy() {
    this.closeMenu();
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

  private closeMenu() {
    this.adapterService.hideDropdown(this.elRef, this.renderer, this.windowObj.getWindow());
  }
}
