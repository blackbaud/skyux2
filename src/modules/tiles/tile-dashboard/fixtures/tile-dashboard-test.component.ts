import { Component } from '@angular/core';

import {
  SkyTileDashboardComponent,
  SkyTileDashboardConfig
} from '../../../tiles';
import { Test1Component } from './tile1-test.component.ts';
import { Test2Component } from './tile2-test.component.ts';

@Component({
  selector: 'sky-demo-app',
  template: `
    <sky-tile-dashboard [(config)]="dashboardConfig"></sky-tile-dashboard>
  `,
  directives: [
    SkyTileDashboardComponent
  ]
})
export class TileDashboardTestComponent {
  public dashboardConfig: SkyTileDashboardConfig;

  constructor() {
    this.dashboardConfig = {
      tiles: [
        {
          id: 'tile1',
          componentType: Test1Component
        },
        {
          id: 'tile2',
          componentType: Test2Component
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
