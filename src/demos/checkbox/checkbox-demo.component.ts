import {
  Component
} from '@angular/core';

@Component({
  selector: 'sky-checkbox-demo',
  templateUrl: './checkbox-demo.component.html'
})
export class SkyCheckboxDemoComponent {
  public checkboxItems = [
    {
      label: 'Checkbox 1'
    },
    {
      label: 'Checkbox 2',
      checked: true
    },
    {
      label: 'Disabled',
      disabled: true
    },
    {
      label: 'Disabled and checked',
      checked: true,
      disabled: true
    }
  ];
}
