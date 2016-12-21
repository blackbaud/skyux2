import { NgModule } from '@angular/core';

import { SKY_MODAL_PROVIDERS } from './modules/modal';
import { SkyAlertModule } from './modules/alert';
import { SkyAvatarModule } from './modules/avatar';
import { SkyCardModule } from './modules/card';
import { SkyCheckboxModule } from './modules/checkbox';
import { SkyChevronModule } from './modules/chevron';
import { SkyDropdownModule } from './modules/dropdown';
import { SkyFileAttachmentsModule } from './modules/fileattachments';
import { SkyKeyInfoModule } from './modules/key-info';
import { SkyLabelModule } from './modules/label';
import { SkyModalModule } from './modules/modal';
import { SkyNavbarModule } from './modules/navbar';
import { SkyPageSummaryModule } from './modules/page-summary';
import { SkyRadioModule } from './modules/radio';
import { SkyRepeaterModule } from './modules/repeater';
import { SkyTabsModule } from './modules/tabs';
import { SkyTilesModule } from './modules/tiles';
import { SkyListModule } from './modules/list';
import { SkyListFiltersModule } from './modules/list-filters';
import { SkyListPagingModule } from './modules/list-paging';
import { SkyListToolbarModule } from './modules/list-toolbar';
import { SkyListActionBarModule } from './modules/list-action-bar';
import { SkyListViewChecklistModule } from './modules/list-view-checklist';
import { SkyListViewGridModule } from './modules/list-view-grid';
import { SkyListViewRepeaterModule } from './modules/list-view-repeater';
import { SkySpinnerModule } from './modules/spinner';

@NgModule({
  exports: [
    SkyAlertModule,
    SkyAvatarModule,
    SkyCardModule,
    SkyCheckboxModule,
    SkyChevronModule,
    SkyDropdownModule,
    SkyFileAttachmentsModule,
    SkyKeyInfoModule,
    SkyLabelModule,
    SkyModalModule,
    SkyNavbarModule,
    SkyPageSummaryModule,
    SkyRadioModule,
    SkyRepeaterModule,
    SkyTabsModule,
    SkyTilesModule,
    SkyListModule,
    SkyListFiltersModule,
    SkyListPagingModule,
    SkyListToolbarModule,
    SkyListActionBarModule,
    SkyListViewChecklistModule,
    SkyListViewGridModule,
    SkyListViewRepeaterModule,
    SkySpinnerModule
  ]
})
export class SkyModule { }

export * from './modules/alert';
export * from './modules/avatar';
export * from './modules/card';
export * from './modules/checkbox';
export * from './modules/dropdown';
export * from './modules/fileattachments';
export * from './modules/key-info';
export * from './modules/label';
export * from './modules/modal';
export * from './modules/navbar';
export * from './modules/page-summary';
export * from './modules/radio';
export * from './modules/repeater';
export * from './modules/tabs';
export * from './modules/tiles';
export * from './modules/format';
export * from './modules/list';
export * from './modules/list-filters';
export * from './modules/list-paging';
export * from './modules/list-toolbar';
export * from './modules/list-action-bar';
export * from './modules/list-view-checklist';
export * from './modules/list-view-grid';
export * from './modules/list-view-repeater';
export * from './modules/spinner';
export * from './modules/list-data-provider-in-memory';

export const SKY_PROVIDERS: any[] = [
  ...SKY_MODAL_PROVIDERS
];
