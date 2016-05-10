import {Component, ElementRef, EventEmitter, Optional, Output} from 'angular2/core';
import {SkyChevronComponent} from '../chevron/chevron.component';
import {SkyResourcesPipe} from '../resources/resources.pipe';
import {SkyTileDashboardService} from './tile-dashboard.service';

@Component({
  selector: 'sky-tile',
  styles: [require('./tile.component.scss')],
  template: require('./tile.component.html'),
  directives: [SkyChevronComponent],
  pipes: [SkyResourcesPipe]
})
export class SkyTileComponent {
  public tileId: string;

  public isInDashboardColumn = false;

  @Output()
  public settingsClick = new EventEmitter();

  @Output()
  public collapsedStateChange = new EventEmitter<boolean>();

  private get isCollapsed(): boolean {
    if (this.dashboardService) {
      return this.dashboardService.tileIsCollapsed(this);
    } else {
      return this._isCollapsed;
    }
  }

  private set isCollapsed(value: boolean) {
    if (this.dashboardService) {
      this.dashboardService.setTileCollapsed(this, value);
    } else {
      this._isCollapsed = value;
    }
  }

  private _isCollapsed = false;

  public settingsButtonClicked() {
    this.settingsClick.emit(undefined);
  }

  public get hasSettings(): boolean {
    return this.settingsClick.observers.length > 0;
  }

  constructor(
    @Optional() private dashboardService: SkyTileDashboardService,
    public elementRef: ElementRef
  ) {
    this.isInDashboardColumn = !!dashboardService;
  }

  public titleClick() {
    this.isCollapsed = !this.isCollapsed;
  }

  public chevronDirectionChange(direction: string) {
    this.isCollapsed = direction === 'down';
  }
}
