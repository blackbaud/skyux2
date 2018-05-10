// #region imports
import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  NoopAnimationsModule
} from '@angular/platform-browser/animations';

import {
  SkyToastModule
} from '../toast.module';

import {
  SkyToastTestComponent
} from './toast.component.fixture';

import {
  SkyToasterTestComponent
} from './toaster.component.fixture';
import { SkyToastBodyTestComponent } from '.';
// #endregion

@NgModule({
  declarations: [
    SkyToastTestComponent,
    SkyToastBodyTestComponent,
    SkyToasterTestComponent
  ],
  imports: [
    CommonModule,
    NoopAnimationsModule,
    SkyToastModule
  ],
  exports: [
    SkyToastTestComponent,
    SkyToasterTestComponent
  ],
  entryComponents: [
    SkyToastBodyTestComponent
  ]
})
export class SkyToastFixturesModule { }
