import { SkyFlyoutComponent } from './flyout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyResourcesModule } from '../resources';

@NgModule({
  declarations: [
    SkyFlyoutComponent
  ],
  providers: [ ],
  imports: [
    CommonModule,
    SkyResourcesModule
  ],
  exports: [
    SkyFlyoutComponent
  ],
  entryComponents: [ ]
})
export class SkyFlyoutModule { }
