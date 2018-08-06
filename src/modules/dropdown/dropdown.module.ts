import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyWindowRefService } from '../window';
import { SkyPopoverModule } from '../popover';

import { SkyDropdownButtonComponent } from './dropdown-button.component';
import { SkyDropdownItemComponent } from './dropdown-item.component';
import { SkyDropdownMenuComponent } from './dropdown-menu.component';
import { SkyDropdownComponent } from './dropdown.component';
import { SkyIconModule } from '../icon';

@NgModule({
  declarations: [
    SkyDropdownButtonComponent,
    SkyDropdownComponent,
    SkyDropdownItemComponent,
    SkyDropdownMenuComponent
  ],
  imports: [
    CommonModule,
    SkyPopoverModule,
    SkyIconModule
  ],
  exports: [
    SkyDropdownButtonComponent,
    SkyDropdownComponent,
    SkyDropdownItemComponent,
    SkyDropdownMenuComponent
  ],
  providers: [
    SkyWindowRefService
  ]
})
export class SkyDropdownModule { }
