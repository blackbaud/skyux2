import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'sky-datepicker-demo',
  templateUrl: './datepicker-demo.component.html'
})
export class SkyDatepickerDemoComponent implements OnInit{
  public dateTimeForm = new FormGroup({
    'date': new FormControl({ value: '', disabled: true }, [Validators.required]),
    'time': new FormControl({ value: '', disabled: true }, [Validators.required])
  });

  public ngOnInit() {
  }
}
