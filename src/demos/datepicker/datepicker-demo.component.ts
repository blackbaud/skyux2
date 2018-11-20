import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'sky-datepicker-demo',
  templateUrl: './datepicker-demo.component.html'
})
export class SkyDatepickerDemoComponent implements OnInit {
  public minDate: Date;
  public maxDate: Date;
  public selectedDate: Date;
  public reactiveForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.reactiveForm = this.formBuilder.group({
      selectedDate: new Date()
    });
  }

  public clearSelectedDate(): void {
    this.selectedDate = undefined;
  }
}
