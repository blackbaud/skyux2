import { NgModule } from '@angular/core';

import { SkyResourcesPipe } from './resources.pipe';
import { SkyResourcesService } from './resources.service';

@NgModule({
  declarations: [SkyResourcesPipe],
  providers: [SkyResourcesService],
  exports: [SkyResourcesPipe]
})
export class SkyResourcesModule { }
