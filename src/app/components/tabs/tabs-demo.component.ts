import { Component } from '@angular/core';

@Component({
  selector: 'sky-tabs-demo',
  templateUrl: './tabs-demo.component.html'
})
export class SkyTabsDemoComponent {
  public tabs: any[];
  public tabsWithCounts: any[];
  public groups: any[];

  public activeTabIndex: any = 0;

  constructor() {
    this.tabs = [
      {
        heading: 'Tab 1',
        content: 'Content 1',
        active: true
      },
      {
        heading: 'Tab 2',
        content: 'Content 2'
      },
      {
        heading: 'Tab 3',
        content: 'Content 3'
      }
    ];
    this.tabsWithCounts = [
      {
        heading: 'Records',
        content: 'Placeholder content for records',
        headerCount: 10,
        active: true
      },
      {
        heading: 'Gifts',
        content: 'Placeholder content for gifts',
        headerCount: 14
      },
      {
        heading: 'Users',
        content: 'Placeholder content for users',
        headerCount: 144
      }
    ];
    this.groups = [
      {
        heading: 'Group 1',
        isOpen: true,
        isDisabled: false,
        subTabs: [
          { tabHeading: 'Group 1 - Tab 1', content: 'Group 1 - Tab 1 Content'},
          { tabHeading: 'Group 1 - Tab 2', content: 'Group 1 - Tab 2 Content'}]
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

  public closeClick(tabIndex: number) {
    this.tabs.splice(tabIndex, 1);
  }

  public newTabClick() {
    let nextTab = this.tabs && this.tabs.length + 1;

    this.tabs.push({
      heading: 'Tab ' + nextTab,
      content: 'Content ' + nextTab,
      active: true
    });
  }

  public openTabClick() {
    alert('You clicked the open tab button');
  }

  public tabChanged(newIndex: any) {
    console.log('new active', this.activeTabIndex);
  }
}
