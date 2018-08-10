import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyDropdownModule } from '../dropdown';
import {
  SkyListSecondaryActionsComponent
} from './list-secondary-actions.component';
import {
  SkyListSecondaryActionComponent
} from './list-secondary-action.component';
import { SkyResourcesModule } from '../resources';
import { SkyMediaQueryModule } from '../media-queries';
import { SkyIconModule } from '../icon';

@NgModule({
  declarations: [
    SkyListSecondaryActionsComponent,
    SkyListSecondaryActionComponent
  ],
  imports: [
    CommonModule,
    SkyDropdownModule,
    SkyResourcesModule,
    SkyMediaQueryModule,
    SkyIconModule
  ],
  exports: [
    SkyListSecondaryActionsComponent,
    SkyListSecondaryActionComponent
  ],
  providers: [
  ]
})
export class SkyListSecondaryActionsModule {
}
