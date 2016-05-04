import {Component, Optional} from 'angular2/core';
import {SkyChevronComponent} from '../chevron';
import {SkyResourcesPipe} from '../resources';
import {SkyTileDashboardColumnComponent} from './tile-dashboard-column.component';

@Component({
  selector: 'sky-tile',
  styles: [require('./tile.component.scss')],
  template: require('./tile.component.html'),
  directives: [SkyChevronComponent],
  pipes: [SkyResourcesPipe]
})
export class SkyTileComponent {
  isCollapsed = false;

  tileId: string;

  isInDashboardColumn = false;

  constructor(@Optional() columnComponent: SkyTileDashboardColumnComponent) {
    this.isInDashboardColumn = !!columnComponent;
  }

  titleClick() {
    this.isCollapsed = !this.isCollapsed;
  }

  chevronDirectionChange(direction: string) {
    this.isCollapsed = direction === 'down';
  }
}
