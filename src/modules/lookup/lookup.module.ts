import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SkyLookupComponent } from './lookup.component';
import { SkyWindowRefService } from '../window';

import { SkyResourcesModule } from '../resources';
import { SkyDropdownModule } from '../dropdown';
import { SkyTextHighlightModule } from '../text-highlight';

@NgModule({
  declarations: [
    SkyLookupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SkyResourcesModule,
    SkyDropdownModule,
    SkyTextHighlightModule
  ],
  exports: [
    SkyLookupComponent
  ],
  providers: [
    SkyWindowRefService
  ]
})
export class SkyLookupModule { }
