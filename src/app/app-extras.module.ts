import { NgModule } from '@angular/core';

import { SkyDemoTitleService } from './shared/title.service';
import { SkyModalDemoFormComponent } from './components/modal/modal-demo-form.component';
import { SkyTilesDemoTile1Component } from './components/tiles/tiles-demo-tile1.component';
import { SkyTilesDemoTile2Component } from './components/tiles/tiles-demo-tile2.component';

import { SkyDemoComponentsModule } from './components/demo-components.module';

require('style!./styles.scss');

@NgModule({
  entryComponents: [
    SkyModalDemoFormComponent,
    SkyTilesDemoTile1Component,
    SkyTilesDemoTile2Component
  ],
  imports: [
    SkyDemoComponentsModule
  ],
  providers: [
    SkyDemoTitleService
  ]
})
export class AppExtrasModule { }
