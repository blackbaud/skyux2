import { Component } from '@angular/core';

@Component({ 
    selector: 'design-action-buttons',
    templateUrl: 'design-action-button.component.html'
})
export class DesignActionButtonsComponent {
    public routes = [
        {
            name: 'Borders',
            path: '/design/borders',
            icon: 'square-o',
            summary: 'Line styles provide guidance on how to bound, divide, and highlight content and maintain visual hierarchy.'
        },
        {
            name: 'Colors',
            path: '/design/color',
            icon: 'paint-brush',
            summary: 'The color guidelines provide base colors to convey meaning in backgrounds, borders, and text.'
        },
        {
            name: 'Icons',
            path: '/design/icons',
            icon: 'picture-o',
            summary: 'SKY UX provides a dictionary of glyphic, mono-color icons to facilitate, guide, and inform users.'
        },
        {
            name: 'Motion',
            path: '/design/motion',
            icon: 'film',
            summary: 'The motion guidelines explain the principles and physics of how to use motion in SKY UX animations.'
        },
        {
            name: 'Spacing',
            path: '/design/spacing',
            icon: 'th',
            summary: 'SKY UX specifies margins and padding to separate items and ensure that page content flows together.'
        },
        {
            name: 'Typography',
            path: '/design/typography',
            icon: 'font',
            summary: 'Semantically defined font classes ensure consistency and enforce visual hierarchy for text.'
        }
    ];
}