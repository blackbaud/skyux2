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
  public iconCheckboxGroup = [
    {
      label: 'Bold',
      checked: true,
      icon: 'bold'
    },
    {
      label: 'Italic',
      checked: false,
      icon: 'italic'
    },
    {
      label: 'Underline',
      checked: true,
      icon: 'underline'
    }
  ];
  public iconCheckboxItems = [
    {
      label: 'Info icon checkbox 1',
      checked: true,
      icon: 'info'
    },
    {
      label: 'Disabled info icon checkbox 1',
      checked: true,
      disabled: true,
      icon: 'strikethrough'
    },
    {
      label: 'Success icon checkbox',
      checked: true,
      icon: 'star',
      checkboxType: 'success'
    },
    {
      label: 'Warning icon checkbox',
      checked: true,
      icon: 'exclamation-triangle',
      checkboxType: 'warning'
    },
    {
      label: 'Danger icon checkbox',
      checked: true,
      icon: 'ban',
      checkboxType: 'danger'
    }
  ];
}
