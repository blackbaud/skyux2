import {
  Component
} from '@angular/core';

import {
  SkySelectField
} from '@blackbaud/skyux/dist/core';

@Component({
  selector: 'select-field-visual',
  templateUrl: './select-field-visual.component.html'
})
export class SelectFieldVisualComponent {

  public pickerItems: SkySelectField = [
    { id: '1', category: 'Pome', label: 'Apple', description: 'Anne eats apples' },
    { id: '2', category: 'Berry', label: 'Banana', description: 'Ben eats bananas' },
    { id: '3', category: 'Pome', label: 'Pear', description: 'Patty eats pears' },
    { id: '4', category: 'Berry', label: 'Grape', description: 'George eats grapes' },
    { id: '5', category: 'Berry', label: 'Banana', description: 'Becky eats bananas' },
    { id: '6', category: 'Citrus', label: 'Lemon', description: 'Larry eats lemons' },
    { id: '7', category: 'Aggregate fruit', label: 'Strawberry', description: 'Sally eats strawberries' }
  ];
  public multipleItemsSelected: SkySelectField = [
    this.pickerItems[1],
    this.pickerItems[2],
    this.pickerItems[3]
  ];
  public singleItemsSelected: SkySelectField = [
    this.pickerItems[3]
  ];

  constructor() { }
}
