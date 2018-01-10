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
    event.stopPropagation();
    this.sendMessage(SkyDropdownMessageType.Open);
  }

  public closeDropdown() {
    this.sendMessage(SkyDropdownMessageType.Close);
  }

  public focusTriggerButton(event: MouseEvent) {
    event.stopPropagation();
    this.sendMessage(SkyDropdownMessageType.FocusTriggerButton);
  }

  public focusNextItem(event: MouseEvent) {
    event.stopPropagation();
    this.sendMessage(SkyDropdownMessageType.FocusNextItem);
  }

  public focusPreviousItem(event: MouseEvent) {
    event.stopPropagation();
    this.sendMessage(SkyDropdownMessageType.FocusPreviousItem);
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
