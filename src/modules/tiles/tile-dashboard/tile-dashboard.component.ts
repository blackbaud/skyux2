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
  styleUrls: ['./tile-dashboard.component.scss'],
  templateUrl: './tile-dashboard.component.html',
  providers: [SkyTileDashboardService]
})
export class SkyTileDashboardComponent implements AfterViewInit, OnDestroy {
  @Input()
  public set config(value: SkyTileDashboardConfig) {
    if (value && !this.configSet) {
      this._config = value;
      this.configSet = true;
      this.checkReady();
    }
  }

  public get config(): SkyTileDashboardConfig {
    return this._config;
  }

  @Output()
  public configChange = new EventEmitter<SkyTileDashboardConfig>();

  @ViewChildren(SkyTileDashboardColumnComponent)
  public columns: QueryList<SkyTileDashboardColumnComponent>;

  @ViewChild('singleColumn', {read: SkyTileDashboardColumnComponent})
  public singleColumn: SkyTileDashboardColumnComponent;

  private _config: SkyTileDashboardConfig;

  private configSet = false;

  private viewReady = false;

  constructor(
    // HACK: This is public so it can be accessed via a unit test due to breaking changes
    // in RC5. https://github.com/angular/angular/issues/10854
    public dashboardService: SkyTileDashboardService
  ) {
    dashboardService.configChange.subscribe((config: SkyTileDashboardConfig) => {
      this.configChange.emit(config);
    });
  }

  public ngAfterViewInit() {
    this.viewReady = true;
    this.checkReady();
  }

  public ngOnDestroy() {
    this.dashboardService.destroy();
  }

  private checkReady() {
    if (this.viewReady && this.config) {
      setTimeout(() => {
        this.dashboardService.init(this.config, this.columns, this.singleColumn);
      }, 0);
    }
  }
}
