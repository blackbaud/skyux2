import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SkySearchComponent } from './search.component';
import { SkyMediaQueryModule } from '../media-queries';

import { SkyResourcesModule } from '../resources';

@NgModule({
  declarations: [
    SkySearchComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    SkyResourcesModule,
    SkyMediaQueryModule,
    FormsModule
  ],
  exports: [
    SkySearchComponent
  ]
})
export class SkySearchModule { }
