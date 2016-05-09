import {Component} from 'angular2/core';
import {
  SkyTileDashboardComponent,
  SkyTileDashboardConfig
} from '../../../src/modules/tile';
import {Bootstrapper} from '../../bootstrapper';
import {Tile1Component} from './tile1.component.ts';
import {Tile2Component} from './tile2.component.ts';

@Component({
  selector: 'my-app',
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
