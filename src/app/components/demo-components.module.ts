import { NgModule } from '@angular/core';

import { SkyDemoComponentsService } from './demo-components.service';

require('style-loader!prismjs/themes/prism.css');

@NgModule({
  providers: [
    SkyDemoComponentsService
  ]
})
export class SkyDemoComponentsModule { }
