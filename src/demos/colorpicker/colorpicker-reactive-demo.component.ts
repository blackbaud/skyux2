import {
  Component,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';

import {
  SkyColorpickerOutput
} from '../../core';

@Component({
  selector: 'sky-colorpicker-reactive-demo',
  templateUrl: './colorpicker-reactive-demo.component.html'
})
export class SkyColorpickerReactiveDemoComponent implements OnInit {
  public reactiveForm: FormGroup;

  public swatches = [
    '#BD4040',
    '#617FC2',
    '#60AC68',
    '#3486BA',
    '#E87134',
    '#DA9C9C'
  ];

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.createForm();
  }

  public onSelectedColorChanged(args: SkyColorpickerOutput): void {
    console.log('Reactive form color changed:', args);
  }

  public submit(): void {
    const controlValue = this.reactiveForm.get('favoriteColor').value;
    const favoriteColor: string = controlValue.hex || controlValue;
    alert('Your favorite color is: \n' + favoriteColor);
  }

  private createForm(): void {
    this.reactiveForm = this.formBuilder.group({
      favoriteColor: new FormControl('#f00')
    });
  }
}
