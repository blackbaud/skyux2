import { Component } from '@angular/core';

@Component({
  selector: 'sky-datepicker-demo',
  templateUrl: './datepicker-demo.component.html'
})
export class SkyDatepickerDemoComponent {

  public minDate: Date;

  public maxDate: Date;

  public selectedDate: Date;
}
