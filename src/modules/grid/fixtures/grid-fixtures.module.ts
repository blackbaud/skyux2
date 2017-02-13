import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyGridModule } from '../';

import { GridTestComponent } from './grid.component.fixture';
import { GridEmptyTestComponent } from './grid-empty.component.fixture';
import { GridDynamicTestComponent } from './grid-dynamic.component.fixture';

@NgModule({
  declarations: [
    GridTestComponent,
    GridEmptyTestComponent,
    GridDynamicTestComponent
  ],
  imports: [
    CommonModule,
    SkyGridModule
  ],
  exports: [
    GridTestComponent,
    GridEmptyTestComponent,
    GridDynamicTestComponent
  ]
})
export class GridFixturesModule { }
