import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyAlertComponent } from './alert.component';
import { SkyResourcesModule } from '../resources';
import { SkyIconModule } from '../icon';

@NgModule({
  declarations: [SkyAlertComponent],
  imports: [CommonModule, SkyResourcesModule, SkyIconModule],
  exports: [SkyAlertComponent]
})
export class SkyAlertModule { }
