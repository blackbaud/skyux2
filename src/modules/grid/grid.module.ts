import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyGridComponent } from './grid.component';
import { SkyGridColumnComponent } from './grid-column.component';
import { SkyGridCellComponent } from './grid-cell.component';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { SkyColumnSelectorComponent } from './column-selector-modal.component';

@NgModule({
  declarations: [
    SkyGridComponent,
    SkyGridColumnComponent,
    SkyGridCellComponent
  ],
  imports: [
    CommonModule,
    DragulaModule,
    SkyColumnSelectorComponent
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
