import {Component, EventEmitter, Input, Output} from 'angular2/core';
import {SkyCheckboxComponent} from '../checkbox/checkbox.component';

@Component({
  selector: 'sky-card',
  template: require('./card.component.html'),
  directives: [SkyCheckboxComponent]
})
export class SkyCardComponent {
  @Input()
  size: string;

  @Input()
  selectable: boolean;

  @Input()
  selected: boolean;

  @Output()
  selectedChange = new EventEmitter<boolean>();

  contentClick() {
    let vm = this;

    if (vm.selectable) {
      vm.selected = !vm.selected;
      vm.selectedChange.emit(vm.selected);
    }
  };

  getCls() {
    var vm = this;

    return {
      'bb-card-small': vm.size === 'small',
      'bb-card-selectable': vm.selectable,
      'bb-card-selected': vm.selectable && vm.selected
    };
  };
}
