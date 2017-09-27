import { Component } from '@angular/core';

@Component({
  selector: 'sky-guideline-action-buttons',
  templateUrl: 'guideline-action-button.component.html'
})
export class GuidelineActionButtonsComponent {
  public routes = [
    {
      name: 'Buttons and links',
      path: '/ux-guidelines/buttons-links',
      icon: '',
      // tslint:disable-next-line
      summary: 'Describes the contexts in which to use different types of buttons and hyperlinks.'
    },
    {
      name: 'Call out information',
      path: '/ux-guidelines/call-out-info',
      icon: '',
      // tslint:disable-next-line
      summary: 'SKYUX includes several options to highlight information and draw user attention.'
    },
    {
      name: 'Content containers',
      path: '/ux-guidelines/content-containers',
      icon: '',
      // tslint:disable-next-line
      summary: 'Describes the contexts in which to use different types of content containers.'
    },
    {
      name: 'Filtering lists',
      path: '/ux-guidelines/filtering-lists',
      icon: '',
      // tslint:disable-next-line
      summary: 'Filter patterns provide guidance on how to display filter options in various scenarios.'
    },
    {
      name: 'Forms',
      path: '/ux-guidelines/forms',
      icon: '',
      // tslint:disable-next-line
      summary: 'Form patterns determine the type of form to use to meet different workflow requirements.'
    },    
    {
      name: 'Managing records',
      path: '/ux-guidelines/managing-records',
      icon: '',
      // tslint:disable-next-line
      summary: 'Record management patterns provide guidance on how records should be added, edited and removed.'
    },
    {
      name: 'Page layouts',
      path: '/ux-guidelines/page-layouts',
      icon: '',
      // tslint:disable-next-line
      summary: 'Responsive, mobile-first page layouts provide flexibility while conforming to SKYUX standards.'
    },
    {
      name: 'Selecting items from lists',
      path: '/ux-guidelines/select-items',
      icon: '',
      // tslint:disable-next-line
      summary: 'A variety of controls are available to present lists and allow users to select list items.'
    },
    {
      name: 'User assistance',
      path: '/ux-guidelines/user-assistance',
      icon: '',
      // tslint:disable-next-line
      summary: 'User assistance patterns facilitate access to help documentation and other explanatory content.'
    }
  ];
}
