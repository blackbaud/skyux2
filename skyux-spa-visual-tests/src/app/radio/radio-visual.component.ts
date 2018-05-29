import {
  Component
} from '@angular/core';

import {
  FormBuilder,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'radio-visual',
  templateUrl: './radio-visual.component.html'
})
export class RadioVisualComponent {
  public selectedValue = '3';
  public valueGuy = '2';
  public radioForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.radioForm = this.formBuilder.group({
      option: '1'
    });
  }
}
