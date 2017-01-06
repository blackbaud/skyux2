import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyListPagingComponent } from './list-paging.component';
import { SkyPagingModule } from '../paging';

@NgModule({
  declarations: [
    SkyListPagingComponent
  ],
  imports: [
    CommonModule,
    SkyPagingModule
  ],
  exports: [
    SkyListPagingComponent
  ]
})
export class SkyListPagingModule {
}
