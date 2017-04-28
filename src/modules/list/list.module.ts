import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyListComponent } from './list.component';
import { SkyListToolbarModule } from '../list-toolbar';
import { SkyListViewChecklistModule } from '../list-view-checklist';
import { SkyListViewGridModule } from '../list-view-grid';
import { SkyListSecondaryActionsModule } from '../list-secondary-actions';
import { SkyListFiltersModule } from '../list-filters';
import { SkyGridModule } from '../grid';

@NgModule({
  declarations: [
    SkyListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkyListComponent,
    SkyListToolbarModule,
    SkyListViewChecklistModule,
    SkyListViewGridModule,
    SkyListSecondaryActionsModule,
    SkyListFiltersModule,
    SkyGridModule
  ]
})
export class SkyListModule {
}
