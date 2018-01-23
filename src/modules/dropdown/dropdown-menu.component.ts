import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
  QueryList
} from '@angular/core';

import { Subject } from 'rxjs/Subject';

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
  public menuChanges = new EventEmitter<SkyDropdownMenuChange>();

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

    this.menuChanges.emit({
      activeIndex: value
    });
  }

  @ContentChildren(SkyDropdownItemComponent)
  private menuItems: QueryList<SkyDropdownItemComponent>;

  private destroy = new Subject<boolean>();
  private get hasFocusableItems(): boolean {
    const found = this.menuItems.find(item => item.isFocusable());
    return (found !== undefined);
  }

  private _menuIndex = 0;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  public ngAfterContentInit() {
    // Reset focus whenever the menu items change.
    this.menuItems.changes
      .takeUntil(this.destroy)
      .subscribe(() => {
        this.menuIndex = 0;
        this.focusActiveItem();
        this.menuChanges.emit({
          items: this.menuItems
        });
      });
  }

  public ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent) {
    const selectedItem = this.menuItems.find((item: SkyDropdownItemComponent) => {
      return (item.buttonElement === event.target);
    });

    /* istanbul ignore else */
    if (selectedItem) {
      this.menuChanges.next({
        selectedItem
      });
    }
  }

  @HostListener('focusin', ['$event'])
  public onFocusIn(event: KeyboardEvent) {
    this.menuItems.forEach((item: SkyDropdownItemComponent, i: number) => {
      item.resetState();

      if (item.buttonElement === event.target) {
        this.menuIndex = i;
        item.isActive = true;
      }
    });
  }

  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent) {
    const key = event.key.toLowerCase();

    if (key === 'arrowdown') {
      this.focusNextItem();
      event.preventDefault();
    }

    if (key === 'arrowup') {
      this.focusPreviousItem();
      event.preventDefault();
    }
  }

  public focusFirstItem() {
    if (!this.hasFocusableItems) {
      return;
    }

    this.menuIndex = 0;

    const firstItem = this.getItemByIndex(this.menuIndex);
    if (firstItem && firstItem.isFocusable()) {
      this.focusItem(firstItem);
    } else {
      this.focusNextItem();
    }
  }

  public focusPreviousItem() {
    if (!this.hasFocusableItems) {
      return;
    }

    this.menuIndex--;

    const previousItem = this.getItemByIndex(this.menuIndex);
    if (previousItem && previousItem.isFocusable()) {
      this.focusItem(previousItem);
    } else {
      this.focusPreviousItem();
    }
  }

  public focusNextItem() {
    if (!this.hasFocusableItems) {
      return;
    }

    this.menuIndex++;

    const nextItem = this.getItemByIndex(this.menuIndex);
    if (nextItem && nextItem.isFocusable()) {
      this.focusItem(nextItem);
    } else {
      this.focusNextItem();
    }
  }

  public reset() {
    this._menuIndex = -1;
    this.resetItemsActiveState();
    this.changeDetector.markForCheck();
  }

  public lastItemMatches(target: EventTarget) {
    return (this.menuItems.last && this.menuItems.last.buttonElement === target);
  }

  private resetItemsActiveState() {
    this.menuItems.forEach((item: SkyDropdownItemComponent) => {
      item.resetState();
    });
  }

  private focusActiveItem() {
    const activeItem = this.getItemByIndex(this.menuIndex);
    if (activeItem) {
      this.focusItem(activeItem);
    }
  }

  private focusItem(item: SkyDropdownItemComponent) {
    this.resetItemsActiveState();
    item.focusElement(this.useNativeFocus);
  }

  private getItemByIndex(index: number) {
    return this.menuItems.find((item: any, i: number) => {
      return (i === index);
    });
  }
}
