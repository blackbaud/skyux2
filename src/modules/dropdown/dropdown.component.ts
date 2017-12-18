import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  Renderer,
  ViewChild
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { SkyResources } from '../resources';
import { SkyWindowRefService } from '../window';

import { SkyDropdownAdapterService } from './dropdown-adapter.service';
import { SkyDropdownItemComponent } from './dropdown-item.component';

import {
  SkyDropdownMenuChanges,
  SkyDropdownMessage,
  SkyDropdownMessageEventArgs,
  SkyDropdownTriggerType
} from './types';

@Component({
  selector: 'sky-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    SkyDropdownAdapterService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyDropdownComponent
  implements OnInit, AfterContentInit, OnDestroy {

  @Input()
  public set buttonStyle(value: string) {
    this._buttonStyle = value;
  }

  public get buttonStyle(): string {
    return this._buttonStyle || 'default';
  }

  @Input()
  public set buttonType(value: string) {
    this._buttonType = value;
  }

  public get buttonType(): string {
    return this._buttonType || 'select';
  }

  @Input()
  public set label(value: string) {
    this._label = value;
  }

  public get label(): string {
    return this._label || SkyResources.getString('context_menu_default_label');
  }

  @Input()
  public set trigger(value: SkyDropdownTriggerType) {
    this._trigger = value;
  }

  public get trigger(): SkyDropdownTriggerType {
    return this._trigger || 'click';
  }

  @Input()
  public alignment = 'left';

  @Input()
  public disableNativeFocus = false;

  @Input()
  public messageStream: Observable<SkyDropdownMessageEventArgs> = Observable.of();

  @Input()
  public title: string;

  @Output()
  public menuChanges = new EventEmitter<SkyDropdownMenuChanges>();

  @ViewChild('dropdownButton')
  public dropdownButton: ElementRef;

  @ContentChildren(SkyDropdownItemComponent, { descendants: true })
  public menuItems: QueryList<SkyDropdownItemComponent>;

  private hasFocus = false;
  private isOpen = false;
  private menuIndex = 0;
  private openedWithKeyboard = false;
  private subscriptions: Subscription[] = [];

  private _trigger: SkyDropdownTriggerType;
  private _buttonType: string;
  private _buttonStyle: string;
  private _label: string;

  constructor(
    private adapterService: SkyDropdownAdapterService,
    private changeDetector: ChangeDetectorRef,
    private elRef: ElementRef,
    private renderer: Renderer,
    private windowObj: SkyWindowRefService
  ) {
    this.adapterService.dropdownClose.subscribe(() => {
      this.isOpen = false;
      this.menuIndex = 0;
      this.openedWithKeyboard = false;
      this.resetMenuItems();
    });
  }

  public ngOnInit() {
    const messageSubscription = this.messageStream
      .subscribe((args: SkyDropdownMessageEventArgs) => {
        this.handleIncomingMessages(args);
      });

    this.subscriptions.push(messageSubscription);
  }

  public ngAfterContentInit() {
    // Reset focus whenever the menu items change.
    this.menuItems.changes.subscribe(() => {
      this.menuIndex = 0;
      this.focusActiveMenuItem();
    });
  }

  public ngOnDestroy() {
    this.closeMenu();

    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  @HostListener('document:click')
  public onDocumentClick() {
    if (!this.hasFocus) {
      this.closeMenu();
    }
  }

  @HostListener('mouseenter')
  public onMouseEnter() {
    this.hasFocus = true;

    if (this.trigger === 'hover') {
      this.openMenu();
    }
  }

  @HostListener('mouseleave')
  public onMouseLeave() {
    this.hasFocus = false;

    if (this.trigger === 'hover') {
      this.closeMenu();
    }
  }

  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent) {
    const key = event.key.toLowerCase();

    if (!this.isOpen) {
      if (key === 'enter') {
        this.openedWithKeyboard = true;
      }

      return;
    }

    switch (key) {
      case 'tab':
      case 'escape':
      this.closeMenu();
      break;

      case 'enter':
      if (this.isOpen) {
        this.focusDropdownButton();
      }
      break;

      case 'arrowdown':
      // If the menu is first opened with a mouse click,
      // and the user attempts to navigate the items using the arrow keys,
      // reset the focus to the first item on the first keypress.
      // (Otherwise, the focus would start on the second item.)
      if (!this.openedWithKeyboard) {
        this.menuIndex = -1;
        this.openedWithKeyboard = true;
      }

      this.focusNextMenuItem();
      event.preventDefault();
      break;

      case 'arrowup':
      this.focusPreviousMenuItem();
      event.preventDefault();
      break;

      default:
      break;
    }

    // Pressing the escape key should return focus to the trigger.
    if (key === 'escape') {
      this.focusDropdownButton();
    }
  }

  public onButtonClick() {
    this.toggleMenu();
  }

  public onButtonFocus() {
    this.hasFocus = true;
  }

  public onMenuClick() {
    this.closeMenu();
  }

  public resetDropdownPosition() {
    this.adapterService.setMenuLocation(
      this.elRef,
      this.renderer,
      this.windowObj.getWindow(),
      this.alignment
    );
  }

  private handleIncomingMessages(args: SkyDropdownMessageEventArgs) {
    switch (args.message) {
      case SkyDropdownMessage.Open:
      this.openMenu();
      break;

      case SkyDropdownMessage.Close:
      this.closeMenu();
      break;

      case SkyDropdownMessage.FocusNextItem:
      this.focusNextMenuItem();
      break;

      case SkyDropdownMessage.FocusPreviousItem:
      this.focusPreviousMenuItem();
      break;

      default:
      break;
    }
  }

  private toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  private openMenu() {
    if (!this.isOpen) {
      this.adapterService.showDropdown(
        this.elRef,
        this.renderer,
        this.windowObj.getWindow(),
        this.alignment
      );

      this.isOpen = true;

      // Focus the first item if the menu was opened with the keyboard.
      if (this.openedWithKeyboard) {
        this.focusActiveMenuItem();
      }
    }
  }

  private closeMenu() {
    if (this.isOpen) {
      this.adapterService.hideDropdown(
        this.elRef,
        this.renderer,
        this.windowObj.getWindow()
      );
    }
  }

  private focusPreviousMenuItem() {
    if (!this.menuItems.length) {
      this.menuIndex = 0;
      return;
    }

    this.menuIndex--;

    if (this.menuIndex < 0) {
      this.menuIndex = this.menuItems.length - 1;
    }

    this.focusActiveMenuItem();
  }

  private focusNextMenuItem() {
    this.menuIndex++;

    if (this.menuIndex >= this.menuItems.length) {
      this.menuIndex = 0;
    }

    this.focusActiveMenuItem();
  }

  private focusActiveMenuItem() {
    this.resetMenuItems();

    const activeItem: SkyDropdownItemComponent = this.menuItems
      .find((item: any, i: number) => {
        return (i === this.menuIndex);
      });

    if (activeItem) {
      activeItem.focusElement(!this.disableNativeFocus);

      this.menuChanges.emit({
        activeIndex: this.menuIndex
      });

      this.changeDetector.detectChanges();
    }
  }

  private focusDropdownButton() {
    this.dropdownButton.nativeElement.focus();
  }

  private resetMenuItems() {
    this.menuItems.forEach((item: SkyDropdownItemComponent) => {
      item.resetState();
    });
  }
}
