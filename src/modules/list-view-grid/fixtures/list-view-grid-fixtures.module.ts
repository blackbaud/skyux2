import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyListViewGridModule } from '../';
import {
  SkyGridModule
} from '../../grid';

import { ListViewGridTestComponent } from './list-view-grid.component.fixture';
import { ListViewGridDisplayTestComponent } from './list-view-grid-display.component.fixture';
import { ListViewGridEmptyTestComponent } from './list-view-grid-empty.component.fixture';

@NgModule({
  declarations: [
    ListViewGridTestComponent,
    ListViewGridDisplayTestComponent,
    ListViewGridEmptyTestComponent
  ],
  imports: [
    CommonModule,
    SkyGridModule,
    SkyListViewGridModule
  ],
  exports: [
    ListViewGridTestComponent,
    ListViewGridDisplayTestComponent,
    ListViewGridEmptyTestComponent
  ]
})
export class ListViewGridFixturesModule { }
