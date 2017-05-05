import {
  Component,
  ViewChild
} from '@angular/core';

import {
  SkyTimepickerComponent
} from '../timepicker.component';

@Component({
  selector: 'sky-test-cmp',
  template: require('./timepicker.component.fixture.html')
})
export class TimepickerTestComponent {
  public format12 = 'hh';
  public format24 = 'HH';

  @ViewChild(SkyTimepickerComponent)
  public timepicker: SkyTimepickerComponent;
}
