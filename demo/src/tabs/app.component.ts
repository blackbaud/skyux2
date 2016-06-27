import { Component } from '@angular/core';

import { SkyTabComponent, SkyTabsetComponent } from '../../../src/core';
import { Bootstrapper } from '../../bootstrapper';

@Component({
  selector: 'sky-demo-app',
  template: require('./app.component.html'),
  directives: [SkyTabComponent, SkyTabsetComponent]
})
export class AppComponent {
  public tabs: any[];

  constructor() {
    this.tabs = [
      {
        heading: 'Tab 1',
        content: 'Content 1'
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
  }

  public closeClick(tabIndex: number) {
    this.tabs.splice(tabIndex, 1);
  }
}

Bootstrapper.bootstrap(AppComponent);
