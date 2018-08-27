import { NgModule } from '@angular/core';

import { SkyDemoModule } from '../demo';

require('style-loader!@skyux/theme/css/sky.css');

@NgModule({
  entryComponents: [],
  imports: [
    SkyDemoModule
  ],
  exports: [
    SkyDemoModule
  ],
  providers: []
})
export class AppExtrasModule { }
