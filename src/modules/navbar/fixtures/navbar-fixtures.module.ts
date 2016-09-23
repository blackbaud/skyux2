import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyNavbarModule } from '../';

import { NavbarTestComponent } from './navbar.component.fixture';

@NgModule({
  declarations: [
    NavbarTestComponent
  ],
  imports: [
    CommonModule,
    SkyNavbarModule
  ],
  exports: [
    NavbarTestComponent
  ]
})
export class SkyNavbarFixturesModule { }
