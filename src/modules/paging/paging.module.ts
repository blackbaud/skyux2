import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyPagingComponent } from './paging.component';

@NgModule({
  declarations: [
    SkyPagingComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkyPagingComponent
  ]
})
export class SkyPagingModule {
}
