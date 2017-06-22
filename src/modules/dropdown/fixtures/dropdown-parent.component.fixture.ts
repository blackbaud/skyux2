import { Component } from '@angular/core';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './dropdown-parent.component.fixture.html'
})
export class DropdownParentTestComponent {
  public trigger: String;
  public buttonType: String;
  public myTitle: string;
  public buttonStyle: String;
}
