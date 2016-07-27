import { Component } from '@angular/core';

import { SkyLabelComponent } from '../label.component';

@Component({
  selector: 'sky-test-cmp',
  template: require('./label.component.fixture.html'),
  directives: [SkyLabelComponent]
})
export class LabelTestComponent {
  public labelType = 'danger';
}
