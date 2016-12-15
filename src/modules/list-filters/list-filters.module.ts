import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyModalModule } from '../modal';
import { SkyListFilterComponent } from './list-filter.component';
import { SkyListFiltersComponent } from './list-filters.component';
import { SkyListFilterRendererComponent } from './list-filter-renderer.component';
import { SkyListFiltersModalComponent } from './list-filters-modal.component';

@NgModule({
  declarations: [
    SkyListFilterComponent,
    SkyListFiltersComponent,
    SkyListFilterRendererComponent,
    SkyListFiltersModalComponent
  ],
  imports: [
    CommonModule,
    SkyModalModule
  ],
  exports: [
    SkyListFilterComponent,
    SkyListFiltersComponent
  ],
  entryComponents: [
    SkyListFiltersModalComponent
  ]
})
export class SkyListFiltersModule {
}
