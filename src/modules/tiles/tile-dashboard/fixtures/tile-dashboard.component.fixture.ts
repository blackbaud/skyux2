import { Component, ViewChild } from '@angular/core';

import { SkyTileDashboardComponent, SkyTileDashboardConfig } from '../../../tiles';
import { Tile1TestComponent } from './tile1.component.fixture';
import { Tile2TestComponent } from './tile2.component.fixture';

@Component({
  selector: 'sky-demo-app',
  template: require('./tile-dashboard.component.fixture.html')
})
export class TileDashboardTestComponent {
  @ViewChild(SkyTileDashboardComponent)
  public dashboardComponent: SkyTileDashboardComponent;

  public dashboardConfig: SkyTileDashboardConfig;

  constructor() {
    this.dashboardConfig = {
      tiles: [
        {
          id: 'tile1',
          componentType: Tile1TestComponent
        },
        {
          id: 'tile2',
          componentType: Tile2TestComponent
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
