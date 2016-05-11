import {Component, Input} from 'angular2/core';

@Component({
  selector: 'sky-repeater',
  styles: [require('./repeater.component.scss')],
  template: require('./repeater.component.html')
})
export class SkyRepeaterComponent {
  private _expandMode = 'none';

  @Input()
  public set expandMode(value: string) {
    this._expandMode = value || 'none';
  }

  constructor() {

  }
}
