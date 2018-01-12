import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import {
  SkyPopoverDirective,
  SkyPopoverMessage,
  SkyPopoverMessageType,
  SkyPopoverTrigger
} from '../popover';

import { SkyResources } from '../resources';
import { SkyWindowRefService } from '../window';

import { SkyDropdownMenuComponent } from './dropdown-menu.component';

import {
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
export class SkyDropdownComponent implements OnInit, OnDestroy {
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

  public popoverMessages = new Subject<SkyPopoverMessage>();

  @ViewChild(SkyPopoverDirective)
  private triggerButton: SkyPopoverDirective;

  @ContentChild(SkyDropdownMenuComponent)
  private menuComponent: SkyDropdownMenuComponent;
  private destroy = new Subject<boolean>();
  private openedWithKeyboard = false;
  private isOpen = false;

  private _buttonType: string;
  private _buttonStyle: string;
  private _label: string;
  private _trigger: SkyDropdownTriggerType;

  constructor(
    private windowObj: SkyWindowRefService,
    private changeDetector: ChangeDetectorRef
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

  public ngOnDestroy() {
    this.closeDropdown();
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  public getPopoverTriggerType(): SkyPopoverTrigger {
    // The popover has different trigger types.
    return (this.trigger === 'click') ? 'click' : 'mouseenter';
  }

  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent) {
    const key = event.key.toLowerCase();

    // Except for the enter key, all other events should
    // be handled when the dropdown is open.
    if (!this.isOpen) {
      if (key === 'enter') {
        this.openedWithKeyboard = true;
      }

      return;
    }

    switch (key) {
      case 'tab':
      this.closeDropdown();
      break;

      case 'enter':
      // After an item is selected with the enter key,
      // wait a moment before returning focus to the dropdown trigger element.
      this.windowObj.getWindow().setTimeout(() => {
        this.focusTriggerButton();
      });
      break;

      case 'arrowdown':
      this.menuComponent.focusNextItem();
      event.preventDefault();
      break;

      case 'arrowup':
      this.menuComponent.focusPreviousItem();
      event.preventDefault();
      break;

      default:
      break;
    }

    // Pressing the escape key should return focus to the trigger.
    if (key === 'escape') {
      this.focusTriggerButton();
    }
  }

  public onPopoverClick() {
    this.closeDropdown();
  }

  public onButtonBlur() {
    this.openedWithKeyboard = false;
  }

  public onPopoverOpened() {
    this.isOpen = true;
    this.menuComponent.resetIndex();
    // Focus the first item if the menu was opened with the keyboard.
    if (this.openedWithKeyboard) {
      this.menuComponent.focusFirstItem();
    }
  }

  public onPopoverClosed() {
    this.isOpen = false;
    this.menuComponent.resetIndex();
    this.menuComponent.resetActiveState();
  }

  public resetDropdownPosition() {
    this.openDropdown();
  }

  private openDropdown() {
    // if (!this.isOpen) {
      this.popoverMessages.next({
        type: SkyPopoverMessageType.Open,
        elementRef: this.triggerButton.elementRef,
        placement: 'below',
        alignment: 'left'
      });
    // }
  }

  private closeDropdown() {
    if (this.isOpen) {
      this.popoverMessages.next({
        type: SkyPopoverMessageType.Close
      });
    }
  }

  private focusTriggerButton() {
    this.menuComponent.resetActiveState();
    this.openedWithKeyboard = true;
    this.triggerButton.elementRef.nativeElement.focus();
    this.changeDetector.markForCheck();
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
}
