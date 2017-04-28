import { Component } from '@angular/core';

@Component({
  selector: 'sky-datepicker-demo',
  templateUrl: './datepicker-demo.component.html',
  styleUrls: ['./datepicker-demo.component.scss']
})
export class SkyDatepickerDemoComponent {

  public minDate: Date;

  public maxDate: Date;

  public selectedDate: Date = new Date('4/4/2017');

  public startingDay: number = 0;
}
