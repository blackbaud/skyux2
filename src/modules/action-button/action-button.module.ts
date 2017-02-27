import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyMediaQueryModule } from '../media-queries';

import { SkyActionButtonComponent } from './action-button.component';
import { SkyActionButtonIconComponent } from './action-button-icon.component';
import { SkyActionButtonHeaderComponent } from './action-button-header.component';
import { SkyActionButtonDetailsComponent } from './action-button-details.component';

@NgModule({
  declarations: [
    SkyActionButtonComponent,
    SkyActionButtonIconComponent,
    SkyActionButtonHeaderComponent,
    SkyActionButtonDetailsComponent
  ],
  imports: [
    CommonModule,
    SkyMediaQueryModule
  ],
  exports: [
    SkyActionButtonComponent,
    SkyActionButtonIconComponent,
    SkyActionButtonHeaderComponent,
    SkyActionButtonDetailsComponent
  ]
})
export class SkyActionButtonModule { }
