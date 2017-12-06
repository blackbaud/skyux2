import { NgModule } from '@angular/core';

// Element matches polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;
}

import { SKY_MODAL_PROVIDERS } from './modules/modal';
import { SKY_WAIT_PROVIDERS } from './modules/wait';

import { SkyAlertModule } from './modules/alert';
import { SkyNumericModule } from './modules/numeric';
import { SkyAvatarModule } from './modules/avatar';
import { SkyActionButtonModule } from './modules/action-button';
import { SkyCardModule } from './modules/card';
import { SkyCheckboxModule } from './modules/checkbox';
import { SkyChevronModule } from './modules/chevron';
import { SkyColorpickerModule } from './modules/colorpicker';
import { SkyColumnSelectorModule } from './modules/column-selector';
import { SkyConfirmationDialogModule } from './modules/confirmation-dialog';
import { SkyDatepickerModule } from './modules/datepicker';
import { SkyDefinitionListModule } from './modules/definition-list';
import { SkyDropdownModule } from './modules/dropdown';
import { SkyEmailValidationModule } from './modules/email-validation';
import { SkyErrorModule } from './modules/error';
import { SkyFileAttachmentsModule } from './modules/fileattachments';
import { SkyFilterModule } from './modules/filter';
import { SkyFluidGridModule } from './modules/fluid-grid/fluid-grid.module';
import { SkyGridModule } from './modules/grid';
import { SkyHelpInlineModule } from './modules/help-inline';
import { SkyKeyInfoModule } from './modules/key-info';
import { SkyLabelModule } from './modules/label';
import { SkyLinkRecordsModule } from './modules/link-records';
import { SkyListColumnSelectorActionModule } from './modules/list-column-selector-action';
import { SkyListFiltersModule } from './modules/list-filters';
import { SkyListModule } from './modules/list';
import { SkyListPagingModule } from './modules/list-paging';
import { SkyListSecondaryActionsModule } from './modules/list-secondary-actions';
import { SkyListToolbarModule } from './modules/list-toolbar';
import { SkyListViewChecklistModule } from './modules/list-view-checklist';
import { SkyListViewGridModule } from './modules/list-view-grid';
import { SkyMediaQueryModule } from './modules/media-queries';
import { SkyModalModule } from './modules/modal';
import { SkyNavbarModule } from './modules/navbar';
import { SkyPageSummaryModule } from './modules/page-summary';
import { SkyPagingModule } from './modules/paging';
import { SkyPopoverModule } from './modules/popover';
import { SkyRadioModule } from './modules/radio';
import { SkyRepeaterModule } from './modules/repeater';
import { SkySearchModule } from './modules/search';
import { SkySectionedFormModule } from './modules/sectioned-form';
import { SkySortModule } from './modules/sort';
import { SkyTabsModule } from './modules/tabs';
import { SkyTextExpandModule } from './modules/text-expand';
import { SkyTextExpandRepeaterModule } from './modules/text-expand-repeater';
import { SkyTextHighlightModule } from './modules/text-highlight';
import { SkyToolbarModule } from './modules/toolbar';
import { SkyTilesModule } from './modules/tiles';
import { SkyTimepickerModule } from './modules/timepicker';
import { SkyUrlValidationModule } from './modules/url-validation';
import { SkyVerticalTabsetModule } from './modules/vertical-tabset';
import { SkyWaitModule } from './modules/wait';

@NgModule({
  exports: [
    SkyAlertModule,
    SkyNumericModule,
    SkyAvatarModule,
    SkyActionButtonModule,
    SkyCardModule,
    SkyCheckboxModule,
    SkyChevronModule,
    SkyColorpickerModule,
    SkyColumnSelectorModule,
    SkyConfirmationDialogModule,
    SkyDefinitionListModule,
    SkyDropdownModule,
    SkyEmailValidationModule,
    SkyErrorModule,
    SkyFileAttachmentsModule,
    SkyFilterModule,
    SkyFluidGridModule,
    SkyGridModule,
    SkyHelpInlineModule,
    SkyKeyInfoModule,
    SkyLabelModule,
    SkyLinkRecordsModule,
    SkyListColumnSelectorActionModule,
    SkyListFiltersModule,
    SkyListModule,
    SkyListPagingModule,
    SkyListSecondaryActionsModule,
    SkyListToolbarModule,
    SkyListViewChecklistModule,
    SkyListViewGridModule,
    SkyMediaQueryModule,
    SkyModalModule,
    SkyNavbarModule,
    SkyPageSummaryModule,
    SkyPagingModule,
    SkyPopoverModule,
    SkyRadioModule,
    SkyRepeaterModule,
    SkySearchModule,
    SkySectionedFormModule,
    SkySortModule,
    SkyTabsModule,
    SkyTextExpandModule,
    SkyTextExpandRepeaterModule,
    SkyTextHighlightModule,
    SkyTilesModule,
    SkyTimepickerModule,
    SkyToolbarModule,
    SkyUrlValidationModule,
    SkyVerticalTabsetModule,
    SkyWaitModule,
    SkyDatepickerModule
  ]
})
export class SkyModule { }

export * from './modules/alert';
export * from './modules/numeric';
export * from './modules/avatar';
export * from './modules/action-button';
export * from './modules/card';
export * from './modules/checkbox';
export * from './modules/colorpicker';
export * from './modules/column-selector';
export * from './modules/confirmation-dialog';
export * from './modules/datepicker';
export * from './modules/definition-list';
export * from './modules/dropdown';
export * from './modules/email-validation';
export * from './modules/error';
export * from './modules/fileattachments';
export * from './modules/filter';
export * from './modules/fluid-grid';
export * from './modules/format';
export * from './modules/grid';
export * from './modules/help-inline';
export * from './modules/key-info';
export * from './modules/label';
export * from './modules/link-records';
export * from './modules/list-column-selector-action';
export * from './modules/list';
export * from './modules/list/state';
export * from './modules/list-filters';
export * from './modules/list-paging';
export * from './modules/list-secondary-actions';
export * from './modules/list-toolbar';
export * from './modules/list-view-checklist';
export * from './modules/list-view-grid';
export * from './modules/modal';
export * from './modules/media-queries';
export * from './modules/navbar';
export * from './modules/page-summary';
export * from './modules/paging';
export * from './modules/popover';
export * from './modules/radio';
export * from './modules/repeater';
export * from './modules/search';
export * from './modules/sectioned-form';
export * from './modules/sort';
export * from './modules/tabs';
export * from './modules/text-expand';
export * from './modules/text-expand-repeater';
export * from './modules/text-highlight';
export * from './modules/tiles';
export * from './modules/timepicker';
export * from './modules/toolbar';
export * from './modules/url-validation';
export * from './modules/vertical-tabset';
export * from './modules/wait';

export const SKY_PROVIDERS: any[] = [
  ...SKY_MODAL_PROVIDERS,
  SKY_WAIT_PROVIDERS
];
