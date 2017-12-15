import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SkyAutocompleteComponent } from './autocomplete.component';
import { SkyAutocompleteInputDirective } from './autocomplete-input.directive';

import { SkyDropdownModule } from '../dropdown';
import { SkyTextHighlightModule } from '../text-highlight';

@NgModule({
  declarations: [
    SkyAutocompleteComponent,
    SkyAutocompleteInputDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    SkyTextHighlightModule,
    SkyDropdownModule
  ],
  exports: [
    SkyAutocompleteComponent,
    SkyAutocompleteInputDirective
  ]
})
export class SkyAutocompleteModule { }
