import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyPagingComponent } from './paging.component';
import { SkyResourcesModule } from '../resources';

@NgModule({
  declarations: [
    SkyPagingComponent
  ],
  imports: [
    CommonModule,
    SkyResourcesModule
  ],
  exports: [
    SkyPagingComponent
  ]
})
export class SkyPagingModule {
}
