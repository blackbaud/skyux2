import { Component } from '@angular/core';
import { SkyTileDashboardConfig } from '../../core';
import { SkyTileDemoTile1Component } from './tile-demo-tile1.component';
import { SkyTileDemoTile2Component } from './tile-demo-tile2.component';

@Component({
  selector: 'sky-tile-demo',
  templateUrl: './tile-demo.component.html'
})
export class SkyTileDemoComponent {
  public dashboardConfig: SkyTileDashboardConfig;

  constructor() {
    this.dashboardConfig = {
      tiles: [
        {
          id: 'tile1',
          componentType: SkyTileDemoTile1Component
        },
        {
          id: 'tile2',
          componentType: SkyTileDemoTile2Component
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
