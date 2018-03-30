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
  selector: 'sky-select-field-demo',
  templateUrl: 'select-field-demo.component.html'
})
export class SkySelectFieldDemoComponent implements OnInit {
  public reactiveForm: FormGroup;

  public pickerItems = [
    { id: '1', category: 'Pome', label: 'Apple', description: 'Anne eats apples' },
    { id: '2', category: 'Berry', label: 'Banana', description: 'Ben eats bananas' },
    { id: '3', category: 'Pome', label: 'Pear', description: 'Patty eats pears' },
    { id: '4', category: 'Berry', label: 'Grape', description: 'George eats grapes' },
    { id: '5', category: 'Berry', label: 'Banana', description: 'Becky eats bananas' },
    { id: '6', category: 'Citrus', label: 'Lemon', description: 'Larry eats lemons' },
    { id: '7', category: 'Aggregate fruit', label: 'Strawberry', description: 'Sally eats strawberries' }
  ];

  public fruits = [
    { name: 'Apple' },
    { name: 'Banana' },
    { name: 'Orange' }
  ];

  public singleModeStyle = 'single';
  public singleModeText = 'Select a value';
  public singleItemSelected = [this.pickerItems[3]];

  public multipleModeText = 'Select some values';
  public multipleItemsSelected = [
    this.pickerItems[3],
    this.pickerItems[6],
    this.pickerItems[5]
  ];

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.createForm();
  }

  public submitReactiveForm(): void {
    alert('Form submitted with: \n' + JSON.stringify(this.reactiveForm.value));
  }

  private createForm(): void {
    this.reactiveForm = this.formBuilder.group({
      favoriteFruits: new FormControl([
        this.fruits[0]
      ])
    });
  }
}
