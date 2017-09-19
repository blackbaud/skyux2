import { Component } from '@angular/core';

@Component({
  selector: 'sky-design-action-buttons',
  templateUrl: 'design-action-button.component.html'
})
export class DesignActionButtonsComponent {
  public routes = [
    {
      name: 'Accessibility',
      path: '/design/accessibility',
      icon: 'universal-access',
      // tslint:disable-next-line
      summary: 'Guidelines for building features that conform to WCAG 2.0 best practices.'
    },
    {
      name: 'Borders',
      path: '/design/borders',
      icon: 'square-o',
      // tslint:disable-next-line
      summary: 'Line styles explain how to bound, divide, and highlight content and maintain visual hierarchy.'
    },
    {
      name: 'Colors',
      path: '/design/color',
      icon: 'paint-brush',
      // tslint:disable-next-line
      summary: 'Color guidelines provide base colors to convey meaning in backgrounds, borders, and text.'
    },
    {
      name: 'Icons',
      path: '/design/icons',
      icon: 'picture-o',
      // tslint:disable-next-line
      summary: 'SKY UX provides a dictionary of glyphic, mono-color icons to facilitate, guide, and inform users.'
    },
    {
      name: 'Motion',
      path: '/design/motion',
      icon: 'film',
      // tslint:disable-next-line
      summary: 'Motion guidelines explain the principles and physics of how to use motion in SKY UX animations.'
    },
    {
      name: 'Spacing',
      path: '/design/spacing',
      icon: 'th',
      // tslint:disable-next-line
      summary: 'SKY UX uses margins and padding to separate items and ensure page content flows together.'
    },
    {
      name: 'Typography',
      path: '/design/typography',
      icon: 'font',
      // tslint:disable-next-line
      summary: 'Semantically defined font classes ensure consistency and enforce visual hierarchy for text.'
    }
  ];
}
