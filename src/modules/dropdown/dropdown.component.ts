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
    this.menuComponent.menuChanges
      .takeUntil(this.destroy)
      .subscribe((change: SkyDropdownMenuChange) => {
        // Close the dropdown when a menu item is selected.
        if (change.selectedItem) {
          this.sendMessage(SkyDropdownMessageType.Close);
        }

        if (change.items) {
          // Update the popover style and position whenever the number of
          // items changes.
          this.sendMessage(SkyDropdownMessageType.Reposition);
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
      /* tslint:disable-next-line:switch-default */
      switch (key) {
        // After an item is selected with the enter key,
        // wait a moment before returning focus to the dropdown trigger element.
        case 'enter':
        this.windowRef.getWindow().setTimeout(() => {
          this.sendMessage(SkyDropdownMessageType.FocusTriggerButton);
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

      return;
    }

    /* tslint:disable-next-line:switch-default */
    switch (key) {
      case 'enter':
      this.isKeyboardActive = true;
      break;

      case 'arrowdown':
      this.isKeyboardActive = true;
      this.sendMessage(SkyDropdownMessageType.Open);
      event.preventDefault();
      break;
    }
  }

  public onPopoverOpened() {
    this.isOpen = true;
    // Focus the first item if the menu was opened with the keyboard.
    if (this.isKeyboardActive) {
      this.sendMessage(SkyDropdownMessageType.FocusFirstItem);
    }
  }

  public onPopoverClosed() {
    this.isOpen = false;
    this.isKeyboardActive = false;
  }

  public getPopoverTriggerType(): SkyPopoverTrigger {
    // Map the dropdown trigger type to the popover trigger type.
    return (this.trigger === 'click') ? 'click' : 'mouseenter';
  }

  private handleIncomingMessages(message: SkyDropdownMessage) {
    /* tslint:disable-next-line:switch-default */
    switch (message.type) {
      case SkyDropdownMessageType.Open:
      this.menuComponent.reset();
      this.positionPopover();
      break;

      case SkyDropdownMessageType.Close:
      this.popover.close();
      break;

      case SkyDropdownMessageType.FocusTriggerButton:
      this.triggerButton.nativeElement.focus();
      break;

      case SkyDropdownMessageType.FocusFirstItem:
      this.menuComponent.focusFirstItem();
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
  }

  private sendMessage(type: SkyDropdownMessageType) {
    this.messageStream.next({ type });
  }

  private positionPopover() {
    this.popover.positionNextTo(
      this.triggerButton,
      'below',
      this.alignment
    );
  }
}
