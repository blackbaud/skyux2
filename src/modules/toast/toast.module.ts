import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyToastService } from './toast.service';
import { SkyToastContainerComponent } from './toast-container.component';
import { SkyResourcesModule } from '../resources';
import { SkyToastAdapterService } from './toast-adapter.service';
import { SkyToastComponent } from './toast-messages/toast.component';

export { SkyToastService }

@NgModule({
  declarations: [
      SkyToastContainerComponent,
      SkyToastComponent
  ],
  imports: [
    CommonModule, SkyResourcesModule
  ],
  exports: [
      SkyToastContainerComponent,
      SkyToastComponent
  ],
  providers: [
    SkyToastService,
    SkyToastAdapterService
  ],
  entryComponents: [
    SkyToastContainerComponent,
    SkyToastComponent
  ]
})
export class SkyToastModule {
}
