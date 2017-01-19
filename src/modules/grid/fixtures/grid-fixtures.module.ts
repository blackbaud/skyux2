import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyGridModule } from '../';

import { GridTestComponent } from './grid.component.fixture';
import { GridEmptyTestComponent } from './grid-empty.component.fixture';

@NgModule({
  declarations: [
    GridTestComponent,
    GridEmptyTestComponent
  ],
  imports: [
    CommonModule,
    SkyGridModule
  ],
  exports: [
    GridTestComponent,
    GridEmptyTestComponent
  ]
})
export class GridFixturesModule { }
