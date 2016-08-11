import { NgModule } from '@angular/core';

import { SkyResourcesPipe } from './resources.pipe';

@NgModule({
  declarations: [SkyResourcesPipe],
  exports: [SkyResourcesPipe]
})
export class SkyResourcesModule { }
