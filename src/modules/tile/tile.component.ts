import {Component, EventEmitter, Optional, Output} from 'angular2/core';
import {SkyChevronComponent} from '../chevron/chevron.component';
import {SkyResourcesPipe} from '../resources/resources.pipe';
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

  @Output()
  public settingsClick = new EventEmitter();

  public settingsButtonClicked() {
    this.settingsClick.emit(undefined);
  }

  public get hasSettings(): boolean {
    return this.settingsClick.observers.length > 0;
  }

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
