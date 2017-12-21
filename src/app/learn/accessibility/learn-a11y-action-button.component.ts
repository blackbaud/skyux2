import { Component } from '@angular/core';

@Component({
  selector: 'sky-learn-a11y-action-buttons',
  templateUrl: 'learn-a11y-action-button.component.html'
})
export class LearnA11yActionButtonsComponent {
  public routes = [
    {
      name: 'Design for accessibility',
      path: '/learn/accessibility/design',
      icon: 'rocket',
      // tslint:disable-next-line
      summary: 'Principles and tools to design highly accessible experiences with SKY UX.'
    },
    {
      name: 'Code for accessibility',
      path: '/learn/accessibility/code',
      icon: 'code',
      // tslint:disable-next-line
      summary: 'Best practices to use in your markup and custom components.'
    },
    {
      name: 'Test for accessibility',
      path: '/learn/accessibility/test',
      icon: 'bug',
      // tslint:disable-next-line
      summary: 'How to test your application to ensure it is highly accessible.'
    }
  ];
}
