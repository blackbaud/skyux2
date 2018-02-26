import { Component } from '@angular/core';

@Component({
  selector: 'sky-select-field-demo',
  templateUrl: 'select-field-demo.component.html'
})

export class SkySelectFieldDemoComponent {
  public pickerItems = [
    { id: '1', category: 'Pome', label: 'Apple', description: 'Anne eats apples' },
    { id: '2', category: 'Berry', label: 'Banana', description: 'Ben eats bananas' },
    { id: '3', category: 'Pome', label: 'Pear', description: 'Patty eats pears' },
    { id: '4', category: 'Berry', label: 'Grape', description: 'George eats grapes' },
    { id: '5', category: 'Berry', label: 'Banana', description: 'Becky eats bananas' },
    { id: '6', category: 'Citrus', label: 'Lemon', description: 'Larry eats lemons' },
    { id: '7', category: 'Aggregate fruit', label: 'Strawberry', description: 'Sally eats strawberries' }
  ];

  public singleModeStyle = 'single';
  public singleModeText = 'Choose one value';
  public singleItemSelected = [this.pickerItems[3]];

  public multipleModeText = 'Select some values';
  public multipleItemsSelected = [this.pickerItems[3], this.pickerItems[6], this.pickerItems[5]];

  public noItemSelected: string = undefined;

}
