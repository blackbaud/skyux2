import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SkyLookupComponent } from './lookup.component';
import { SkyLookupTokensComponent } from './lookup-tokens.component';

import { SkyAutocompleteModule } from '../autocomplete';
import { SkyResourcesModule } from '../resources';

@NgModule({
  declarations: [
    SkyLookupComponent,
    SkyLookupTokensComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SkyAutocompleteModule,
    SkyResourcesModule
  ],
  exports: [
    SkyLookupComponent
  ]
})
export class SkyLookupModule { }
