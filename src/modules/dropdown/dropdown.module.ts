import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyDropdownButtonComponent } from './dropdown-button.component';
import { SkyDropdownItemComponent } from './dropdown-item.component';
import { SkyDropdownMenuComponent } from './dropdown-menu.component';
import { SkyDropdownComponent } from './dropdown.component';
import { SkyDropdownAdapterService } from './dropdown-adapter.service';
import { SkyWindowRefService } from '../window';

@NgModule({
  declarations: [
    SkyDropdownButtonComponent,
    SkyDropdownComponent,
    SkyDropdownItemComponent,
    SkyDropdownMenuComponent
  ],
  imports: [CommonModule],
  exports: [
    SkyDropdownButtonComponent,
    SkyDropdownComponent,
    SkyDropdownItemComponent,
    SkyDropdownMenuComponent
  ],
  providers: [
    SkyDropdownAdapterService,
    SkyWindowRefService
  ]
})
export class SkyDropdownModule { }
