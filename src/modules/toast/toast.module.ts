import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyToastService } from './toast.service';
import { SkyToastContainerComponent } from './toast-container.component';
import { SkyResourcesModule } from '../resources';
import { SkyToastAdapterService } from './toast-adapter.service';
import { SkyToastComponent, SkyCustomToastDirective } from './toast-messages';
export { SkyToastMessage, SkyToastCustomComponent } from './types';

export { SkyToastService };

@NgModule({
  declarations: [
    SkyToastContainerComponent,
    SkyToastComponent,
    SkyCustomToastDirective
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
