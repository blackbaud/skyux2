import {
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

  @ViewChild('remoteDropdown')
  public remoteDropdown: SkyDropdownComponent;

  public sendMessage(message: SkyDropdownMessageType) {
    this.dropdownController.next({ message });
  }
}
