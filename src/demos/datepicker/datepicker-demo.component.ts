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
  selector: 'sky-datepicker-demo',
  templateUrl: './datepicker-demo.component.html'
})
export class SkyDatepickerDemoComponent implements OnInit {
  public minDate: Date;
  public maxDate: Date;
  public selectedDate = '4/4/2017';
  public reactiveForm: FormGroup;

  public get reactiveDate() {
    return this.reactiveForm.get('selectedDate');
  }

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.reactiveForm = this.formBuilder.group({
      selectedDate: new FormControl('4/4/2017', Validators.required)
    });
  }

  public clearSelectedDates(): void {
    this.selectedDate = undefined;
    this.reactiveDate.setValue(undefined);
  }
}
