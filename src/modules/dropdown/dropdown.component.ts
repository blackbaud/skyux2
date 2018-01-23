import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import {
  SkyPopoverAlignment,
  SkyPopoverComponent,
  SkyPopoverTrigger
} from '../popover';

import {
  SkyResources
} from '../resources';

import {
  SkyWindowRefService
} from '../window';

import { SkyDropdownMenuComponent } from './dropdown-menu.component';

import {
  SkyDropdownMenuChange,
  SkyDropdownMessage,
  SkyDropdownMessageType,
  SkyDropdownTriggerType
} from './types';

@Component({
  selector: 'sky-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyDropdownComponent implements OnInit, AfterContentInit, OnDestroy {
  @Input()
  public alignment: SkyPopoverAlignment = 'left';

  @Input()
  public get buttonStyle(): string{
    return this._buttonStyle || 'default';
  }

  public set buttonStyle(value: string) {
    this._buttonStyle = value;
  }

  @Input()
  public set buttonType(value: string) {
    this._buttonType = value;
  }

  public get buttonType(): string {
    return this._buttonType || 'select';
  }

  @Input()
  public get label(): string{
    return this._label || SkyResources.getString('context_menu_default_label');
  }

  public set label(value: string) {
    this._label = value;
  }

  @Input()
  public messageStream: Observable<SkyDropdownMessage>;

  @Input()
  public title: string;

  @Input()
  public set trigger(value: SkyDropdownTriggerType) {
    this._trigger = value;
  }

  public get trigger(): SkyDropdownTriggerType {
    return this._trigger || 'click';
  }

  @ViewChild('triggerButton')
  private triggerButton: ElementRef;

  @ViewChild(SkyPopoverComponent)
  private popover: SkyPopoverComponent;

  @ContentChild(SkyDropdownMenuComponent)
  private menuComponent: SkyDropdownMenuComponent;

  private destroy = new Subject<boolean>();
  private isKeyboardActive = false;
  private tabKeyPressed = false;
  private isOpen = false;

  private _buttonType: string;
  private _buttonStyle: string;
  private _label: string;
  private _trigger: SkyDropdownTriggerType;

  constructor(
    private windowObj: SkyWindowRefService
  ) { }

  public ngOnInit() {
    if (this.messageStream) {
      this.messageStream
        .takeUntil(this.destroy)
        .subscribe((message: SkyDropdownMessage) => {
          this.handleIncomingMessages(message);
        });
    }
  }

  public ngAfterContentInit() {
    this.menuComponent.menuChanges
      .takeUntil(this.destroy)
      .subscribe((change: SkyDropdownMenuChange) => {
        // Adjust the position of the dropdown if the number of items changes.
        if (change.items) {
          this.windowObj.getWindow().setTimeout(() => {
            this.resetDropdownPosition();
          });
        } else if (change.selectedItem) {
          // Close the dropdown when a menu item is selected.
          this.closeDropdown();
        }
      });
  }

  public ngOnDestroy() {
    this.closeDropdown();
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent) {
    const key = event.key.toLowerCase();

    if (this.isOpen) {
      /* tslint:disable:switch-default */
      switch (key) {
        // If the menu was opened with the mouse, but the user then presses the tab key,
        // alert the component that the keyboard is being used.
        case 'tab':
        this.isKeyboardActive = true;
        if (event.shiftKey) {
          // The shift+tab combo was pressed on the trigger button,
          // so let's close the dropdown.
          if (this.triggerButton.nativeElement === event.target) {
            this.closeDropdown();
            return;
          }
        } else {
          // Only register the tab key if it's not a shift+tab combo.
          this.tabKeyPressed = true;
        }
        break;

        // After an item is selected with the enter key,
        // wait a moment before returning focus to the dropdown trigger element.
        case 'enter':
        this.windowObj.getWindow().setTimeout(() => {
          this.focusTriggerButton();
        });
        break;

        // Allow the menu to be opened with the arrowdown key
        // if it is first opened with the mouse.
        case 'arrowdown':
        if (!this.isKeyboardActive) {
          this.isKeyboardActive = true;
          this.menuComponent.focusFirstItem();
          event.preventDefault();
        }
        break;
      }
      /* tslint:enable */

      return;
    }

    /* tslint:disable:switch-default */
    switch (key) {
      case 'enter':
      this.isKeyboardActive = true;
      break;

      case 'arrowdown':
      this.isKeyboardActive = true;
      this.openDropdown();
      event.preventDefault();
      break;
    }
    /* tslint:enable */
  }

  @HostListener('focusin', ['$event'])
  public onFocusIn(event: KeyboardEvent) {
    this.tabKeyPressed = false;
  }

  @HostListener('focusout', ['$event'])
  public onFocusOut(event: KeyboardEvent) {
    // Close the dropdown if the last item loses focus.
    if (
      this.tabKeyPressed &&
      this.menuComponent.lastItemMatches(event.target)
    ) {
      this.closeDropdown();
    }
  }

  public onPopoverOpened() {
    this.isOpen = true;
    this.menuComponent.reset();
    // Focus the first item if the menu was opened with the keyboard.
    if (this.isKeyboardActive) {
      this.menuComponent.focusFirstItem();
    }
  }

  public onPopoverClosed() {
    this.isOpen = false;
    this.isKeyboardActive = false;
    this.menuComponent.reset();
  }

  public resetDropdownPosition() {
    // Only reposition the dropdown if it is already open.
    if (this.isOpen) {
      this.openDropdown();
    }
  }

  public getPopoverTriggerType(): SkyPopoverTrigger {
    // Map the dropdown trigger type to the popover trigger type.
    return (this.trigger === 'click') ? 'click' : 'mouseenter';
  }

  private handleIncomingMessages(message: SkyDropdownMessage) {
    /* tslint:disable:switch-default */
    switch (message.type) {
      case SkyDropdownMessageType.Open:
      this.openDropdown();
      break;

      case SkyDropdownMessageType.Close:
      this.closeDropdown();
      break;

      case SkyDropdownMessageType.FocusTriggerButton:
      this.focusTriggerButton();
      break;

      case SkyDropdownMessageType.FocusNextItem:
      this.menuComponent.focusNextItem();
      break;

      case SkyDropdownMessageType.FocusPreviousItem:
      this.menuComponent.focusPreviousItem();
      break;
    }
    /* tslint:enable */
  }

  private openDropdown() {
    this.popover.positionNextTo(this.triggerButton, 'below', this.alignment);
  }

  private closeDropdown() {
    this.popover.close();
  }

  private focusTriggerButton() {
    this.triggerButton.nativeElement.focus();
  }
}
