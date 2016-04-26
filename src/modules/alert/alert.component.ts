import {Component, Input} from 'angular2/core';

@Component({
  selector: 'sky-alert',
  styles: [require('./alert.component.scss')],
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
    let cls = 'sky-alert-' + this.alertType;

    if (this.closed) {
      cls += ' sky-alert-hidden';
    }

    if (this.closeable) {
      cls += ' sky-alert-closeable';
    }

    return cls;
  }
}
