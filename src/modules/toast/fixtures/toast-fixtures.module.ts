import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  NoopAnimationsModule
} from '@angular/platform-browser/animations';

import { SkyToastModule } from '../toast.module';
import { SkyToastTestComponent } from './toast.component.fixture';
import { SkyToastTestCustomComponent } from './toast-custom.component.fixture';

@NgModule({
  declarations: [
    SkyToastTestComponent,
    SkyToastTestCustomComponent
  ],
  imports: [
    CommonModule,
    NoopAnimationsModule,
    SkyToastModule
  ],
  exports: [
    SkyToastTestCustomComponent
  ],
  entryComponents: [
    SkyToastTestCustomComponent
  ]
})
export class SkyToastFixturesModule { }
