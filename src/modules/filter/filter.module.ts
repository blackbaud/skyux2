import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyFilterButtonComponent} from './filter-button.component';
import { SkyResourcesModule } from '../resources';

@NgModule({
  declarations: [
    SkyFilterButtonComponent
  ],
  imports: [
    CommonModule,
    SkyResourcesModule
  ],
  exports: [
    SkyFilterButtonComponent
  ]
})
export class SkyFilterModule { }
