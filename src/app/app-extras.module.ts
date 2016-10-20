import { NgModule } from '@angular/core';

import { SkyTilesDemoTile1Component } from './components/tiles/tiles-demo-tile1.component';
import { SkyTilesDemoTile2Component } from './components/tiles/tiles-demo-tile2.component';

require('style-loader!prismjs/themes/prism.css');
require('style-loader!./styles.scss');

@NgModule({
  entryComponents: [
    SkyTilesDemoTile1Component,
    SkyTilesDemoTile2Component
  ]
})
export class AppExtrasModule { }
