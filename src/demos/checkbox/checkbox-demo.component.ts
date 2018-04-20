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
    },
    {
      description: 'Icon Checkbox 1',
      icon: 'fa-star'
    },
    {
      description: 'Icon Checkbox 2',
      icon: 'fa-exclamation-triangle',
      iconColor: 'warning',
      checked: true
    },
    {
      description: 'Disabled Icon Checkbox',
      icon: 'fa-star',
      disabled: true
    },
    {
      description: 'Disabled and selected Icon Checkbox ',
      icon: 'fa-exclamation-triangle',
      iconColor: 'warning',
      checked: true,
      disabled: true
    }
  ];
}
