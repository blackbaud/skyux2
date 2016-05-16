import { Component, EventEmitter, Input, Output } from '@angular/core';

import { SkyCheckboxComponent } from '../checkbox/checkbox.component';

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
    if (this.selectable) {
      this.selected = !this.selected;
      this.selectedChange.emit(this.selected);
    }
  };
}
