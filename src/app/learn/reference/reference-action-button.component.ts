import { Component } from '@angular/core';

@Component({
  selector: 'sky-reference-action-buttons',
  templateUrl: 'reference-action-button.component.html'
})
export class ReferenceActionButtonsComponent {
  public routes = [
    {
      name: 'SKY UX CLI',
      path: '/learn/reference/cli-commands',
      icon: 'code',
      // tslint:disable-next-line
      summary: 'Commands and options to create and manage single-page applications.'
    },
    {
      name: 'Configuration',
      path: '/learn/reference/configuration',
      icon: 'cubes',
      // tslint:disable-next-line
      summary: 'Configuration options provided by the SKY UX template.'
    },
    {
      name: 'File conventions',
      path: '/learn/reference/naming-and-placement',
      icon: 'file',
      // tslint:disable-next-line
      summary: 'Guidance on how to name files and where to place them.'
    },
    {
      name: 'Template items',
      path: '/learn/reference/template-items',
      icon: 'file-text',
      // tslint:disable-next-line
      summary: 'Default items that the SKY UX template provides for SPAs.'
    },
    {
      name: 'Tests',
      path: '/learn/reference/tests',
      icon: 'tachometer',
      // tslint:disable-next-line
      summary: 'Guidance on unit tests and end-to-end tests in SKY UX SPAs.'
    },
    {
      name: 'Libraries',
      path: '/learn/reference/component-libraries',
      icon: 'book',
      // tslint:disable-next-line
      summary: 'Create reusable libraries of SKY UX components and services.'
    },
    {
      name: 'Helpers',
      path: '/learn/reference/helpers',
      icon: 'wrench',
      // tslint:disable-next-line
      summary: 'Helpers that SKY UX provides for making authenticated HTTP requests.'
    },
    {
      name: 'FAQ',
      path: '/learn/reference/faq',
      icon: 'question-circle-o',
      // tslint:disable-next-line
      summary: 'The FAQ addresses frequently asked questions about SKY UX.'
    },
    {
      name: 'Resources',
      path: '/learn/reference/resources',
      icon: 'search',
      // tslint:disable-next-line
      summary: 'Helpful tips on the tools and technologies that SKY UX uses.'
    }
  ];
}
