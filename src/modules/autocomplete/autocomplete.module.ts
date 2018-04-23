import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SkyDropdownModule } from '../dropdown';
import { SkyTextHighlightModule } from '../text-highlight';

import { SkyAutocompleteComponent } from './autocomplete.component';
import { SkyAutocompleteInputDirective } from './autocomplete-input.directive';
import { SkyPopoverModule } from '../popover';

@NgModule({
  declarations: [
    SkyAutocompleteComponent,
    SkyAutocompleteInputDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    SkyTextHighlightModule,
    SkyDropdownModule,
    SkyPopoverModule
  ],
  exports: [
    SkyAutocompleteComponent,
    SkyAutocompleteInputDirective
  ]
})
export class SkyAutocompleteModule { }
