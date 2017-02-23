import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyGridComponent } from './grid.component';
import { SkyGridColumnComponent } from './grid-column.component';
import { SkyGridCellComponent } from './grid-cell.component';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { SkyColumnSelectorComponent } from './column-selector-modal.component';
import { SkyResourcesModule } from '../resources';
import { SkyModalModule } from '../modal';
import { SkyListModule } from '../list';
import { SkyListToolbarModule } from '../list-toolbar';
import { SkyListViewChecklistModule } from '../list-view-checklist';

@NgModule({
  declarations: [
    SkyGridComponent,
    SkyGridColumnComponent,
    SkyGridCellComponent,
    SkyColumnSelectorComponent
  ],
  imports: [
    CommonModule,
    DragulaModule,
    SkyResourcesModule,
    SkyModalModule,
    SkyListModule,
    SkyListToolbarModule,
    SkyListViewChecklistModule
  ],
  exports: [
    SkyGridComponent,
    SkyGridColumnComponent,
    SkyGridCellComponent,
    SkyColumnSelectorComponent
  ],
  entryComponents: [
    SkyColumnSelectorComponent
  ]
})
export class SkyGridModule {
}
