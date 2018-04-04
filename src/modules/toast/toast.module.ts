import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyToastService } from './toast.service';
import { SkyToastComponent } from './toast.component';
import { SkyResourcesModule } from '../resources';

export { SkyToastService }

@NgModule({
  declarations: [
      SkyToastComponent
  ],
  imports: [
    CommonModule, SkyResourcesModule
  ],
  exports: [
      SkyToastComponent
  ],
  providers: [
    SkyToastService
  ],
  entryComponents: [
  ]
})
export class SkyToastModule {
}
