import { Component } from '@angular/core';

@Component({
  selector: 'sky-test-cmp',
  template: require('./dropdown.component.fixture.html')
})
export class DropdownTestComponent {
  public buttonType: String;
}
