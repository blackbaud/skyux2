import {
  Component,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
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

  public get reactiveTime() {
    return this.reactiveForm.get('time');
  }

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.reactiveForm = this.formBuilder.group({
      time: new FormControl('2:45', Validators.required)
    });
  }

  public clearSelectedTimes() {
    this.selectedTime1 = undefined;
    this.reactiveTime.setValue(undefined);

    console.log('Form value:', this.reactiveForm.value);
  }
}
