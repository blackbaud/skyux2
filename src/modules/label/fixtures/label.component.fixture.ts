import { Component } from '@angular/core';

@Component({
  selector: 'sky-test-cmp',
  template: require('./label.component.fixture.html')
})
export class LabelTestComponent {
  public labelType = 'danger';
}
