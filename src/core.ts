import { NgModule } from '@angular/core';

import { SKY_MODAL_PROVIDERS } from './modules/modal';
import { SKY_WAIT_PROVIDERS } from './modules/wait';
import { SkyAlertModule } from './modules/alert';
import { SkyAvatarModule } from './modules/avatar';
import { SkyActionButtonModule } from './modules/action-button';
import { SkyCardModule } from './modules/card';
import { SkyCheckboxModule } from './modules/checkbox';
import { SkyChevronModule } from './modules/chevron';
import { SkyDefinitionListModule } from './modules/definition-list';
import { SkyDropdownModule } from './modules/dropdown';
import { SkyFileAttachmentsModule } from './modules/fileattachments';
import { SkyGridModule } from './modules/grid';
import { SkyKeyInfoModule } from './modules/key-info';
import { SkyLabelModule } from './modules/label';
import { SkyListModule } from './modules/list';
import { SkyListPagingModule } from './modules/list-paging';
import { SkyListViewGridModule } from './modules/list-view-grid';
import { SkyMediaQueryModule } from './modules/media-queries';
import { SkyModalModule } from './modules/modal';
import { SkyNavbarModule } from './modules/navbar';
import { SkyPageSummaryModule } from './modules/page-summary';
import { SkyPagingModule } from './modules/paging';
import { SkyRadioModule } from './modules/radio';
import { SkyRepeaterModule } from './modules/repeater';
import { SkySearchModule } from './modules/search';
import { SkyTabsModule } from './modules/tabs';
import { SkyTilesModule } from './modules/tiles';
import { SkyWaitModule } from './modules/wait';

@NgModule({
  exports: [
    SkyAlertModule,
    SkyAvatarModule,
    SkyActionButtonModule,
    SkyCardModule,
    SkyCheckboxModule,
    SkyChevronModule,
    SkyDefinitionListModule,
    SkyDropdownModule,
    SkyFileAttachmentsModule,
    SkyGridModule,
    SkyKeyInfoModule,
    SkyLabelModule,
    SkyListModule,
    SkyListPagingModule,
    SkyListViewGridModule,
    SkyMediaQueryModule,
    SkyModalModule,
    SkyNavbarModule,
    SkyPageSummaryModule,
    SkyPagingModule,
    SkyRadioModule,
    SkyRepeaterModule,
    SkySearchModule,
    SkyTabsModule,
    SkyTilesModule,
    SkyWaitModule
  ]
})
export class SkyModule { }

export * from './modules/alert';
export * from './modules/avatar';
export * from './modules/action-button';
export * from './modules/card';
export * from './modules/checkbox';
export * from './modules/definition-list';
export * from './modules/dropdown';
export * from './modules/fileattachments';
export * from './modules/format';
export * from './modules/grid';
export * from './modules/key-info';
export * from './modules/label';
export * from './modules/list';
export * from './modules/list/state';
export * from './modules/list-paging';
export * from './modules/list-view-grid';
export * from './modules/modal';
export * from './modules/media-queries';
export * from './modules/navbar';
export * from './modules/page-summary';
export * from './modules/paging';
export * from './modules/radio';
export * from './modules/repeater';
export * from './modules/search';
export * from './modules/tabs';
export * from './modules/tiles';
export * from './modules/wait';

export const SKY_PROVIDERS: any[] = [
  ...SKY_MODAL_PROVIDERS, SKY_WAIT_PROVIDERS
];
