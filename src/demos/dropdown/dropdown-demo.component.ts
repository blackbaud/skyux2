import {
  ChangeDetectorRef,
  Component
} from '@angular/core';

import {
  SkyDropdownMessage,
  SkyDropdownMessageType,
  SkyDropdownMenuChange
} from '@skyux/popovers';

import {
  Subject
} from 'rxjs/Subject';

@Component({
  selector: 'sky-dropdown-demo',
  templateUrl: './dropdown-demo.component.html'
})
export class SkyDropdownDemoComponent {
  public dropdownController = new Subject<SkyDropdownMessage>();
  public items: any[] = [
    { name: 'Action 1', disabled: false },
    { name: 'Action 2', disabled: true },
    { name: 'Action 3', disabled: false },
    { name: 'Action 4', disabled: false },
    { name: 'Action 5', disabled: false }
  ];

  constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  public actionClicked(action: string) {
    alert('You selected ' + action);
  }

  public openDropdown() {
    this.sendMessage(SkyDropdownMessageType.Open);
  }

  public closeDropdown() {
    this.sendMessage(SkyDropdownMessageType.Close);
  }

  public focusTriggerButton() {
    this.sendMessage(SkyDropdownMessageType.FocusTriggerButton);
  }

  public focusNextItem() {
    this.sendMessage(SkyDropdownMessageType.FocusNextItem);
  }

  public focusPreviousItem() {
    this.sendMessage(SkyDropdownMessageType.FocusPreviousItem);
  }

  public changeItems() {
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
