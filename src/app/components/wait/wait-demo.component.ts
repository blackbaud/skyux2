import { Component } from '@angular/core';

import {
  SkyWaitService
} from '../../../core';

@Component({
  selector: 'sky-wait-demo',
  templateUrl: './wait-demo.component.html'
})
export class SkyWaitDemoComponent {
  constructor(private waitSvc: SkyWaitService) { }

  public isWaiting = false;

  public showPageWait(isBlocking: boolean) {
    this.waitSvc.beginPageWait(isBlocking);
    setTimeout(()=> {
      this.waitSvc.endPageWait(isBlocking);
    }, 2000);
  }
}
