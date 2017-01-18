import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyModalModule } from '../modal';
import { SkyCheckboxModule } from '../checkbox';
import { SkyWaitModule } from '../wait';
import { SkyListViewGridComponent } from './list-view-grid.component';
import { SkyListViewGridColumnComponent } from './list-view-grid-column.component';
import { SkyListViewGridCellComponent } from './list-view-grid-cell.component';
import { SkyListPagingModule } from '../list-paging';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';

@NgModule({
  declarations: [
    SkyListViewGridComponent,
    SkyListViewGridColumnComponent,
    SkyListViewGridCellComponent
  ],
  imports: [
    CommonModule,
    SkyCheckboxModule,
    SkyModalModule,
    SkyListPagingModule,
    DragulaModule,
    SkyWaitModule
  ],
  exports: [
    SkyListViewGridComponent,
    SkyListViewGridColumnComponent,
    SkyListViewGridCellComponent
  ]
})
export class SkyListViewGridModule {
}
