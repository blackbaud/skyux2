import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  FormsModule
} from '@angular/forms';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';

import {
  SkyMediaQueryModule
} from '../media-queries';
import {
  SkyResourcesModule
} from '../resources';
import {
  SkyIconModule
} from '../icon';

import {
  SkySearchComponent
} from './search.component';

@NgModule({
  declarations: [
    SkySearchComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    SkyResourcesModule,
    SkyMediaQueryModule,
    FormsModule,
    SkyIconModule
  ],
  exports: [
    SkySearchComponent
  ]
})
export class SkySearchModule { }
