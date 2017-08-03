import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyMediaQueryModule } from '../media-queries';

import { SkyActionButtonComponent } from './action-button.component';
import { SkyActionButtonIconComponent } from './action-button-icon.component';
import { SkyActionButtonHeaderComponent } from './action-button-header.component';
import { SkyActionButtonDetailsComponent } from './action-button-details.component';
import { SkyActionButtonContainerComponent } from './action-button-container.component';

@NgModule({
  declarations: [
    SkyActionButtonComponent,
    SkyActionButtonIconComponent,
    SkyActionButtonHeaderComponent,
    SkyActionButtonDetailsComponent,
    SkyActionButtonContainerComponent
  ],
  imports: [
    CommonModule,
    SkyMediaQueryModule
  ],
  exports: [
    SkyActionButtonComponent,
    SkyActionButtonIconComponent,
    SkyActionButtonHeaderComponent,
    SkyActionButtonDetailsComponent,
    SkyActionButtonContainerComponent
  ]
})
export class SkyActionButtonModule { }
