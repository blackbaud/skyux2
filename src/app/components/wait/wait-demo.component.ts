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
    this.waitSvc.beginPageWait(isBlocking);
    setTimeout(() => {
      this.waitSvc.endPageWait(isBlocking);
    }, 2000);
  }

  constructor(private waitSvc: SkyWaitService) { }
}
