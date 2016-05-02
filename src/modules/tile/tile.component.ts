import {Component} from 'angular2/core';
import {SkyChevronComponent} from '../chevron';
import {SkyResourcesPipe} from '../resources';

@Component({
  selector: 'sky-tile',
  styles: [require('./tile.component.scss')],
  template: require('./tile.component.html'),
  directives: [SkyChevronComponent],
  pipes: [SkyResourcesPipe]
})
export class SkyTileComponent {
  isCollapsed = false;

  titleClick() {
    this.isCollapsed = !this.isCollapsed;
  }

  chevronDirectionChange(direction: string) {
    this.isCollapsed = direction === 'down';
  }
}
