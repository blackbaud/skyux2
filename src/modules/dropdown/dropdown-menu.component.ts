import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList
} from '@angular/core';

import { SkyDropdownItemComponent } from './dropdown-item.component';

import {
  SkyDropdownMenuChanges
} from './types';

@Component({
  selector: 'sky-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyDropdownMenuComponent implements AfterContentInit {
  @Input()
  public useNativeFocus = true;

  @Output()
  public menuChanges = new EventEmitter<SkyDropdownMenuChanges>();

  public get menuIndex(): number {
    return this._menuIndex;
  }

  public set menuIndex(value: number) {
    if (value < 0) {
      value = this.menuItems.length - 1;
    }

    if (value >= this.menuItems.length) {
      value = 0;
    }

    this._menuIndex = value;
  }

  private _menuIndex = 0;

  @ContentChildren(SkyDropdownItemComponent)
  private menuItems: QueryList<SkyDropdownItemComponent>;
  private hasFocusableItems = false;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  public ngAfterContentInit() {
    this.checkFocusableItems();

    // Reset focus whenever the menu items change.
    this.menuItems.changes.subscribe(() => {
      this._menuIndex = 0;
      this.checkFocusableItems();
      this.focusActiveItem();
    });
  }

  public focusPreviousItem() {
    if (!this.hasFocusableItems) {
      return;
    }

    this.menuIndex = this.menuIndex - 1;

    const previousItem = this.getActiveItem();

    if (previousItem && previousItem.isFocusable()) {
      this.focusActiveItem();
    } else {
      this.focusPreviousItem();
    }
  }

  public focusNextItem() {
    if (!this.hasFocusableItems) {
      return;
    }

    this.menuIndex = this.menuIndex + 1;

    const nextItem = this.getActiveItem();

    if (nextItem && nextItem.isFocusable()) {
      this.focusActiveItem();
    } else {
      this.focusNextItem();
    }
  }

  public focusFirstItem() {
    if (!this.hasFocusableItems) {
      return;
    }

    this.menuIndex = 0;

    const nextItem = this.getActiveItem();

    if (nextItem && nextItem.isFocusable()) {
      this.focusActiveItem();
    } else {
      this.focusNextItem();
    }
  }

  public resetItems() {
    this.menuItems.forEach((item: SkyDropdownItemComponent) => {
      item.resetState();
    });
  }

  public resetIndex() {
    this._menuIndex = -1;
  }

  private getActiveItem(): SkyDropdownItemComponent {
    return this.menuItems.find((item: any, i: number) => {
      return (i === this._menuIndex);
    });
  }

  private focusActiveItem() {
    const activeItem = this.getActiveItem();

    this.resetItems();

    if (activeItem) {
      activeItem.focusElement(this.useNativeFocus);

      this.menuChanges.emit({
        activeIndex: this._menuIndex
      });

      this.changeDetector.detectChanges();
    }
  }

  private checkFocusableItems() {
    const focusableItems = this.menuItems.filter((item: SkyDropdownItemComponent) => {
      return (item.isFocusable());
    });

    this.hasFocusableItems = (focusableItems.length > 0);
  }
}
