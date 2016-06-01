import { Component } from '@angular/core';

import {
  SkyTileDashboardComponent,
  SkyTileDashboardConfig
} from '../../../src/modules/tiles';
import { Bootstrapper } from '../../bootstrapper';
import { Tile1Component } from './tile1.component.ts';
import { Tile2Component } from './tile2.component.ts';

@Component({
  selector: 'sky-demo-app',
  template: require('./app.component.html'),
  directives: [
    SkyTileDashboardComponent
  ]
})
export class AppComponent {
  public dashboardConfig: SkyTileDashboardConfig;

  public stringify(obj: any) {
    return JSON.stringify(obj);
  }

  constructor() {
    this.dashboardConfig = {
      columns: [
        {
          tiles: [
            {
              id: 'tile1',
              component: Tile1Component,
              isCollapsed: true
            }
          ]
        },
        {
          tiles: [
            {
              id: 'tile2',
              component: Tile2Component
            }
          ]
        }
      ]
    };
  }
}

Bootstrapper.bootstrap(AppComponent);
