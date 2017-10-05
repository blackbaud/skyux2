import { Component } from '@angular/core';

@Component({
  selector: 'sky-ux-action-buttons',
  templateUrl: 'ux-action-button.component.html'
})
export class DesignActionButtonsComponent {
  public routes = [
    {
      name: 'Accessibility',
      path: '/design/accessibility',
      icon: 'universal-access',
      // tslint:disable-next-line
      summary: 'Guidelines to build features that conform to WCAG 2.0 best practices.'
    },
    {
      name: 'Guidelines',
      path: '/design/guidelines',
      icon: 'map-o',
      // tslint:disable-next-line
      summary: 'Instructions on how to consistently design for specific scenarios.'
    },
    {
      name: 'Styles',
      path: '/design/styles',
      icon: 'paint-brush',
      // tslint:disable-next-line
      summary: 'Core design elements that provide the building blocks for SKY UX components.'
    }
  ];
}
