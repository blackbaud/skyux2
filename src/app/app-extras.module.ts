import { NgModule } from '@angular/core';

import { StacheModule } from'@blackbaud/stache';

import { SkyDemoTitleService } from './shared/title.service';
import { SkyDemoComponentsModule } from './components/demo-components.module';

require('style-loader!./styles.scss');

@NgModule({
  entryComponents: [],
  imports: [
    SkyDemoComponentsModule,
    StacheModule
  ],
  exports: [
    SkyDemoComponentsModule,
    StacheModule
  ],
  providers: [
    SkyDemoTitleService
  ]
})
export class AppExtrasModule { }
