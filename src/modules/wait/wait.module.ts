import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyWaitComponent } from './wait.component';
import { SkyWaitService } from './wait.service';
import { SkyWaitPageComponent } from './wait-page.component';

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
    SkyWaitService
  ],
  entryComponents: [
    SkyWaitPageComponent
  ]
})
export class SkyWaitModule {
}
