import { Component } from '@angular/core';

import {
  SkyWaitService
} from '../../../core';

@Component({
  selector: 'sky-wait-demo',
  templateUrl: './wait-demo.component.html'
})
export class SkyWaitDemoComponent {

  public isWaiting = false;

  public showPageWait(isBlocking: boolean) {
    if (isBlocking) {
      this.waitSvc.beginBlockingPageWait();
      setTimeout(() => {
        this.waitSvc.endBlockingPageWait();
      }, 2000);
    } else {
      this.waitSvc.beginNonBlockingPageWait();
      setTimeout(() => {
        this.waitSvc.endNonBlockingPageWait();
      }, 2000);
    }
  }

  constructor(private waitSvc: SkyWaitService) { }
}
