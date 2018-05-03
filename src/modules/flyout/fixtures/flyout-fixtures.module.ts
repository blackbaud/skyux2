import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  NoopAnimationsModule
} from '@angular/platform-browser/animations';

import { SkyFlyoutModule } from '../flyout.module';
import { SkyFlyoutTestComponent } from './flyout.component.fixture';
import { SkyFlyoutTestSampleComponent } from './flyout-sample.component.fixture';
import { RouterTestingModule } from '@angular/router/testing';

@NgModule({
  declarations: [
    SkyFlyoutTestComponent,
    SkyFlyoutTestSampleComponent
  ],
  imports: [
    CommonModule,
    NoopAnimationsModule,
    RouterTestingModule,
    SkyFlyoutModule
  ],
  exports: [
    SkyFlyoutTestSampleComponent
  ],
  entryComponents: [
    SkyFlyoutTestSampleComponent
  ]
})
export class SkyFlyoutFixturesModule { }
