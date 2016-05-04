import {Component, EventEmitter, Input, Output} from 'angular2/core';
import {DragulaService} from 'ng2-dragula/ng2-dragula';
import {SkyTileDashboardColumnComponent} from './tile-dashboard-column.component';
import {SkyTileDashboardConfig} from './tile-dashboard-config';
import {SkyTileDashboardService} from './tile-dashboard.service';

@Component({
  selector: 'sky-tile-dashboard',
  styles: [require('./tile-dashboard.component.scss')],
  template: require('./tile-dashboard.component.html'),
  directives: [SkyTileDashboardColumnComponent],
  providers: [DragulaService, SkyTileDashboardService]
})
export class SkyTileDashboardComponent  {
  public dashboardConfigForBinding: SkyTileDashboardConfig;

  @Output()
  public configChange = new EventEmitter<SkyTileDashboardConfig>();

  private _configSet = false;

  @Input()
  set config(config: SkyTileDashboardConfig) {
    if (config && !this._configSet) {
      this.dashboardConfigForBinding = config;
      this._dashboardService.setConfig(config);
      this._configSet = true;
    }
  }
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
