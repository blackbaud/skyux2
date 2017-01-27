import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyMediaQueryModule } from '../media-queries';

import { SkyButtonLargeComponent } from './button-large.component';
import { SkyButtonLargeIconComponent } from './button-large-icon.component';
import { SkyButtonLargeHeaderComponent } from './button-large-header.component';
import { SkyButtonLargeDetailsComponent } from './button-large-details.component';

@NgModule({
  declarations: [
    SkyButtonLargeComponent,
    SkyButtonLargeIconComponent,
    SkyButtonLargeHeaderComponent,
    SkyButtonLargeDetailsComponent
  ],
  imports: [
    CommonModule,
    SkyMediaQueryModule
  ],
  exports: [
    SkyButtonLargeComponent,
    SkyButtonLargeIconComponent,
    SkyButtonLargeHeaderComponent,
    SkyButtonLargeDetailsComponent
  ]
})
export class SkyButtonLargeModule { }
