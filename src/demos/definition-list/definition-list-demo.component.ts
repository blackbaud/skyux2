import { Component } from '@angular/core';

@Component({
  selector: 'sky-definition-list-demo',
  templateUrl: './definition-list-demo.component.html'
})
export class SkyDefinitionListDemoComponent {
  public personalInfo: { label: string, value: string }[] = [
    {
      label: 'Job title',
      value: 'Engineer'
    },
    {
      label: 'Hobby',
      value: 'Volleyball'
    },
    {
      label: 'Experience',
      value: '3 years'
    }
  ];

  public systemInfo: { label: string, value?: string }[] = [
    {
      label: 'Username',
      value: 'user1'
    },
    {
      label: 'Role',
      value: 'Admin'
    },
    {
      label: 'Last log-in time'
    }
  ];
}
