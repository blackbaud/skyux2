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
  public iconCheckboxItems = [
    {
      label: 'Icon checkbox 1',
      checked: false,
      icon: 'bold'
    },
    {
      label: 'Icon checkbox 2',
      checked: true,
      icon: 'umbrella'
    },
    {
      label: 'Success icon checkbox',
      checked: false,
      icon: 'star',
      checkboxType: 'success'
    },
    {
      label: 'Warning icon checkbox',
      checked: false,
      icon: 'exclamation-triangle',
      checkboxType: 'warning'
    },
    {
      label: 'Danger icon checkbox',
      checked: false,
      icon: 'ban',
      checkboxType: 'danger'
    }
  ]
}
