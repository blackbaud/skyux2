import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import {
  SkyListModule
} from '../list';

import {
  SkyListPagingModule
} from '../list-paging';

import {
  SkyResourcesModule
} from '../resources';

import {
  SkyIconModule
} from '../icon';
import {
  SkyListFiltersModule
} from '../list-filters';
import {
  SkyListToolbarModule
} from '../list-toolbar';
import {
  SkyListViewChecklistModule
} from '../list-view-checklist';
import {
  SkyModalModule
} from '../modal';
import {
  SkyTokensModule
} from '../tokens';

import {
  SkySelectFieldComponent
} from './select-field.component';
import {
  SkySelectFieldPickerComponent
} from './select-field-picker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SkyListFiltersModule,
    SkyListModule,
    SkyListPagingModule,
    SkyListToolbarModule,
    SkyListViewChecklistModule,
    SkyModalModule,
    SkyResourcesModule,
    SkyTokensModule,
    SkyIconModule
  ],
  exports: [
    SkySelectFieldComponent,
    SkySelectFieldPickerComponent
  ],
  declarations: [
    SkySelectFieldComponent,
    SkySelectFieldPickerComponent
  ],
  entryComponents: [
    SkySelectFieldPickerComponent
  ]
})
export class SkySelectFieldModule { }
