import { SkyFlyoutComponent } from './../../modules/flyout/flyout.component';
import { Component } from '@angular/core';

import { SkyFlyoutService } from '../../modules/flyout/flyout.service';

@Component({
  selector: 'sky-flyout-demo',
  templateUrl: './flyout-demo.component.html'
})
export class SkyFlyoutDemoComponent {

  constructor(public skyFlyoutService: SkyFlyoutService) { }

  public toggleState() {
    this.skyFlyoutService.open(SkyFlyoutComponent, []);
  }

}
