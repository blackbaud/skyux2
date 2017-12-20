import {
  Component,
  ViewChild
} from '@angular/core';

import {
  SkyDropdownComponent
} from '../dropdown.component';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './dropdown.component.fixture.html'
})
export class DropdownTestComponent {
  public trigger: String;
  public buttonType: String;
  public myTitle: string;
  public alignment: string = 'left';
  public buttonStyle: string;

  @ViewChild('vanillaDropdown')
  public vanillaDropdown: SkyDropdownComponent;
}
