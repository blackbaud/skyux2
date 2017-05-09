import {
  Component,
  ViewChild
} from '@angular/core';

import {
  SkyTimepickerInputDirective
} from '../timepicker.directive';

@Component({
  selector: 'sky-test-cmp',
  template: require('./timepicker-component.fixture.html')
})
export class TimepickerTestComponent {
  public format: string = 'hh';
  public returnFormat: string = undefined;
  public selectedTime: string;

  @ViewChild(SkyTimepickerInputDirective)
  public timepicker: SkyTimepickerInputDirective;
}
