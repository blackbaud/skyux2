import {Component, EventEmitter, Input, Output} from 'angular2/core';
import {SkyCheckboxComponent} from '../checkbox/checkbox.component';

@Component({
  selector: 'sky-card',
  styles: [require('./card.component.scss')],
  template: require('./card.component.html'),
  directives: [SkyCheckboxComponent]
})
export class SkyCardComponent {
  @Input()
  public size: string;

  @Input()
  public selectable: boolean;

  @Input()
  public selected: boolean;

  @Output()
  public selectedChange = new EventEmitter<boolean>();

  public contentClick() {
    let vm = this;

    if (vm.selectable) {
      vm.selected = !vm.selected;
      vm.selectedChange.emit(vm.selected);
    }
  };
}
