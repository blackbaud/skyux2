import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyDropdownModule } from '../';
import { DropdownTestComponent } from './dropdown.component.fixture';

@NgModule({
  declarations: [
    DropdownTestComponent
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
