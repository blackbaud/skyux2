import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  SkyCheckboxModule
} from '../checkbox';

import {
  SkyListViewChecklistComponent
} from './list-view-checklist.component';

import {
  SkyListViewChecklistItemComponent
} from './list-view-checklist-item.component';

import {
  SkyResourcesModule
} from '../resources';

@NgModule({
  declarations: [
    SkyListViewChecklistComponent,
    SkyListViewChecklistItemComponent
  ],
  exports: [
    SkyListViewChecklistComponent,
    SkyListViewChecklistItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SkyCheckboxModule,
    SkyResourcesModule
  ]
})
export class SkyListViewChecklistModule {
}
