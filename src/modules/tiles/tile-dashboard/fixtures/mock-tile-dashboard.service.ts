import { EventEmitter } from '@angular/core';

import { SkyTileDashboardConfig, SkyTileDashboardConfigTile } from '../../tile-dashboard-config';
import { Test1Component } from './tile1-test.component';
import { Test2Component } from './tile2-test.component';

export class MockTileDashboardService {
  public bagId = 'id-1';

  public ready = new EventEmitter<SkyTileDashboardConfig>();

  public config: SkyTileDashboardConfig;

  public configChange = new EventEmitter<SkyTileDashboardConfig>();

  public init(config: SkyTileDashboardConfig) {
    this.config = config;
  }

  public getTileComponentType(tile: SkyTileDashboardConfigTile) {
    switch (tile.id) {
    case 'tile-1':
      return Test1Component;
    case 'tile-2':
      return Test2Component;
    default:
      return undefined;
    }
  }

  public addTileComponent() { }

  public tileIsCollapsed() { }

  public setColumns() { }

  public destroy() { }
}
