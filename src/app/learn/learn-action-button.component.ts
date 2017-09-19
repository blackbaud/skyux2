import { Component } from '@angular/core';

@Component({
  selector: 'sky-learn-action-buttons',
  templateUrl: 'learn-action-button.component.html'
})
export class LearnActionButtonsComponent {
  public routes = [
    {
      name: 'Overview',
      path: '/learn/overview',
      icon: 'sitemap',
      // tslint:disable-next-line
      summary: 'SKY UX provides a consistent, cohesive user experience for Blackbaud products.'
    },
    {
      name: 'Get started',
      path: '/learn/get-started',
      icon: 'road',
      // tslint:disable-next-line
      summary: 'Follow along with our tutorials to learn the basics of working with SKY UX.'
    },
    {
      name: 'Technical reference',
      path: '/learn/reference',
      icon: 'book',
      // tslint:disable-next-line
      summary: 'Review the technical references for help to manage and configure SKY UX projects.'
    }
  ];
}
