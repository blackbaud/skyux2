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

  public openDropdown(): void {
    this.sendMessage(SkyDropdownMessageType.Open);
  }

  public closeDropdown(): void {
    this.sendMessage(SkyDropdownMessageType.Close);
  }

  public focusTriggerButton(): void {
    this.sendMessage(SkyDropdownMessageType.FocusTriggerButton);
  }

  public focusNextItem(): void {
    this.sendMessage(SkyDropdownMessageType.FocusNextItem);
  }

  public focusPreviousItem(): void {
    this.sendMessage(SkyDropdownMessageType.FocusPreviousItem);
  }

  public changeItems(): void {
    this.items.pop();
    this.changeDetector.detectChanges();
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
