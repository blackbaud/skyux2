import { Component } from '@angular/core';

@Component({
  selector: 'sky-tabs-demo',
  templateUrl: './tabs-demo.component.html'
})
export class SkyTabsDemoComponent {
  public tabsArrayExample1: any[];
  public tabsArrayExample2: any[];
  public activeTabIndex1: any = 'tab-1';
  public activeTabIndex2: any = 0;
  private tabCounter: number;

  constructor() {
    this.tabsArrayExample1 = [
      {
        tabHeading: 'Tab 1',
        tabContent: 'Content 1',
        tabIndex: 'tab-1'
      },
      {
        tabHeading: 'Tab 2',
        tabContent: 'Content 2',
        tabIndex: 'tab-2'
      },
      {
        tabHeading: 'Tab 3',
        tabContent: 'Content 3',
        tabIndex: 'tab-3'
      }
    ];
    this.tabsArrayExample2 = [
      {
        tabHeading: 'Tab 1',
        tabContent: 'Content 1',
        tabIsCloseable: true
      },
      {
        tabHeading: 'Tab 2',
        tabContent: 'Content 2',
        tabIsCloseable: true
      },
      {
        tabHeading: 'Tab 3',
        tabContent: 'Content 3',
        tabIsCloseable: true
      },
      {
        tabHeading: 'Tab 4',
        tabContent: 'This tab cannot be closed',
        tabIsCloseable: false
      }
    ];
    this.tabCounter = this.tabsArrayExample2.length;
  }

  public closeClick(arrayIndex: number) {
    this.tabsArrayExample2.splice(arrayIndex, 1);
  }

  public addTabClick() {
    this.tabCounter++;

    this.tabsArrayExample2.push({
      tabHeading: 'Tab ' + this.tabCounter,
      tabContent: 'Content ' + this.tabCounter,
      tabIsCloseable: true
    });
  }

  public openTabClick() {
    alert('You selected the open tab button');
  }

  public tabChanged(newIndex: any) {
    console.log('New active tab index: ', newIndex);
  }
}
