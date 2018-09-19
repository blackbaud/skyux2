import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';

import {
  SkyListColumnSelectorActionComponent
} from './list-column-selector-action.component';
import {
  SkyResourcesModule
} from '../resources';
import {
  SkyModalModule
} from '../modal';
import {
  SkyListSecondaryActionsModule
} from '../list-secondary-actions';
import {
  SkyListToolbarModule
} from '../list-toolbar';
import {
  SkyIconModule
} from '../icon';

@NgModule({
  declarations: [
    SkyListColumnSelectorActionComponent
  ],
  imports: [
    CommonModule,
    SkyResourcesModule,
    SkyModalModule,
    SkyListSecondaryActionsModule,
    SkyListToolbarModule,
    SkyIconModule
  ],
  exports: [
    SkyListColumnSelectorActionComponent
  ]
})
export class SkyListColumnSelectorActionModule {
}
