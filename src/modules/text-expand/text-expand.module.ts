import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyResourcesModule } from '../resources';
import { SkyTextExpandComponent } from './text-expand.component';
import { SkyModalModule } from '../modal';
import { SkyTextExpandModalComponent } from './text-expand-modal.component';

@NgModule({
  declarations: [
    SkyTextExpandComponent,
    SkyTextExpandModalComponent
  ],
  imports: [
    SkyResourcesModule,
    SkyModalModule,
    CommonModule
  ],
  exports: [
    SkyTextExpandComponent
  ],
  entryComponents: [
    SkyTextExpandModalComponent
  ]
})
export class SkyTextExpandModule { }
