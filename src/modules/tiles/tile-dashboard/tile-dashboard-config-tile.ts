import { Type } from '@angular/core';

export interface SkyTileDashboardConfigTile {
  id: string;

  component: Type;

  isCollapsed?: boolean;
}
