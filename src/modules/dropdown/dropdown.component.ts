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
  public dismissOnBlur = true;

  @Input()
  public messageStream = new Subject<SkyDropdownMessage>();

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
  private isOpen = false;

  private _buttonType: string;
  private _buttonStyle: string;
  private _label: string;
  private _trigger: SkyDropdownTriggerType;

  constructor(
    private windowRef: SkyWindowRefService
  ) { }

  public ngOnInit() {
    this.messageStream
      .takeUntil(this.destroy)
      .subscribe((message: SkyDropdownMessage) => {
        this.handleIncomingMessages(message);
      });
  }

  public ngAfterContentInit() {
    this.menuComponent.menuItems.changes
      .takeUntil(this.destroy)
      .subscribe(() => {
        // Update the popover's style and position whenever the number of items changes.
        // e.g., If the menu is fullscreen, and removing an item allows it to fit
        // as it should, we need to restore the popover's original styles.
        // this.popover.updateClassNames();
        this.windowRef.getWindow().setTimeout(() => {
          this.messageStream.next({
            type: SkyDropdownMessageType.Reposition
          });
        });
      });

    this.menuComponent.menuChanges
      .takeUntil(this.destroy)
      .subscribe((change: SkyDropdownMenuChange) => {
        // Close the dropdown when a menu item is selected.
        if (change.selectedItem) {
          this.messageStream.next({
            type: SkyDropdownMessageType.Close
          });
        }
      });
  }

  public ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent) {
    const key = event.key.toLowerCase();

    if (this.isOpen) {
      /* tslint:disable:switch-default */
      switch (key) {
        // After an item is selected with the enter key,
        // wait a moment before returning focus to the dropdown trigger element.
        case 'enter':
        this.windowRef.getWindow().setTimeout(() => {
          this.messageStream.next({
            type: SkyDropdownMessageType.FocusTriggerButton
          });
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
      this.messageStream.next({
        type: SkyDropdownMessageType.Open
      });
      event.preventDefault();
      break;
    }
    /* tslint:enable */
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

  public getPopoverTriggerType(): SkyPopoverTrigger {
    // Map the dropdown trigger type to the popover trigger type.
    return (this.trigger === 'click') ? 'click' : 'mouseenter';
  }

  private handleIncomingMessages(message: SkyDropdownMessage) {
    /* tslint:disable:switch-default */
    switch (message.type) {
      case SkyDropdownMessageType.Open:
      this.popover.positionNextTo(this.triggerButton, 'below', this.alignment);
      break;

      case SkyDropdownMessageType.Close:
      this.popover.close();
      break;

      case SkyDropdownMessageType.FocusTriggerButton:
      this.triggerButton.nativeElement.focus();
      break;

      case SkyDropdownMessageType.FocusNextItem:
      this.menuComponent.focusNextItem();
      break;

      case SkyDropdownMessageType.FocusPreviousItem:
      this.menuComponent.focusPreviousItem();
      break;

      case SkyDropdownMessageType.Reposition:
      // Only reposition the dropdown if it is already open.
      if (this.isOpen) {
        this.popover.reposition();
      }
      break;
    }
    /* tslint:enable */
  }
}
