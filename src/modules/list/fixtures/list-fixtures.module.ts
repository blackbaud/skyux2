import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SkyListModule } from '../';
import { SkyListViewGridModule } from '../../list-view-grid';
import { SkyGridModule } from '../../grid';

import { ListTestComponent } from './list.component.fixture';
import { ListDualTestComponent } from './list-dual.component.fixture';
import { ListEmptyTestComponent } from './list-empty.component.fixture';

@NgModule({
  declarations: [
    ListTestComponent,
    ListDualTestComponent,
    ListEmptyTestComponent
  ],
  imports: [
    CommonModule,
    SkyListModule,
    SkyListViewGridModule,
    SkyGridModule,
    FormsModule
  ],
  exports: [
    ListTestComponent,
    ListDualTestComponent,
    ListEmptyTestComponent
  ]
})
export class ListFixturesModule { }
