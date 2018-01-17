import {
  ChangeDetectorRef,
  Component
} from '@angular/core';

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
  public items: any[] = [
    { name: 'Option 1', disabled: false },
    { name: 'Option 2', disabled: true },
    { name: 'Option 3', disabled: false },
    { name: 'Option 4', disabled: false },
    { name: 'Option 5', disabled: false }
  ];

  constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

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

  public changeItems(event: MouseEvent) {
    this.items.pop();
    this.changeDetector.detectChanges();
    event.preventDefault();
    event.stopPropagation();
  }

  public onMenuChanges(change: SkyDropdownMenuChange) {
    if (change.activeIndex !== undefined) {
      console.log('The menu\'s active index changed to:', change.activeIndex);
    }
  }

  private sendMessage(type: SkyDropdownMessageType) {
    const message: SkyDropdownMessage = { type };
    this.dropdownController.next(message);
  }
}
