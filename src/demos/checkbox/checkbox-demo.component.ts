import {
  Component,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'sky-checkbox-demo',
  templateUrl: './checkbox-demo.component.html'
})
export class SkyCheckboxDemoComponent implements OnInit {
  public reactiveForm: FormGroup;

  public checkboxItems = [
    {
      description: 'Checkbox 1'
    },
    {
      description: 'Checkbox 2',
      checked: true
    },
    {
      description: 'Disabled',
      disabled: true
    },
    {
      description: 'Disabled and selected',
      checked: true,
      disabled: true
    }
  ];

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.createForm();
  }

  public submitReactiveForm() {
    alert('Form submitted with: ' + JSON.stringify(this.reactiveForm.value));
  }

  private createForm(): void {
    this.reactiveForm = this.formBuilder.group({
      userAccepts: new FormControl(false)
    });
  }
}
