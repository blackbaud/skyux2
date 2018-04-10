import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyToastService } from './toast.service';
import { SkyToastComponent } from './toast.component';
import { SkyResourcesModule } from '../resources';
import { SkyToastAdapterService } from './toast-adapter.service';

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
    SkyToastService,
    SkyToastAdapterService
  ],
  entryComponents: [
    SkyToastComponent
  ]
})
export class SkyToastModule {
}
