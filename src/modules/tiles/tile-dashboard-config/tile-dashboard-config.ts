import { SkyTileDashboardConfigLayout } from './tile-dashboard-config-layout';
import { SkyTileDashboardConfigTile } from './tile-dashboard-config-tile';

export interface SkyTileDashboardConfig {
  tiles: SkyTileDashboardConfigTile[];
  layout: SkyTileDashboardConfigLayout;
}
