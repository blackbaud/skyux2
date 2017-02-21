import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyListViewGridModule } from '../';
import { SkyListModule } from '../../list';
import {
  SkyGridModule
} from '../../grid';

import { ListViewGridTestComponent } from './list-view-grid.component.fixture';
import { ListViewGridDisplayTestComponent } from './list-view-grid-display.component.fixture';
import { ListViewGridEmptyTestComponent } from './list-view-grid-empty.component.fixture';
import { ListViewGridDynamicTestComponent } from './list-view-grid-dynamic.component.fixture';

@NgModule({
  declarations: [
    ListViewGridTestComponent,
    ListViewGridDisplayTestComponent,
    ListViewGridEmptyTestComponent,
    ListViewGridDynamicTestComponent
  ],
  imports: [
    CommonModule,
    SkyGridModule,
    SkyListViewGridModule,
    SkyListModule
  ],
  exports: [
    ListViewGridTestComponent,
    ListViewGridDisplayTestComponent,
    ListViewGridEmptyTestComponent,
    ListViewGridDynamicTestComponent
  ]
})
export class ListViewGridFixturesModule { }
