import {
  ChangeDetectorRef,
  Component,
  ViewChild
} from '@angular/core';

import { Subject } from 'rxjs/Subject';

import {
  SkyDropdownMessageType,
  SkyDropdownMessage
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
  public dropdownController = new Subject<SkyDropdownMessage>();
  public disabledDropdownController = new Subject<SkyDropdownMessage>();

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

  public sendMessage(type: SkyDropdownMessageType) {
    this.dropdownController.next({ type });
  }

  public changeItems() {
    this.changingItems = [
      {}, {}
    ];
    this.changeDetector.detectChanges();
  }

  public removeItems() {
    this.changingItems = [];
    this.changeDetector.detectChanges();
  }
}
