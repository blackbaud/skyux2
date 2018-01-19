import { SkyContainFocusModule } from './../sky-contain-focus/sky-contain-focus.module';
import { SkyFlyoutComponent } from './flyout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyResourcesModule } from '../resources';
import { SkyWindowRefService } from '../window';
import { SkyFlyoutAdapterService } from './flyout-adapter.service';
import { SkyFlyoutService } from './flyout.service';

@NgModule({
  declarations: [
    SkyFlyoutComponent
  ],
  providers: [
    SkyFlyoutAdapterService,
    SkyFlyoutService,
    SkyWindowRefService
  ],
  imports: [
    CommonModule,
    SkyResourcesModule,
    SkyContainFocusModule
  ],
  exports: [
    SkyFlyoutComponent
  ],
  entryComponents: [ SkyFlyoutComponent ]
})
export class SkyFlyoutModule { }
