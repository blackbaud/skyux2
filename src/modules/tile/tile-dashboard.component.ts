import {Component, EventEmitter, Input, Output} from 'angular2/core';
import {DragulaService} from 'ng2-dragula/ng2-dragula';
import {SkyTileComponent} from './tile.component';
import {SkyTileDashboardColumnComponent} from './tile-dashboard-column.component';
import {SkyTileDashboardConfig} from './tile-dashboard-config';
import {SkyTileDashboardConfigColumn} from './tile-dashboard-config-column';
import {SkyTileDashboardConfigTile} from './tile-dashboard-config-tile';
import {SkyTileDashboardService} from './tile-dashboard.service';

@Component({
  selector: 'sky-tile-dashboard',
  styles: [require('./tile-dashboard.component.scss')],
  template: require('./tile-dashboard.component.html'),
  directives: [SkyTileDashboardColumnComponent],
  providers: [DragulaService, SkyTileDashboardService]
})
export class SkyTileDashboardComponent  {
  dashboardConfigForBinding: SkyTileDashboardConfig;

  private _configSet = false;

  @Input()
  set config(config: SkyTileDashboardConfig) {
    if (config && !this._configSet) {
      this.dashboardConfigForBinding = config;
      this._dashboardService.setConfig(config);
      this._configSet = true;
    }
  }

  @Output()
  configChange = new EventEmitter<SkyTileDashboardConfig>();

  constructor(
    private _dashboardService: SkyTileDashboardService,
    dragulaService: DragulaService
  ) {
    _dashboardService.configChange.subscribe((config: SkyTileDashboardConfig) => {
      this.configChange.emit(config);
    });

    _dashboardService.setDragulaService(dragulaService);
  }
}
