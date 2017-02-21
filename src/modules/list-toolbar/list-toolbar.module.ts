import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyToolbarModule } from '../toolbar';
import { SkySearchModule } from '../search';
import { SkyDropdownModule } from '../dropdown';
import { SkyListToolbarComponent } from './list-toolbar.component';
import { SkyListToolbarItemComponent } from './list-toolbar-item.component';
import { SkyListToolbarItemRendererComponent } from './list-toolbar-item-renderer.component';
import {
  SkyListToolbarSecondaryActionsComponent
} from './list-toolbar-secondary-actions.component';
import {
  SkyListToolbarSecondaryActionComponent
} from './list-toolbar-secondary-action.component';
import { SkyResourcesModule } from '../resources';

@NgModule({
  declarations: [
    SkyListToolbarComponent,
    SkyListToolbarItemComponent,
    SkyListToolbarItemRendererComponent,
    SkyListToolbarSecondaryActionsComponent,
    SkyListToolbarSecondaryActionComponent
  ],
  imports: [
    CommonModule,
    SkyToolbarModule,
    SkySearchModule,
    SkyDropdownModule,
    SkyResourcesModule
  ],
  exports: [
    SkyListToolbarComponent,
    SkyListToolbarItemComponent,
    SkyListToolbarItemRendererComponent,
    SkyListToolbarSecondaryActionsComponent,
    SkyListToolbarSecondaryActionComponent
  ],
  providers: [
  ]
})
export class SkyListToolbarModule {
}
