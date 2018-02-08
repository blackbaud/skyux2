import { NgModule } from '@angular/core';

import { SkyDemoModule } from '../demo';

require('style-loader!./styles.scss');

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
