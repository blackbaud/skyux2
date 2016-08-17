import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyDropdownItemComponent } from './dropdown-item.component';
import { SkyDropdownComponent } from './dropdown.component';

@NgModule({
  declarations: [
    SkyDropdownComponent,
    SkyDropdownItemComponent
  ],
  imports: [CommonModule],
  exports: [
    SkyDropdownComponent,
    SkyDropdownItemComponent
  ]
})
export class SkyDropdownModule { }
