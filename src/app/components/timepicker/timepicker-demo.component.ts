import { Component } from '@angular/core';

@Component({
  selector: 'sky-timepicker-demo',
  templateUrl: './timepicker-demo.component.html'
})
export class SkyTimePickerDemoComponent {
  public format12 = 'hh';
  public format24 = 'HH';
  public returnFormat = 'HH:mm:ssZ';
  public selectedTime1: any = '8:30 PM';
  public selectedTime2: any = '20:30';
  public selectedTime3: any = '02:00:00-0400';

}
