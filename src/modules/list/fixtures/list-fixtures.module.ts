import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SkyListModule } from '../';
import { SkyListViewGridModule } from '../../list-view-grid';
import { SkyListToolbarModule } from '../../list-toolbar';
import { SkyGridModule } from '../../grid';

import { ListTestComponent } from './list.component.fixture';
import { ListDualTestComponent } from './list-dual.component.fixture';
import { ListEmptyTestComponent } from './list-empty.component.fixture';
import { ListSelectedTestComponent } from './list-selected.component.fixture';
import { ListFilteredTestComponent } from './list-filtered.component.fixture';

@NgModule({
  declarations: [
    ListTestComponent,
    ListDualTestComponent,
    ListEmptyTestComponent,
    ListSelectedTestComponent,
    ListFilteredTestComponent
  ],
  imports: [
    CommonModule,
    SkyListModule,
    SkyListViewGridModule,
    SkyListToolbarModule,
    SkyGridModule,
    FormsModule
  ],
  exports: [
    ListTestComponent,
    ListDualTestComponent,
    ListEmptyTestComponent,
    ListSelectedTestComponent,
    ListFilteredTestComponent
  ]
})
export class ListFixturesModule { }
