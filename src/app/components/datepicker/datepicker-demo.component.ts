import { Component } from '@angular/core';

@Component({
  selector: 'sky-datepicker-demo',
  templateUrl: './datepicker-demo.component.html'
})
export class SkyDatepickerDemoComponent {

  public minDate: Date = new Date('4/3/2017');

  public maxDate: Date = new Date('4/28/2017');

  public selectedDate: Date = new Date('4/1/2017');
}
