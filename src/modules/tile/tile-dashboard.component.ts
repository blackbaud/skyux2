import {Component, EventEmitter, Input, Output} from 'angular2/core';
import {DragulaService} from 'ng2-dragula/ng2-dragula';
import {TileDashboardColumnComponent} from './tile-dashboard-column.component';
import {TileDashboardConfig} from './tile-dashboard-config';
import {TileDashboardService} from './tile-dashboard.service';

@Component({
  selector: 'sky-tile-dashboard',
  styles: [require('./tile-dashboard.component.scss')],
  template: require('./tile-dashboard.component.html'),
  directives: [TileDashboardColumnComponent],
  providers: [DragulaService, TileDashboardService]
})
export class TileDashboardComponent  {
  public dashboardConfigForBinding: TileDashboardConfig;

  @Output()
  public configChange = new EventEmitter<TileDashboardConfig>();

  private configSet = false;

  @Input()
  set config(config: TileDashboardConfig) {
    if (config && !this.configSet) {
      this.dashboardConfigForBinding = config;
      this.dashboardService.setConfig(config);
      this.configSet = true;
    }
  }
  constructor(
    private dashboardService: TileDashboardService,
    dragulaService: DragulaService
  ) {
    dashboardService.configChange.subscribe((config: TileDashboardConfig) => {
      this.configChange.emit(config);
    });

    dashboardService.setDragulaService(dragulaService);
  }
}
