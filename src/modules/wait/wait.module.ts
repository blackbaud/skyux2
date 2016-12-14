import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyWaitComponent } from './wait.component';
import { SkyWaitService } from './wait.service';

@NgModule({
  declarations: [
    SkyWaitComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkyWaitComponent
  ],
  providers: [
    SkyWaitService
  ]
})
export class SkyWaitModule {
}
