import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';

import { SkyTileDashboardColumnComponent } from '../tile-dashboard-column';
import { SkyTileDashboardConfig } from '../tile-dashboard-config';
import { SkyTileDashboardService } from './tile-dashboard.service';

@Component({
  selector: 'sky-tile-dashboard',
  styles: [require('./tile-dashboard.component.scss')],
  template: require('./tile-dashboard.component.html')
})
export class SkyTileDashboardComponent implements AfterViewInit, OnDestroy {
  @Input()
  public set config(value: SkyTileDashboardConfig) {
    if (value && !this.configSet) {
      this._config = value;
      this.dashboardService.init(value);
      this.configSet = true;
    }
  }

  public get config(): SkyTileDashboardConfig {
    return this._config;
  }

  @Output()
  public configChange = new EventEmitter<SkyTileDashboardConfig>();

  private _config: SkyTileDashboardConfig;

  private configSet = false;

  @ViewChildren(SkyTileDashboardColumnComponent)
  private columns: QueryList<SkyTileDashboardColumnComponent>;

  @ViewChild('singleColumn', {read: SkyTileDashboardColumnComponent})
  private singleColumn: SkyTileDashboardColumnComponent;

  constructor(
    private dashboardService: SkyTileDashboardService
  ) {
    dashboardService.configChange.subscribe((config: SkyTileDashboardConfig) => {
      this.configChange.emit(config);
    });
  }

  public ngAfterViewInit() {
    this.dashboardService.setColumns(this.columns, this.singleColumn);
  }

  public ngOnDestroy() {
    this.dashboardService.destroy();
  }
}
