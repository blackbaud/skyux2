import { Component } from '@angular/core';

import { SkyAlertComponent } from '../alert.component';

@Component({
  selector: 'sky-test-cmp',
  directives: [SkyAlertComponent],
  template: require('./alert.component.fixture.html')
})
export class AlertTestComponent {
  public closeable = false;

  public closed = false;

  public alertType = 'info';
}
