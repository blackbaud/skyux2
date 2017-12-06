import { Component } from '@angular/core';
import { SkyTileDashboardConfig } from '@blackbaud/skyux/dist/core';
import { SkyTilesDemoTile1Component } from './tiles-demo-tile1.component';
import { SkyTilesDemoTile2Component } from './tiles-demo-tile2.component';

@Component({
  selector: 'sky-tiles-demo',
  templateUrl: './tiles-demo.component.html'
})
export class SkyTilesDemoComponent {
  public dashboardConfig: SkyTileDashboardConfig;

  constructor() {
    this.dashboardConfig = {
      tiles: [
        {
          id: 'tile1',
          componentType: SkyTilesDemoTile1Component
        },
        {
          id: 'tile2',
          componentType: SkyTilesDemoTile2Component
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
