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
  public dashboardConfigForBinding: SkyTileDashboardConfig;

  @Output()
  public configChange = new EventEmitter<SkyTileDashboardConfig>();

  private configSet = false;

  @Input()
  set config(value: SkyTileDashboardConfig) {
    if (value && !this.configSet) {
      this.dashboardConfigForBinding = value;
      this.dashboardService.init(value);
      this.configSet = true;
    }
  }

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
