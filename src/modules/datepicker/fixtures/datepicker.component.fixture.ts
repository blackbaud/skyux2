import { Component } from '@angular/core';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './datepicker.component.fixture.html'
})
export class DatepickerTestComponent {

  public minDate: Date;

  public maxDate: Date;

  public selectedDate: any;
}
