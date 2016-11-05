import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SkyModule, SkyTileDashboardConfig } from '../../../src/core';

import { Bootstrapper } from '../../bootstrapper';
import { Tile1Component } from './tile1.component';
import { Tile2Component } from './tile2.component';

@Component({
  selector: 'sky-demo-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
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

@NgModule({
  imports: [
    BrowserModule,
    SkyModule
  ],
  declarations: [
    AppComponent,
    Tile1Component,
    Tile2Component
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    Tile1Component,
    Tile2Component
  ]
})
class AppModule { }

Bootstrapper.bootstrapModule(AppModule);
