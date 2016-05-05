import {Component, EventEmitter, Input, Output} from 'angular2/core';
import {ResourcesPipe} from '../resources/resources.pipe';

@Component({
  selector: 'sky-chevron',
  styles: [require('./chevron.component.scss')],
  template: require('./chevron.component.html'),
  pipes: [ResourcesPipe]
})
export class ChevronComponent {
  @Output()
  public directionChange = new EventEmitter<string>();

  @Input()
  public direction = 'up';

  public chevronClick($event: MouseEvent) {
    $event.stopPropagation();
    this.direction = this.direction === 'up' ? 'down' : 'up';
    this.directionChange.emit(this.direction);
  }
}
