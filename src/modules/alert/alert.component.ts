import {Component, EventEmitter, Input, Output} from 'angular2/core';
import {ResourcesPipe} from '../resources/resources.pipe';

@Component({
  selector: 'sky-alert',
  pipes: [ResourcesPipe],
  styles: [require('./alert.component.scss')],
  template: require('./alert.component.html')
})
export class AlertComponent {
  @Input()
  public alertType: string;

  @Input()
  public closeable: boolean;

  @Input()
  public closed: boolean;

  @Output()
  public closedChange = new EventEmitter<boolean>();

  public close() {
    this.closed = true;
    this.closedChange.emit(true);
  }

  public getCls() {
    let cls = 'sky-alert-' + this.alertType;

    if (this.closeable) {
      cls += ' sky-alert-closeable';
    }

    return cls;
  }
}
