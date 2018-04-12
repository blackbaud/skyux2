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
  SkyModalModule
} from '../modal';

import {
  SkyResourcesModule
} from '../resources';

import {
  SkyTokensModule
} from '../tokens';

import { SkySelectFieldComponent } from './select-field.component';
import { SkySelectFieldPickerComponent } from './select-field-picker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SkyListModule,
    SkyListPagingModule,
    SkyModalModule,
    SkyResourcesModule,
    SkyTokensModule
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
