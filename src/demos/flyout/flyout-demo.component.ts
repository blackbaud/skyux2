import { SkyFlyoutComponent } from './../../modules/flyout/flyout.component';
import { Component, ViewChild } from '@angular/core';

import {
  SkyModalCloseArgs
} from '../../core';


@Component({
  selector: 'sky-flyout-demo',
  templateUrl: './flyout-demo.component.html'
})
export class SkyFlyoutDemoComponent {
  @ViewChild(SkyFlyoutComponent) flyout: SkyFlyoutComponent;
  private state: string = 'in';

  constructor() { }

  public toggleState() {
    if (this.state === 'in') {
      this.state = 'out';
    } else if (this.state === 'out') {
      this.state = 'in';
    }
    this.flyout.toggleState(this.state);
  }

}
