import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyWindowRefService } from '../../window';

import { SkyFlyoutModule } from '../flyout.module';
import { FlyoutTestComponent } from './flyout.component.fixture';
import { FlyoutWithValuesTestComponent } from './flyout-with-values.component.fixture';

@NgModule({
  declarations: [
    FlyoutTestComponent,
    FlyoutWithValuesTestComponent
  ],
  imports: [
    CommonModule,
    SkyFlyoutModule
  ],
  providers: [
    SkyWindowRefService
  ],
  entryComponents: [
    FlyoutTestComponent,
    FlyoutWithValuesTestComponent
  ]
})
export class SkyFlyoutFixturesModule { }
