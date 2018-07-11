import {
  Component,
  ViewChild
} from '@angular/core';

import {
  SkyTileDashboardComponent,
  SkyTileDashboardConfig
} from '../..';
import {
  Tile1TestComponent,
  Tile2TestComponent,
  TileTestContext
} from '.';

@Component({
  selector: 'sky-demo-app',
  templateUrl: './tile-dashboard.component.fixture.html'
})
export class TileDashboardTestComponent {
  @ViewChild(SkyTileDashboardComponent)
  public dashboardComponent: SkyTileDashboardComponent;

  public dashboardConfig: SkyTileDashboardConfig;

  constructor() {
    this.dashboardConfig = {
      tiles: [
        {
          id: 'sky-test-tile-1',
          componentType: Tile1TestComponent
        },
        {
          id: 'sky-test-tile-2',
          componentType: Tile2TestComponent,
          providers: [
            {
              provide: TileTestContext,
              useValue: {
                id: 3
              }
            }
          ]
        },
        {
          id: 'sky-test-tile-3',
          componentType: Tile2TestComponent,
          providers: [
            {
              provide: TileTestContext,
              useValue: {
                id: 3
              }
            }
          ]
        },
        {
          id: 'sky-test-tile-4',
          componentType: Tile2TestComponent,
          providers: [
            {
              provide: TileTestContext,
              useValue: {
                id: 3
              }
            }
          ]
        }
      ],
      layout: {
        singleColumn: {
          tiles: [
            {
              id: 'sky-test-tile-2',
              isCollapsed: false
            },
            {
              id: 'sky-test-tile-1',
              isCollapsed: true
            },
            {
              id: 'sky-test-tile-3',
              isCollapsed: false
            },
            {
              id: 'sky-test-tile-4',
              isCollapsed: false
            }
          ]
        },
        multiColumn: [
          {
            tiles: [
              {
                id: 'sky-test-tile-1',
                isCollapsed: true
              },
              {
                id: 'sky-test-tile-3',
                isCollapsed: false
              },
              {
                id: 'sky-test-tile-4',
                isCollapsed: false
              }
            ]
          },
          {
            tiles: [
              {
                id: 'sky-test-tile-2',
                isCollapsed: false
              }
            ]
          }
        ]
      }
    };
  }
}
