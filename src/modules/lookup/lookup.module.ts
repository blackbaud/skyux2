import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SkyLookupComponent } from './lookup.component';
import { SkyWindowRefService } from '../window';

import { SkyResourcesModule } from '../resources';
import { SkyDropdownModule } from '../dropdown';

@NgModule({
  declarations: [
    SkyLookupComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    SkyResourcesModule,
    SkyDropdownModule
  ],
  exports: [
    SkyLookupComponent
  ],
  providers: [
    SkyWindowRefService
  ]
})
export class SkyLookupModule { }
