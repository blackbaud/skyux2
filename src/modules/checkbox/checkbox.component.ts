import {Component, EventEmitter, Input, Output} from 'angular2/core';

declare var require: any;

@Component({
  selector: 'sky-checkbox',
  styles: [require('./checkbox.component.scss')],
  template: require('./checkbox.component.html')
})
export class SkyCheckboxComponent {
  @Input()
  selected = false;

  @Output()
  selectedChange = new EventEmitter<boolean>();

  updateSelected($event: boolean) {
    this.selected = $event;
    this.selectedChange.emit($event);
  }
}
