import { Component } from '@angular/core';

@Component({
  selector: 'sky-ux-action-buttons',
  templateUrl: 'ux-action-button.component.html'
})
export class DesignActionButtonsComponent {
  public routes = [
    {
      name: 'Accessibility',
      path: '/design/ux-accessibility',
      icon: 'universal-access',
      // tslint:disable-next-line
      summary: 'Guidelines for building features that conform to WCAG 2.0 best practices.'
    },
    {
      name: 'Guidelines',
      path: '/design/ux-guidelines',
      icon: 'map-o',
      // tslint:disable-next-line
      summary: 'Guidelines to help you consistently design for specific scenarios.'
    },
    {
      name: 'Styles',
      path: '/design/ux-styles',
      icon: 'paint-brush',
      // tslint:disable-next-line
      summary: 'Core design elements that serve as building blocks for SKY UX components.'
    }
  ];
}
