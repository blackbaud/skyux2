import { NgModule } from '@angular/core';

import { StacheModule } from'@blackbaud/stache';

import { SkyDemoTitleService } from './shared/title.service';
import { SkyFilterDemoModalComponent } from './components/filter/filter-demo-modal.component';
import { SkyListFiltersModalDemoComponent }
  from './components/list-filters/list-filters-demo-modal.component';

import { SkyModalDemoFormComponent } from './components/modal/modal-demo-form.component';
import { SkyModalDemoTiledFormComponent } from './components/modal/modal-demo-tiled-form.component';
import { SkyTilesDemoTile1Component } from './components/tile/tiles-demo-tile1.component';
import { SkyTilesDemoTile2Component } from './components/tile/tiles-demo-tile2.component';
import { SkyWizardDemoFormComponent } from './components/wizard/wizard-demo-form.component';

import {
  SkySectionedModalFormDemoComponent
} from './components/sectioned-form/sectioned-modal-form-demo.component';

import { SkyDemoComponentsModule } from './components/demo-components.module';

require('style-loader!./styles.scss');

@NgModule({
  entryComponents: [
    SkyModalDemoFormComponent,
    SkyModalDemoTiledFormComponent,
    SkyTilesDemoTile1Component,
    SkyTilesDemoTile2Component,
    SkyWizardDemoFormComponent,
    SkyFilterDemoModalComponent,
    SkyListFiltersModalDemoComponent,
    SkySectionedModalFormDemoComponent
  ],
  imports: [
    SkyDemoComponentsModule,
    StacheModule
  ],
  exports: [
    StacheModule
  ],
  providers: [
    SkyDemoTitleService
  ]
})
export class AppExtrasModule { }
