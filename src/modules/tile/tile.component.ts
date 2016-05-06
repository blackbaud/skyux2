import {Component, EventEmitter, Optional, Output} from 'angular2/core';
import {ChevronComponent} from '../chevron/chevron.component';
import {ResourcesPipe} from '../resources/resources.pipe';
import {TileDashboardColumnComponent} from './tile-dashboard-column.component';

@Component({
  selector: 'sky-tile',
  styles: [require('./tile.component.scss')],
  template: require('./tile.component.html'),
  directives: [ChevronComponent],
  pipes: [ResourcesPipe]
})
export class TileComponent {
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

  constructor(@Optional() columnComponent: TileDashboardColumnComponent) {
    this.isInDashboardColumn = !!columnComponent;
  }

  public titleClick() {
    this.isCollapsed = !this.isCollapsed;
  }

  public chevronDirectionChange(direction: string) {
    this.isCollapsed = direction === 'down';
  }
}
