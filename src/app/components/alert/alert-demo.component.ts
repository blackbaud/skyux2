import { Component } from '@angular/core';

@Component({
  selector: 'sky-alert-demo',
  templateUrl: './alert-demo.component.html'
})
export class SkyAlertDemoComponent {
  public closeable = true;

  public closed = false;

  public alertType = 'warning';

  public openAlert() {
    this.closed = false;
  }
}
