import {
  Component
} from '@angular/core';
import {
  FormGroup,
  FormBuilder
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
    private fb: FormBuilder
  ) {
    this.radioForm = this.fb.group({
      option: '1'
    });
  }
}
