import {Component, EventEmitter, Input, Output} from 'angular2/core';
import {SkyResourcesPipe} from '../resources';

@Component({
  selector: 'sky-chevron',
  styles: [require('./chevron.component.scss')],
  template: require('./chevron.component.html'),
  pipes: [SkyResourcesPipe]
})
export class SkyChevronComponent {
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
