import { Component } from '@angular/core';

@Component({
  selector: 'sky-guideline-action-buttons',
  templateUrl: 'guideline-action-button.component.html'
})
export class GuidelineActionButtonsComponent {
  public routes = [
    {
      name: 'Buttons and links',
      path: '/design/ux-guidelines/buttons-links',
      icon: '',
      // tslint:disable-next-line
      summary: 'Describes the contexts in which to use different types of buttons and hyperlinks.'
    },
    {
      name: 'Call out information',
      path: '/design/ux-guidelines/call-out-info',
      icon: '',
      // tslint:disable-next-line
      summary: 'SKY UX includes several options to highlight information and draw user attention.'
    },
    {
      name: 'Content containers',
      path: '/design/ux-guidelines/content-containers',
      icon: '',
      // tslint:disable-next-line
      summary: 'Describes the contexts in which to use different types of content containers.'
    },
    {
      name: 'Filtering lists',
      path: '/design/ux-guidelines/filtering-lists',
      icon: '',
      // tslint:disable-next-line
      summary: 'Filter patterns provide guidance on how to display filter options in various scenarios.'
    },
    {
      name: 'Form containers',
      path: '/design/ux-guidelines/form-containers',
      icon: '',
      // tslint:disable-next-line
      summary: 'Form container patterns determine the type of form to use to meet different workflow requirements.'
    },
    {
      name: 'Managing records',
      path: '/design/ux-guidelines/managing-records',
      icon: '',
      // tslint:disable-next-line
      summary: 'Record management patterns provide guidance on how records should be added, edited and removed.'
    },
    {
      name: 'Page layouts',
      path: '/design/ux-guidelines/page-layouts',
      icon: '',
      // tslint:disable-next-line
      summary: 'Responsive, mobile-first page layouts provide flexibility while conforming to SKY UX standards.'
    },
    {
      name: 'Selecting items from lists',
      path: '/design/ux-guidelines/select-items',
      icon: '',
      // tslint:disable-next-line
      summary: 'A variety of controls are available to present lists and allow users to select list items.'
    },
    {
      name: 'User assistance',
      path: '/design/ux-guidelines/user-assistance',
      icon: '',
      // tslint:disable-next-line
      summary: 'User assistance patterns facilitate access to help documentation and other explanatory content.'
    }
  ];
}
