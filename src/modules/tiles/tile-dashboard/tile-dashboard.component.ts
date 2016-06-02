import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

import {
  SkyTileDashboardColumnComponent
} from '../tile-dashboard-column/tile-dashboard-column.component';
import { SkyTileDashboardConfig } from '../tile-dashboard-config';
import { SkyTileDashboardService } from './tile-dashboard.service';

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
  set config(value: SkyTileDashboardConfig) {
    if (value && !this.configSet) {
      this.dashboardConfigForBinding = value;
      this.dashboardService.setConfig(value);
      this.configSet = true;
    }
  }
  constructor(
    private dashboardService: SkyTileDashboardService
  ) {
    dashboardService.configChange.subscribe((config: SkyTileDashboardConfig) => {
      this.configChange.emit(config);
    });
  }
}
