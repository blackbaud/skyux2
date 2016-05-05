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

  private configSet = false;

  @Input()
  set config(config: SkyTileDashboardConfig) {
    if (config && !this.configSet) {
      this.dashboardConfigForBinding = config;
      this.dashboardService.setConfig(config);
      this.configSet = true;
    }
  }
  constructor(
    private dashboardService: SkyTileDashboardService,
    dragulaService: DragulaService
  ) {
    dashboardService.configChange.subscribe((config: SkyTileDashboardConfig) => {
      this.configChange.emit(config);
    });

    dashboardService.setDragulaService(dragulaService);
  }
}
