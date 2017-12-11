import {
  Component,
  ContentChild,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  SkyResources
} from '../resources';

import {
  SkyDropdownAdapterService
} from './dropdown-adapter.service';

import {
  SkyDropdownMenuComponent
} from './dropdown-menu.component';

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
  public alignment = 'left';

  @Input()
  public buttonStyle = 'default';

  @Input()
  public buttonType = 'select';

  @Input()
  public label = SkyResources.getString('context_menu_default_label');

  @Input()
  public title: string;

  @Input()
  public trigger = 'click';

  @ContentChild(SkyDropdownMenuComponent)
  public menuComponent: SkyDropdownMenuComponent;

  private isOpen = false;
  private isOpening = false;

  constructor(
    private elRef: ElementRef,
    private adapterService: SkyDropdownAdapterService
  ) { }

  public ngOnInit() {
    this.adapterService.dropdownClose.subscribe(() => {
      this.isOpen = false;
    });
  }

  public ngOnDestroy() {
    this.hideDropdown();
  }

  @HostListener('document:click')
  public handleWindowClicked() {
    if (this.isOpening) {
      this.isOpening = false;
    } else {
      this.hideDropdown();
    }
  }

  @HostListener('document:keydown', ['$event'])
  public disableArrowKeyWindowScroll(event: KeyboardEvent) {
    const key = event.key.toLowerCase();

    if (!this.isOpen) {
      return;
    }

    // When the menu is opened, disable the normal scrolling behavior
    // of the up and down arrows.
    if (key === 'arrowup' || key === 'arrowdown') {
      event.preventDefault();
    }
  }

  @HostListener('keydown', ['$event'])
  public handleKeyDown(event: KeyboardEvent) {
    const key = event.key.toLowerCase();

    switch (key) {
      case 'arrowup':
      this.menuComponent.selectPreviousItem();
      break;

      case 'arrowdown':
      this.menuComponent.selectNextItem();
      break;

      case 'tab':
      case 'escape':
      this.hideDropdown();
      break;

      default:
      break;
    }
  }

  @HostListener('mouseenter')
  public handleMouseEnter() {
    if (this.trigger === 'hover') {
      this.showDropdown();
    }
  }

  @HostListener('mouseleave')
  public handleMouseLeave() {
    if (this.trigger === 'hover') {
      this.hideDropdown();
    }
  }

  public resetDropdownPosition() {
    this.adapterService.setMenuLocation(this.elRef, this.alignment);
  }

  private showDropdown() {
    if (!this.isOpen) {
      this.adapterService.showDropdown(this.elRef, this.alignment);
      this.isOpen = true;

      // Notify the window click handler that the menu was just opened
      // so it doesn't try to close it.
      this.isOpening = true;
    }
  }

  private hideDropdown() {
    if (this.isOpen) {
      this.adapterService.hideDropdown(this.elRef);
      if (this.menuComponent) {
        this.menuComponent.resetSelectedIndex();
      }
    }
  }
}
