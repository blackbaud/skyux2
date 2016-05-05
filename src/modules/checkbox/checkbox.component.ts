import {Component, EventEmitter, Input, Output} from 'angular2/core';

@Component({
  selector: 'sky-checkbox',
  styles: [require('./checkbox.component.scss')],
  template: require('./checkbox.component.html')
})
export class CheckboxComponent {
  @Input()
  public selected = false;

  @Output()
  public selectedChange = new EventEmitter<boolean>();

  public updateSelected($event: boolean) {
    this.selected = $event;
    this.selectedChange.emit($event);
  }
}
