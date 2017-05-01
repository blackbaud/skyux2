import { Component } from '@angular/core';

@Component({
  selector: 'sky-datepicker-demo',
  templateUrl: './datepicker-demo.component.html'
})
export class SkyDatepickerDemoComponent {

  public minDate: Date = new Date('5/12/2013');

  public maxDate: Date = new Date('5/12/2018');

  public selectedDate: Date;
}
