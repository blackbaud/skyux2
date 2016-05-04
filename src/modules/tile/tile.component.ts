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
  public isCollapsed = false;

  public tileId: string;

  public isInDashboardColumn = false;

  constructor(@Optional() columnComponent: SkyTileDashboardColumnComponent) {
    this.isInDashboardColumn = !!columnComponent;
  }

  public titleClick() {
    this.isCollapsed = !this.isCollapsed;
  }

  public chevronDirectionChange(direction: string) {
    this.isCollapsed = direction === 'down';
  }
}
