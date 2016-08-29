import { Component } from '@angular/core';

import { SkyKeyInfoComponent } from '../key-info.component';

@Component({
  selector: 'sky-test-cmp',
  template: require('./key-info.component.fixture.html'),
  directives: [SkyKeyInfoComponent]
})
export class KeyInfoTestComponent {
  public layout = 'vertical';
}
