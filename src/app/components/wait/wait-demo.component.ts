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

  public showPageWait() {
    this.waitSvc.beginPageWait();
    setTimeout(()=> {
      this.waitSvc.endPageWait();
    }, 2000);
  }
}
