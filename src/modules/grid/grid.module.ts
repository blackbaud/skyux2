import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  DragulaModule
} from 'ng2-dragula/ng2-dragula';

import {
  SkyGridComponent
} from './grid.component';
import {
  SkyGridColumnComponent
} from './grid-column.component';
import {
  SkyGridCellComponent
} from './grid-cell.component';
import {
  SkyTextHighlightModule
} from '../text-highlight';
import {
  SkyIconModule
} from '../icon';

@NgModule({
  declarations: [
    SkyGridComponent,
    SkyGridColumnComponent,
    SkyGridCellComponent
  ],
  imports: [
    CommonModule,
    SkyTextHighlightModule,
    SkyIconModule,
    DragulaModule
  ],
  exports: [
    SkyGridComponent,
    SkyGridColumnComponent,
    SkyGridCellComponent
  ]
})
export class SkyGridModule {
}
