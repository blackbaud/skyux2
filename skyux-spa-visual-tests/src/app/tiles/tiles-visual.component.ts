import { Component } from '@angular/core';

import { SkyTileDashboardConfig } from '@blackbaud/skyux/dist/core';

import { Tile1Component } from './tile1.component';
import { Tile2Component } from './tile2.component';

@Component({
  selector: 'tiles-visual',
  templateUrl: './tiles-visual.component.html'
})
export class TilesVisualComponent {
  public dashboardConfig: SkyTileDashboardConfig;

  public stringify(obj: any) {
    return JSON.stringify(obj);
  }

  constructor() {
    this.dashboardConfig = {
      tiles: [
        {
          id: 'tile1',
          componentType: Tile1Component
        },
        {
          id: 'tile2',
          componentType: Tile2Component
        }
      ],
      layout: {
        singleColumn: {
          tiles: [
            {
              id: 'tile2',
              isCollapsed: false
            },
            {
              id: 'tile1',
              isCollapsed: true
            }
          ]
        },
        multiColumn: [
          {
            tiles: [
              {
                id: 'tile1',
                isCollapsed: true
              }
            ]
          },
          {
            tiles: [
              {
                id: 'tile2',
                isCollapsed: false
              }
            ]
          }
        ]
      }
    };
  }
}
