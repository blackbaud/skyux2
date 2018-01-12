import { Component } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import {
  SkyDropdownMessage,
  SkyDropdownMessageType,
  SkyDropdownMenuChange
} from '../../core';

@Component({
  selector: 'sky-dropdown-demo',
  templateUrl: './dropdown-demo.component.html'
})
export class SkyDropdownDemoComponent {
  public dropdownController = new Subject<SkyDropdownMessage>();

  public optionClicked(option: number) {
    alert('You selected option ' + option);
  }

  public openDropdown(event: MouseEvent) {
    this.sendMessage(SkyDropdownMessageType.Open);
    event.preventDefault();
    event.stopPropagation();
  }

  public closeDropdown(event: MouseEvent) {
    this.sendMessage(SkyDropdownMessageType.Close);
    event.preventDefault();
    event.stopPropagation();
  }

  public focusTriggerButton(event: MouseEvent) {
    this.sendMessage(SkyDropdownMessageType.FocusTriggerButton);
    event.preventDefault();
    event.stopPropagation();
  }

  public focusNextItem(event: MouseEvent) {
    this.sendMessage(SkyDropdownMessageType.FocusNextItem);
    event.preventDefault();
    event.stopPropagation();
  }

  public focusPreviousItem(event: MouseEvent) {
    this.sendMessage(SkyDropdownMessageType.FocusPreviousItem);
    event.preventDefault();
    event.stopPropagation();
  }

  public onMenuChange(change: SkyDropdownMenuChange) {
    if (change.activeIndex !== undefined) {
      console.log('The menu\'s active index changed to:', change.activeIndex);
    }
  }

  private sendMessage(type: SkyDropdownMessageType) {
    const message: SkyDropdownMessage = { type };
    this.dropdownController.next(message);
  }
}
