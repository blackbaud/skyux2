import { Component } from '@angular/core';

import { SkyModalComponent } from '../modal.component';

@Component({
  selector: 'sky-test-cmp',
  template: require('./modal.component.fixture.html'),
  directives: [SkyModalComponent]
})
export class ModalTestComponent {

}
