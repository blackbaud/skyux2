// #region imports
import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  SkyToastModule
} from '../toast.module';

import {
  SkyToastTestComponent
} from './toast.component.fixture';
// #endregion

@NgModule({
  declarations: [
    SkyToastTestComponent
  ],
  imports: [
    CommonModule,
    SkyToastModule
  ],
  exports: [
    SkyToastTestComponent
  ]
})
export class SkyToastFixturesModule { }
