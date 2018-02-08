import { Component } from '@angular/core';

@Component({
  selector: 'sky-checkbox-demo',
  templateUrl: './checkbox-demo.component.html'
})
export class SkyCheckboxDemoComponent {
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
}
