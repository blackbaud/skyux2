import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyCheckboxModule } from '../checkbox';
import { SkyLinkRecordsComponent } from './link-records.component';
import { SkyLinkRecordsItemComponent } from './link-records-item.component';
import { SkyLinkRecordsItemContentComponent } from './link-records-item-content.component';
import { SkyLinkRecordsItemDiffComponent } from './link-records-item-diff.component';
import { SkyLinkRecordsItemTitleComponent } from './link-records-item-title.component';
import { SkyLinkRecordsMatchContentComponent } from './link-records-match-content.component';
import {
  SkyLinkRecordsNoMatchContentComponent
} from './link-records-nomatch-content.component';
import { SkyLinkRecordsRendererComponent } from './link-records-renderer.component';
import { SkyResourcesModule } from '../resources';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    SkyLinkRecordsComponent,
    SkyLinkRecordsItemComponent,
    SkyLinkRecordsItemDiffComponent,
    SkyLinkRecordsItemTitleComponent,
    SkyLinkRecordsItemContentComponent,
    SkyLinkRecordsMatchContentComponent,
    SkyLinkRecordsNoMatchContentComponent,
    SkyLinkRecordsRendererComponent
  ],
  imports: [
    CommonModule,
    SkyCheckboxModule,
    SkyResourcesModule
  ],
  exports: [
    SkyLinkRecordsComponent,
    SkyLinkRecordsItemComponent,
    SkyLinkRecordsItemDiffComponent,
    SkyLinkRecordsItemTitleComponent,
    SkyLinkRecordsItemContentComponent,
    SkyLinkRecordsMatchContentComponent,
    SkyLinkRecordsNoMatchContentComponent,
    SkyLinkRecordsRendererComponent
  ]
})
export class SkyLinkRecordsModule {
}
