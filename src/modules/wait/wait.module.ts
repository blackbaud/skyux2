import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyWaitComponent } from './wait.component';
import { SkyWaitService } from './wait.service';
import { SkyWaitPageAdapterService } from './wait-page-adapter.service';
import { SkyWaitPageComponent } from './wait-page.component';
import { SkyResourcesService } from '../resources';

@NgModule({
  declarations: [
    SkyWaitComponent,
    SkyWaitPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkyWaitComponent,
    SkyWaitPageComponent
  ],
  providers: [
    SkyWaitService,
    SkyWaitPageAdapterService,
    SkyResourcesService
  ],
  entryComponents: [
    SkyWaitPageComponent
  ]
})
export class SkyWaitModule {
}
