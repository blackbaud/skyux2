import {Component, Input} from 'angular2/core';

declare var require: any;

@Component({
  selector: 'sky-alert',
  template: require('./alert.component.html')
})
export class SkyAlertComponent {
  @Input()
  alertType: string;

  @Input()
  closeable: boolean;

  @Input()
  closed: boolean;

  close() {
    this.closed = true;
  }

  getCls() {
    return 'alert-' + this.alertType;
  };
}
