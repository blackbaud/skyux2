import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SkyCheckboxModule } from '../checkbox';
import { SkyListViewChecklistComponent } from './list-view-checklist.component';
import { SkyListViewChecklistItemComponent } from './list-view-checklist-item.component';

@NgModule({
  declarations: [
    SkyListViewChecklistComponent,
    SkyListViewChecklistItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SkyCheckboxModule
  ],
  exports: [
    SkyListViewChecklistComponent,
    SkyListViewChecklistItemComponent
  ],
  providers: [
  ]
})
export class SkyListViewChecklistModule {
}
