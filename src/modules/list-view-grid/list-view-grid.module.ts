import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyWaitModule } from '../wait';
import { SkyGridModule } from '../grid';
import { SkyListViewGridComponent } from './list-view-grid.component';

@NgModule({
  declarations: [
    SkyListViewGridComponent
  ],
  imports: [
    CommonModule,
    SkyWaitModule,
    SkyGridModule
  ],
  exports: [
    SkyListViewGridComponent
  ]
})
export class SkyListViewGridModule {
}
