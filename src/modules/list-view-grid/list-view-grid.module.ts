import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyModalModule } from '../modal';
import { SkySpinnerModule } from '../spinner';
import { SkyListModule } from '../list';
import { SkyListViewChecklistModule } from '../list-view-checklist';
import { SkyListViewGridComponent } from './list-view-grid.component';
import { SkyListViewGridColumnComponent } from './list-view-grid-column.component';
import { SkyListViewGridCellComponent } from './list-view-grid-cell.component';
import { SkyListViewGridColumnSelectorComponent } from './list-view-grid-column-selector.component';
import { SkyListPagingDefaultModule } from '../list-paging-default';
import { SkyListToolbarModule } from '../list-toolbar';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';

@NgModule({
  declarations: [
    SkyListViewGridComponent,
    SkyListViewGridColumnComponent,
    SkyListViewGridCellComponent,
    SkyListViewGridColumnSelectorComponent
  ],
  imports: [
    CommonModule,
    SkySpinnerModule,
    SkyModalModule,
    SkyListModule,
    SkyListViewChecklistModule,
    SkyListPagingDefaultModule,
    SkyListToolbarModule,
    DragulaModule
  ],
  entryComponents: [
    SkyListViewGridColumnSelectorComponent
  ],
  exports: [
    SkyListViewGridComponent,
    SkyListViewGridColumnComponent,
    SkyListViewGridCellComponent
  ]
})
export class SkyListViewGridModule {
}
