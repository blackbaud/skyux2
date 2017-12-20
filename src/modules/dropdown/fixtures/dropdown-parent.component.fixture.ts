import {
  ChangeDetectorRef,
  Component,
  ViewChild
} from '@angular/core';

import { Subject } from 'rxjs/Subject';

import {
  SkyDropdownMessageType,
  SkyDropdownMessageEventArgs
} from '../types';

import {
  SkyDropdownComponent
} from '../dropdown.component';

import {
  SkyDropdownMenuComponent
} from '../dropdown-menu.component';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './dropdown-parent.component.fixture.html'
})
export class DropdownParentTestComponent {
  public trigger: String;
  public buttonType: String;
  public myTitle: string;
  public buttonStyle: String;
  public dropdownController = new Subject<SkyDropdownMessageEventArgs>();
  public disabledDropdownController = new Subject<SkyDropdownMessageEventArgs>();

  public changingItems: any[] = [
    {}, {}, {}
  ];

  @ViewChild('remoteDropdown')
  public remoteDropdown: SkyDropdownComponent;

  @ViewChild('disabledDropdownMenu')
  public disabledDropdownMenu: SkyDropdownMenuComponent;

  @ViewChild('keyboardDropdownMenu')
  public keyboardDropdownMenu: SkyDropdownMenuComponent;

  @ViewChild('changingDropdownMenu')
  public changingDropdownMenu: SkyDropdownMenuComponent;

  public constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  public sendMessage(message: SkyDropdownMessageType) {
    this.dropdownController.next({ message });
  }

  public changeItems() {
    this.changingItems = [
      {}, {}
    ];
    this.changeDetector.detectChanges();
  }
}
