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
      label: 'Fixed icon checkbox',
      checked: false,
      icon: 'bold',
      fixedIcon: true
    },
    {
      label: 'Not fixed icon checkbox',
      checked: true,
      icon: 'umbrella'
    },
    {
      label: 'Fixed success icon checkbox',
      checked: false,
      icon: 'star',
      fixedIcon: true,
      checkboxType: 'success'
    },
    {
      label: 'Fixed danger icon checkbox',
      checked: true,
      icon: 'ban',
      fixedIcon: true,
      checkboxType: 'danger'
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
