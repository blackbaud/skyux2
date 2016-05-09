import {Type} from 'angular2/core';

export interface SkyTileDashboardConfigTile {
  id: string;

  component: Type;

  isCollapsed?: boolean;
}
