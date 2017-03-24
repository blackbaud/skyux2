import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyListFilterButtonComponent } from './list-filter-button.component';


@NgModule({
  declarations: [
    SkyListFilterButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkyListFilterButtonComponent
  ]
})
export class SkyListFiltersModule { }
