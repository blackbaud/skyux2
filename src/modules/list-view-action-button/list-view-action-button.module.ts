import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyFluidGridModule } from '../fluid-grid';
import { SkyActionButtonModule } from '../action-button';

import {
  SkyListViewActionButtonComponent
} from './list-view-action-button.component';

@NgModule({
  declarations: [
    SkyListViewActionButtonComponent
  ],
  imports: [
    CommonModule,
    SkyActionButtonModule,
    SkyFluidGridModule
  ],
  exports: [
    SkyListViewActionButtonComponent
  ]
})
export class SkyListViewActionButtonModule { }
