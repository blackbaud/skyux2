import { Component } from '@angular/core';

@Component({
  selector: 'sky-timepicker-demo',
  templateUrl: './timepicker-demo.component.html'
})
export class SkyTimePickerDemoComponent {
  public format12 = 'hh';
  public format24 = 'HH';
  public selectedTime1 = '8:30 PM';
  public selectedTime2 = '20:30';
}
