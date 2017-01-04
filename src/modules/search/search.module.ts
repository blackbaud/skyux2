import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkySearchComponent } from './search.component';

import { SkyResourcesModule } from '../resources';

@NgModule({
  declarations: [
    SkySearchComponent
  ],
  imports: [
    CommonModule,
    SkyResourcesModule
  ],
  exports: [
    SkySearchComponent
  ]
})
export class SkySearchModule { }
