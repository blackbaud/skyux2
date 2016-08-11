import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { SkyCardComponent } from './card.component';
import { SkyCheckboxModule } from '../checkbox';
import { SkyResourcesModule } from '../resources';

@NgModule({
  declarations: [SkyCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    SkyCheckboxModule,
    SkyResourcesModule
  ],
  exports: [SkyCardComponent]
})
export class SkyCardModule { }
