import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyAlertComponent } from './alert.component';
import { SkyResourcesModule } from '../resources';

@NgModule({
  declarations: [SkyAlertComponent],
  imports: [CommonModule, SkyResourcesModule],
  exports: [SkyAlertComponent]
})
export class SkyAlertModule { }
