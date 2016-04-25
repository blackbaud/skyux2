import {Component, EventEmitter, Input, Output} from 'angular2/core';
import {SkyCheckboxComponent} from '../checkbox/checkbox.component';

declare let require: any;

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
    let cls: string[] = [],
      vm = this;

    if (vm.size === 'small') {
      cls.push('bb-card-small');
    }

    if (vm.selectable) {
      cls.push('bb-card-selectable');

      if (vm.selected) {
        cls.push('bb-card-selected');
      }
    }

    return cls;
  };
}
