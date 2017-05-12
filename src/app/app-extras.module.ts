import { NgModule } from '@angular/core';

import { StacheModule, StacheConfigService } from'@blackbaud/stache';

import { SkyAppConfig } from '@blackbaud/skyux-builder/runtime';
import { SkyDemoTitleService } from './shared/title.service';
import { SkyFilterDemoModalComponent } from './components/filter/filter-demo-modal.component';
import { SkyListFiltersModalDemoComponent }
  from './components/list-filters/list-filters-demo-modal.component';

import { SkyModalDemoFormComponent } from './components/modal/modal-demo-form.component';
import { SkyTilesDemoTile1Component } from './components/tiles/tiles-demo-tile1.component';
import { SkyTilesDemoTile2Component } from './components/tiles/tiles-demo-tile2.component';
import { SkyWizardDemoFormComponent } from './components/wizard/wizard-demo-form.component';

import { SkyDemoComponentsModule } from './components/demo-components.module';

require('style-loader!./styles.scss');

@NgModule({
  entryComponents: [
    SkyModalDemoFormComponent,
    SkyTilesDemoTile1Component,
    SkyTilesDemoTile2Component,
    SkyWizardDemoFormComponent,
    SkyFilterDemoModalComponent,
    SkyListFiltersModalDemoComponent
  ],
  imports: [
    SkyDemoComponentsModule,
    StacheModule
  ],
  exports: [
    StacheModule
  ],
  providers: [
    SkyDemoTitleService,
    {
      provide: StacheConfigService,
      useExisting: SkyAppConfig
    }
  ]
})
export class AppExtrasModule { }
