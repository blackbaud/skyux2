import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyGridModule } from '../';

import { GridTestComponent } from './grid.component.fixture';
import { GridEmptyTestComponent } from './grid-empty.component.fixture';
import { GridDynamicTestComponent } from './grid-dynamic.component.fixture';
import { GridAsyncTestComponent } from './grid-async.component.fixture';
import { GridSettingsTestComponent } from './grid-settings.component.fixture';

@NgModule({
  declarations: [
    GridTestComponent,
    GridEmptyTestComponent,
    GridDynamicTestComponent,
    GridAsyncTestComponent,
    GridSettingsTestComponent
  ],
  imports: [
    CommonModule,
    SkyGridModule
  ],
  exports: [
    GridTestComponent,
    GridEmptyTestComponent,
    GridDynamicTestComponent,
    GridAsyncTestComponent,
    GridSettingsTestComponent
  ]
})
export class GridFixturesModule { }
