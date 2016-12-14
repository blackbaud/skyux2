import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyWaitDirective } from './wait.directive';
import { SkyWaitComponent } from './wait.component';
import { SkyWaitService } from './wait.service';

@NgModule({
  declarations: [
    SkyWaitDirective,
    SkyWaitComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkyWaitDirective,
    SkyWaitComponent
  ],
  entryComponents: [
    SkyWaitComponent
  ],
  providers: [
    SkyWaitService
  ]
})
export class SkyWaitModule {
}
