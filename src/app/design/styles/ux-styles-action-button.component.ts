import { Component } from '@angular/core';

@Component({
  selector: 'sky-ux-styles-action-buttons',
  templateUrl: 'ux-styles-action-button.component.html'
})
export class SkyUXStylesActionButtonsComponent {
  public routes = [
    {
      name: 'Borders',
      path: '/design/styles/borders',
      icon: 'square-o',
      // tslint:disable-next-line
      summary: 'Line styles explain how to bound, divide, and highlight content and maintain visual hierarchy.'
    },
    {
      name: 'Colors',
      path: '/design/styles/color',
      icon: 'paint-brush',
      // tslint:disable-next-line
      summary: 'Color guidelines provide base colors to convey meaning in backgrounds, borders, and text.'
    },
    {
      name: 'Icons',
      path: '/design/styles/icons',
      icon: 'picture-o',
      // tslint:disable-next-line
      summary: 'SKY UX provides a dictionary of glyphic, mono-color icons to facilitate, guide, and inform users.'
    },
    {
      name: 'Motion',
      path: '/design/styles/motion',
      icon: 'film',
      // tslint:disable-next-line
      summary: 'Motion guidelines explain the principles and physics of how to use motion in SKY UX animations.'
    },
    {
      name: 'Spacing',
      path: '/design/styles/spacing',
      icon: 'th',
      // tslint:disable-next-line
      summary: 'SKY UX uses margins and padding to separate items and ensure page content flows together.'
    },
    {
      name: 'Typography',
      path: '/design/styles/typography',
      icon: 'font',
      // tslint:disable-next-line
      summary: 'Semantically defined font classes ensure consistency and enforce visual hierarchy for text.'
    }
  ];
}
