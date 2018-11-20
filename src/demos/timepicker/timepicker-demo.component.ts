import {
  Component,
  OnInit
} from '@angular/core';

import {
  FormGroup,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'sky-timepicker-demo',
  templateUrl: './timepicker-demo.component.html'
})
export class SkyTimepickerDemoComponent implements OnInit {
  public format12 = 'hh';
  public format24 = 'HH';
  public returnFormat = 'HH:mm:ssZ';
  public selectedTime1: any = '8:30 PM';
  public selectedTime2: any = '20:30';
  public selectedTime3: any = '02:00:00-0400';
  public reactiveForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.reactiveForm = this.formBuilder.group({
      time: '2:15 PM'
    });
  }

  public clearSelectedTime() {
    this.selectedTime1 = undefined;
  }
}
