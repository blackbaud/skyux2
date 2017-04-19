import { Component } from '@angular/core';

@Component({
  selector: 'sky-test-cmp',
  template: require('./datepicker-calendar.component.fixture.html')
})
export class DatepickerTestComponent {

  public minDate: Date;

  public maxDate: Date;

  public selectedDate: Date;
}
