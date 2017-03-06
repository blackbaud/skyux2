import { NgModule } from '@angular/core';
import { SkyResourcesModule } from '../resources';
import { SkyTextExpandComponent } from './text-expand.component';

@NgModule({
  declarations: [
    SkyTextExpandComponent
  ],
  imports: [
    SkyResourcesModule
  ],
  exports: [
    SkyTextExpandComponent
  ]
})
export class SkyTextExpandModule { }
