import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyDropdownModule } from '../';
import { DropdownTestComponent } from './dropdown.component.fixture';
import { DropdownParentTestComponent } from './dropdown-parent.component.fixture';

@NgModule({
  declarations: [
    DropdownTestComponent,
    DropdownParentTestComponent
  ],
  imports: [
    CommonModule,
    SkyDropdownModule
  ],
  exports: [
    DropdownTestComponent
  ]
})
export class SkyDropdownFixturesModule { }
