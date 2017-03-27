import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyToolbarModule } from '../toolbar';
import { SkySearchModule } from '../search';
import { SkySortModule } from '../sort';
import { SkyFilterModule } from '../filter';
import { SkyListToolbarComponent } from './list-toolbar.component';
import { SkyListToolbarItemComponent } from './list-toolbar-item.component';
import { SkyListToolbarItemRendererComponent } from './list-toolbar-item-renderer.component';
import { SkyListToolbarSortComponent } from './list-toolbar-sort.component';

@NgModule({
  declarations: [
    SkyListToolbarComponent,
    SkyListToolbarItemComponent,
    SkyListToolbarItemRendererComponent,
    SkyListToolbarSortComponent
  ],
  imports: [
    CommonModule,
    SkyToolbarModule,
    SkySearchModule,
    SkySortModule,
    SkyFilterModule
  ],
  exports: [
    SkyListToolbarComponent,
    SkyListToolbarItemComponent,
    SkyListToolbarItemRendererComponent,
    SkyListToolbarSortComponent
  ],
  providers: [
  ]
})
export class SkyListToolbarModule {
}
