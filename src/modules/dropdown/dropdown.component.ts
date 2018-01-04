import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Renderer,
  ViewChild
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { SkyResources } from '../resources';
import { SkyWindowRefService } from '../window';

import { SkyDropdownAdapterService } from './dropdown-adapter.service';
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
  providers: [
    SkyDropdownAdapterService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyDropdownComponent implements OnInit, OnDestroy {
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
  public messageStream: Observable<SkyDropdownMessage> = Observable.of();

  @Input()
  public title: string;

  @ViewChild('dropdownButton')
  private dropdownButton: ElementRef;

  @ContentChild(SkyDropdownMenuComponent)
  private menuComponent: SkyDropdownMenuComponent;

  private hasKeyboardFocus = false;
  private isMouseEnter = false;
  private isOpen = false;
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
      this.hasKeyboardFocus = false;
      this.menuComponent.resetIndex();
      this.menuComponent.resetItems();
    });
  }

  public ngOnInit() {
    const messageSubscription = this.messageStream
      .subscribe((message: SkyDropdownMessage) => {
        this.handleIncomingMessages(message);
      });

    this.subscriptions.push(messageSubscription);
  }

  public ngOnDestroy() {
    this.closeDropdown();

    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  @HostListener('window:resize')
  public resetDropdownPosition() {
    this.adapterService.setMenuLocation(
      this.elRef,
      this.renderer,
      this.windowObj.getWindow(),
      this.alignment
    );
  }

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent) {
    if (this.isMouseEnter) {
      return;
    }

    this.closeDropdown();
    this.hasKeyboardFocus = false;
  }

  @HostListener('mouseenter')
  public onMouseEnter() {
    this.isMouseEnter = true;

    if (this.trigger === 'hover') {
      this.openDropdown();
    }
  }

  @HostListener('mouseleave')
  public onMouseLeave() {
    this.isMouseEnter = false;

    if (this.trigger === 'hover') {
      this.closeDropdown();
    }
  }

  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent) {
    const key = event.key.toLowerCase();

    // Except for the enter key, all other events should
    // only be handled when the dropdown is open.
    if (!this.isOpen) {
      if (key === 'enter') {
        this.hasKeyboardFocus = true;
        this.openDropdown();
        event.preventDefault();
      }

      return;
    }

    switch (key) {
      case 'tab':
      case 'escape':
      this.closeDropdown();
      break;

      case 'enter':
      // After the selected button is clicked,
      // return focus to the dropdown trigger element.
      this.windowObj.getWindow().setTimeout(() => {
        this.focusDropdownButton();
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
      this.focusDropdownButton();
    }
  }

  public onButtonClick(event: MouseEvent) {
    this.hasKeyboardFocus = false;
    this.toggleDropdown();
    event.preventDefault();
    event.stopPropagation();
  }

  public onMenuClick() {
    this.closeDropdown();
  }

  public onButtonFocus() {
    this.hasKeyboardFocus = true;
  }

  public onButtonBlur() {
    this.hasKeyboardFocus = false;
  }

  public getClassNames(): string[] {
    const classNames = [];

    classNames.push('sky-dropdown-button-type-' + this.buttonType);
    classNames.push('sky-btn-' + this.buttonStyle);

    if (this.hasKeyboardFocus) {
      classNames.push('sky-btn-focus');
    }

    return classNames;
  }

  private toggleDropdown() {
    if (this.isOpen) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  private openDropdown() {
    this.menuComponent.resetIndex();

    if (this.isOpen) {
      return;
    }

    this.adapterService.showDropdown(
      this.elRef,
      this.renderer,
      this.windowObj.getWindow(),
      this.alignment
    );

    this.isOpen = true;

    // Focus the first item if the menu was opened with the keyboard.
    if (this.hasKeyboardFocus) {
      this.menuComponent.focusFirstItem();
    }
  }

  private closeDropdown() {
    if (!this.isOpen) {
      return;
    }

    this.adapterService.hideDropdown(
      this.elRef,
      this.renderer,
      this.windowObj.getWindow()
    );
  }

  private focusDropdownButton() {
    this.menuComponent.resetItems();
    this.hasKeyboardFocus = true;
    this.dropdownButton.nativeElement.focus();
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
      this.focusDropdownButton();
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
