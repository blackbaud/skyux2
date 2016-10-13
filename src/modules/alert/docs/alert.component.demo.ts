import { Component } from '@angular/core';

@Component({
  selector: 'sky-alert-demo',
  template: require('./alert.component.demo.html'),
  styles: [require('../../../scss/docs.scss')]
})
export class SkyAlertDemoComponent {
  public closeable = true;

  public closed = false;

  public alertType = 'warning';

  public openAlert() {
    this.closed = false;
  }
}
