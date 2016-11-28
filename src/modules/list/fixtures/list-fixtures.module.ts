import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SkyListModule } from '../';
import { SkyListToolbarModule } from '../../list-toolbar';
import { SkyListViewGridModule } from '../../list-view-grid';
import { SkyListFiltersModule } from '../../list-filters';

import { ListTestComponent } from './list.component.fixture';
import { ListAsyncTestComponent } from './list-async.component.fixture';
import { ListDualTestComponent } from './list-dual.component.fixture';
import { ListEmptyTestComponent } from './list-empty.component.fixture';
import { ListPromiseTestComponent } from './list-promise.component.fixture';

@NgModule({
  declarations: [
    ListTestComponent,
    ListAsyncTestComponent,
    ListDualTestComponent,
    ListEmptyTestComponent,
    ListPromiseTestComponent
  ],
  imports: [
    CommonModule,
    SkyListModule,
    SkyListFiltersModule,
    SkyListToolbarModule,
    SkyListViewGridModule,
    FormsModule
  ],
  exports: [
    ListTestComponent,
    ListAsyncTestComponent,
    ListDualTestComponent,
    ListEmptyTestComponent,
    ListPromiseTestComponent
  ]
})
export class ListFixturesModule { }
