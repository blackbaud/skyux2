import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyColumnSelectorComponent } from './column-selector-modal.component';
import { SkyResourcesModule } from '../resources';
import { SkyModalModule } from '../modal';
import { SkyListModule } from '../list';
import { SkyListToolbarModule } from '../list-toolbar';
import { SkyListViewChecklistModule } from '../list-view-checklist';

@NgModule({
  declarations: [
    SkyColumnSelectorComponent
  ],
  imports: [
    CommonModule,
    SkyResourcesModule,
    SkyModalModule,
    SkyListModule,
    SkyListToolbarModule,
    SkyListViewChecklistModule
  ],
  exports: [
    SkyColumnSelectorComponent
  ],
  entryComponents: [
    SkyColumnSelectorComponent
  ]
})
export class SkyColumnSelectorModule {
}
