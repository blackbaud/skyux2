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
      summary: 'Follow along with our get-started tutorials to get up and running with SKY UX.'
    },
    {
      name: 'Contribute',
      path: '/learn/contribute',
      icon: 'exchange',
      // tslint:disable-next-line
      summary: 'We encourage contributions from all SKY UX users. Learn about our coding conventions.'
    },
    {
      name: 'FAQ',
      path: '/learn/faq',
      icon: 'question-circle-o',
      // tslint:disable-next-line
      summary: 'Check the FAQ for answers to some frequently asked questions about SKY UX.'
    },
    {
      name: 'Technical reference',
      path: '/learn/reference',
      icon: 'book',
      // tslint:disable-next-line
      summary: 'Review the technical references for help to manage and configure SKY UX projects.'
    },
    {
      name: 'Accessibility',
      path: '/learn/accessibility',
      icon: 'universal-access',
      // tslint:disable-next-line
      summary: 'Learn about accessibility testing in SKY UX and why we care about accessibility.'
    },
    {
      name: 'Resources',
      path: '/learn/resources',
      icon: 'search',
      // tslint:disable-next-line
      summary: 'Check out learning resources for the tools and technologies that SKY UX uses.'
    }
  ];
}
