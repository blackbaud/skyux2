import { Component } from '@angular/core';

@Component({
  selector: 'sky-get-started-action-buttons',
  templateUrl: 'get-started-action-button.component.html'
})
export class GetStartedActionButtonsComponent {
  public routes = [
    {
      name: 'Prerequisites',
      path: '/learn/get-started/prereqs',
      icon: 'list-ol',
      // tslint:disable-next-line
      summary: 'Guidance for the initial setup to get up and running with SKY UX.'
    },
    {
      name: 'Basics',
      path: '/learn/get-started/basics',
      icon: 'cubes',
      // tslint:disable-next-line
      summary: 'Building blocks for how to create and manage single-page applications.'
    },
    {
      name: 'Advanced',
      path: '/learn/get-started/advanced',
      icon: 'puzzle-piece',
      // tslint:disable-next-line
      summary: 'Tutorials that go beyond the basics on how manage SKY UX SPAs.'
    }
  ];
}
