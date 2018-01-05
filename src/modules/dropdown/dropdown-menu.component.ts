import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList
} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { SkyDropdownItemComponent } from './dropdown-item.component';

import {
  SkyDropdownMenuChange
} from './types';

@Component({
  selector: 'sky-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyDropdownMenuComponent implements AfterContentInit, OnDestroy {
  @Input()
  public useNativeFocus = true;

  @Output()
  public menuChange = new EventEmitter<SkyDropdownMenuChange>();

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
  private subscriptions: Subscription[] = [];

  constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  public ngAfterContentInit() {
    this.checkFocusableItems();

    // Reset focus whenever the menu items change.
    this.subscriptions.push(
      this.menuItems.changes.subscribe(() => {
        this.menuIndex = 0;
        this.checkFocusableItems();
        this.focusActiveItem();
      })
    );
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
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

    if (activeItem) {
      this.resetItems();
      activeItem.focusElement(this.useNativeFocus);

      this.menuChange.emit({
        activeIndex: this._menuIndex
      });

      this.changeDetector.detectChanges();
    }
  }

  private checkFocusableItems() {
    const focusableItem = this.menuItems.find((item: SkyDropdownItemComponent) => {
      return (item.isFocusable());
    });

    this.hasFocusableItems = (focusableItem !== undefined);
  }
}
