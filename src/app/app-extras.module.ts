import { NgModule } from '@angular/core';

import { SkyTilesDemoTile1Component } from './components/tiles/tiles-demo-tile1.component';
import { SkyTilesDemoTile2Component } from './components/tiles/tiles-demo-tile2.component';

import { SkyDemoComponentsModule } from './components/demo-components.module';

require('style!./styles.scss');

@NgModule({
  entryComponents: [
    SkyTilesDemoTile1Component,
    SkyTilesDemoTile2Component
  ],
  imports: [
    SkyDemoComponentsModule
  ]
})
export class AppExtrasModule { }
