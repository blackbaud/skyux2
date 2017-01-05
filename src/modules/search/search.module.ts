import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SkySearchComponent } from './search.component';

import { SkyResourcesModule } from '../resources';

@NgModule({
  declarations: [
    SkySearchComponent
  ],
  imports: [
    CommonModule,
    SkyResourcesModule,
    FormsModule
  ],
  exports: [
    SkySearchComponent
  ]
})
export class SkySearchModule { }
