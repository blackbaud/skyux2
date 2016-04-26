import {Component, EventEmitter, Input, Output} from 'angular2/core';
import {SkyResourcesPipe} from '../resources';

@Component({
  selector: 'sky-alert',
  pipes: [SkyResourcesPipe],
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

  @Output()
  closedChange = new EventEmitter<boolean>();

  close() {
    this.closed = true;
    this.closedChange.emit(true);
  }

  getCls() {
    let cls = 'sky-alert-' + this.alertType;

    if (this.closeable) {
      cls += ' sky-alert-closeable';
    }

    return cls;
  }
}
