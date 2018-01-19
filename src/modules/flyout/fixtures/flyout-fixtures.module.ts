import { FlyoutAutofocusTestComponent } from './flyout-autofocus.component.fixture';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyWindowRefService } from '../../window';

import { SkyFlyoutModule } from '../flyout.module';
import { FlyoutTestComponent } from './flyout.component.fixture';
import { FlyoutWithValuesTestComponent } from './flyout-with-values.component.fixture';

@NgModule({
  declarations: [
    FlyoutTestComponent,
    FlyoutAutofocusTestComponent,
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
    FlyoutAutofocusTestComponent,
    FlyoutWithValuesTestComponent

  ]
})
export class SkyFlyoutFixturesModule { }
