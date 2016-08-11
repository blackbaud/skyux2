import { Component } from '@angular/core';

import { SkyModalComponent } from '../modal.component';
import { ModalTestValues } from './modal-values.fixture';

@Component({
  selector: 'sky-test-cmp-with-values',
  template: require('./modal-with-values.component.fixture.html'),
  directives: [SkyModalComponent]
})
export class ModalWithValuesTestComponent {
  constructor(public values: ModalTestValues) { }
}
