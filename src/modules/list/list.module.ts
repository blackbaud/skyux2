import { NgModule } from '@angular/core';
import { SkyListToolbarModule } from '../list-toolbar';
import { SkyListViewChecklistModule } from '../list-view-checklist';
import { SkyListViewGridModule } from '../list-view-grid';
import { SkyListSecondaryActionsModule } from '../list-secondary-actions';
import { SkyListFiltersModule } from '../list-filters';
import { SkyGridModule } from '../grid';

// SkyListViewChecklistModule, SkyListViewGridModule, and SkyGridModule should be removed
// from this module's exports. In the meantime, combine the above with
// @skyux/list-builder's SkyListModule as a temporary workaround to avoid any breaking changes.
import {
  SkyListModule as SkyListModuleLib
} from '@skyux/list-builder/modules/list/list.module';

@NgModule({
  imports: [],
  exports: [
    SkyListViewChecklistModule,
    SkyListViewGridModule,
    SkyGridModule,
    SkyListModuleLib,
    SkyListFiltersModule,
    SkyListSecondaryActionsModule,
    SkyListToolbarModule
  ]
})
export class SkyListModule {
}
