import {
  Component
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl
} from '@angular/forms';

@Component({
  templateUrl: './radio-group.component.fixture.html'
})
export class RadioGroupTestComponent {
  public radioForm: FormGroup;
  public options = [
    { name: 'Lillith Corharvest', disabled: false },
    { name: 'Harima Kenji', disabled: false },
    { name: 'Harry Mckenzie', disabled: false }
  ];

  constructor(
    private fb: FormBuilder
  ) {
    this.radioForm = this.fb.group({
      option: new FormControl(this.options[0])
    });
  }
}
