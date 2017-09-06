import { Component } from '@angular/core';

@Component({
  selector: 'sky-vertical-tabs-demo',
  templateUrl: './vertical-tabs-demo.component.html'
})
export class SkyVerticalTabsDemoComponent {

  public groups: any[];
  public activeTabIndex: any = 0;

  constructor() {
    this.groups = [
      {
        heading: 'Group 1',
        isOpen: true,
        isDisabled: false,
        subTabs: [
          { tabHeading: 'Group 1 - Tab 1', content: 'Group 1 - Tab 1 Content'},
          { tabHeading: 'Group 1 - Tab 2', content: 'Group 1 - Tab 2 Content', tabHeaderCount: 7}]
      },
      {
        heading: 'Group 2',
        isOpen: false,
        isDisabled: false,
        subTabs: [
          { tabHeading: 'Group 2 - Tab 1', content: 'Group 2 - Tab 1 Content'},
          { tabHeading: 'Group 2 - Tab 2', content: 'Group 2 - Tab 2 Content'}]
      },
      {
        heading: 'Disabled',
        isOpen: false,
        isDisabled: true,
        subTabs: []
      }
    ];
  }

  public tabChanged(newIndex: any) {
    console.log('new active', this.activeTabIndex);
  }
}
