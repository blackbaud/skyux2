import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyToolbarModule } from '../toolbar';
import { SkySearchModule } from '../search';
import { SkyDropdownModule } from '../dropdown';
import { SkyListToolbarComponent } from './list-toolbar.component';
import { SkyListToolbarItemComponent } from './list-toolbar-item.component';
import { SkyListToolbarItemRendererComponent } from './list-toolbar-item-renderer.component';


@NgModule({
  declarations: [
    SkyListToolbarComponent,
    SkyListToolbarItemComponent,
    SkyListToolbarItemRendererComponent
  ],
  imports: [
    CommonModule,
    SkyToolbarModule,
    SkySearchModule
  ],
  exports: [
    SkyListToolbarComponent,
    SkyListToolbarItemComponent,
    SkyListToolbarItemRendererComponent
  ],
  providers: [
  ]
})
export class SkyListToolbarModule {
}
