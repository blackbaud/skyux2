import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyChevronModule } from '../chevron';
import { SkyListViewRepeaterComponent } from './list-view-repeater.component';
import { SkyListViewRepeaterRendererComponent } from './list-view-repeater-renderer.component';
import { SkyListViewRepeaterLeftComponent } from './list-view-repeater-left.component';
import { SkyListViewRepeaterRightComponent } from './list-view-repeater-right.component';
import { SkyListViewRepeaterTitleComponent } from './list-view-repeater-title.component';
import {
  SkyListViewRepeaterDescriptionComponent
} from './list-view-repeater-description.component';
import { SkyListViewRepeaterContentComponent } from './list-view-repeater-content.component';
import { SkyListViewRepeaterEditorComponent } from './list-view-repeater-editor.component';

@NgModule({
  declarations: [
    SkyListViewRepeaterComponent,
    SkyListViewRepeaterLeftComponent,
    SkyListViewRepeaterRightComponent,
    SkyListViewRepeaterTitleComponent,
    SkyListViewRepeaterDescriptionComponent,
    SkyListViewRepeaterContentComponent,
    SkyListViewRepeaterEditorComponent,
    SkyListViewRepeaterRendererComponent
  ],
  imports: [
    CommonModule,
    SkyChevronModule
  ],
  exports: [
    SkyListViewRepeaterComponent,
    SkyListViewRepeaterLeftComponent,
    SkyListViewRepeaterRightComponent,
    SkyListViewRepeaterTitleComponent,
    SkyListViewRepeaterDescriptionComponent,
    SkyListViewRepeaterContentComponent,
    SkyListViewRepeaterEditorComponent,
    SkyListViewRepeaterRendererComponent
  ],
  providers: [
  ]
})
export class SkyListViewRepeaterModule {
}
