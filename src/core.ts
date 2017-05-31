import { NgModule } from '@angular/core';

import { SKY_MODAL_PROVIDERS } from './modules/modal';
import { SKY_WAIT_PROVIDERS } from './modules/wait';
import { SkyAlertModule } from './modules/alert';
import { SkyAvatarModule } from './modules/avatar';
import { SkyActionButtonModule } from './modules/action-button';
import { SkyCardModule } from './modules/card';
import { SkyCheckboxModule } from './modules/checkbox';
import { SkyChevronModule } from './modules/chevron';
import { SkyColumnSelectorModule } from './modules/column-selector';
import { SkyDatepickerModule } from './modules/datepicker';
import { SkyDefinitionListModule } from './modules/definition-list';
import { SkyDropdownModule } from './modules/dropdown';
import { SkyErrorModule } from './modules/error';
import { SkyFileAttachmentsModule } from './modules/fileattachments';
import { SkyFilterModule } from './modules/filter';
import { SkyGridModule } from './modules/grid';
import { SkyKeyInfoModule } from './modules/key-info';
import { SkyLabelModule } from './modules/label';
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
import { SkyRadioModule } from './modules/radio';
import { SkyRepeaterModule } from './modules/repeater';
import { SkySearchModule } from './modules/search';
import { SkySortModule } from './modules/sort';
import { SkyTabsModule } from './modules/tabs';
import { SkyTextExpandModule } from './modules/text-expand';
import { SkyTextExpandRepeaterModule } from './modules/text-expand-repeater';
import { SkyToolbarModule } from './modules/toolbar';
import { SkyTilesModule } from './modules/tiles';
import { SkyTimepickerModule } from './modules/timepicker';
import { SkyWaitModule } from './modules/wait';

@NgModule({
  exports: [
    SkyAlertModule,
    SkyAvatarModule,
    SkyActionButtonModule,
    SkyCardModule,
    SkyCheckboxModule,
    SkyChevronModule,
    SkyColumnSelectorModule,
    SkyDefinitionListModule,
    SkyDropdownModule,
    SkyErrorModule,
    SkyFileAttachmentsModule,
    SkyFilterModule,
    SkyGridModule,
    SkyKeyInfoModule,
    SkyLabelModule,
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
    SkyRadioModule,
    SkyRepeaterModule,
    SkySearchModule,
    SkySortModule,
    SkyTabsModule,
    SkyTextExpandModule,
    SkyTextExpandRepeaterModule,
    SkyTilesModule,
    SkyTimepickerModule,
    SkyToolbarModule,
    SkyWaitModule,
    SkyDatepickerModule
  ]
})
export class SkyModule { }

export {
  SkyAlertComponent,
  SkyAlertModule
} from './modules/alert';
export {
  SkyAvatarComponent,
  SkyAvatarInnerComponent,
  SkyAvatarModule,
  SkyAvatarSrc
} from './modules/avatar';
export {
  SkyActionButtonComponent,
  SkyActionButtonDetailsComponent,
  SkyActionButtonHeaderComponent,
  SkyActionButtonIconComponent,
  SkyActionButtonModule
} from './modules/action-button';
export {
  SkyCardComponent,
  SkyCardModule
} from './modules/card';
export {
  SkyCheckboxComponent,
  SkyCheckboxModule
} from './modules/checkbox';
export {
  SkyColumnSelectorComponent,
  SkyColumnSelectorContext,
  SkyColumnSelectorModule,
  SkyColumnSelectorModel
} from './modules/column-selector';
export {
  SkyDateFormatter,
  SkyDatepickerCalendarComponent,
  SkyDatepickerCalendarInnerComponent,
  SkyDatepickerConfigService,
  SkyDatepickerModule,
  SkyDayPickerComponent,
  SkyMonthPickerComponent,
  SkyYearPickerComponent,
  SkyDatepickerComponent,
  SkyDatepickerInputDirective
} from './modules/datepicker';
export {
  SkyDefinitionListComponent,
  SkyDefinitionListContentComponent,
  SkyDefinitionListHeadingComponent,
  SkyDefinitionListLabelComponent,
  SkyDefinitionListModule,
  SkyDefinitionListValueComponent
} from './modules/definition-list';
export {
  SkyDropdownComponent,
  SkyDropdownItemComponent,
  SkyDropdownMenuComponent,
  SkyDropdownModule
} from './modules/dropdown';
export {
  SkyErrorComponent,
  SkyErrorDescriptionComponent,
  SkyErrorImageComponent,
  SkyErrorModule,
  SkyErrorTitleComponent,
  SkyErrorModalService
} from './modules/error';
export {
  SkyFileAttachmentsModule,
  SkyFileDropChange,
  SkyFileDropComponent,
  SkyFileItem,
  SkyFileItemComponent,
  SkyFileLink,
  SkyFileSizePipe
} from './modules/fileattachments';
export {
  SkyFilterButtonComponent,
  SkyFilterInlineComponent,
  SkyFilterInlineItemComponent,
  SkyFilterModule,
  SkyFilterSummaryComponent,
  SkyFilterSummaryItemComponent
} from './modules/filter';
export {
  SkyFormat
} from './modules/format';
export {
  SkyGridCellComponent,
  SkyGridColumnComponent,
  SkyGridColumnModel,
  SkyGridComponent,
  SkyGridModule
} from './modules/grid';
export {
  SkyKeyInfoComponent,
  SkyKeyInfoLabelComponent,
  SkyKeyInfoModule,
  SkyKeyInfoValueComponent
} from './modules/key-info';
export {
  SkyLabelComponent,
  SkyLabelModule
} from './modules/label';
export {
  SkyListColumnSelectorActionComponent,
  SkyListColumnSelectorActionModule
} from './modules/list-column-selector-action';
export {
  SkyListComponent,
  SkyListModule,
  ListViewComponent,
  ListDataProvider,
  ListDataRequestModel,
  ListDataResponseModel
} from './modules/list';
export {
  ListFilterModel,
  ListFiltersUpdateAction,
  ListItemModel,
  ListItemsLoadAction,
  ListPagingModel,
  ListPagingSetItemsPerPageAction,
  ListPagingSetMaxPagesAction,
  ListPagingSetPageNumberAction,
  ListSearchModel,
  ListSearchSetFieldSelectorsAction,
  ListSearchSetFunctionsAction,
  ListSearchSetSearchTextAction,
  ListSelectedLoadAction,
  ListSelectedModel,
  ListSelectedSetItemsSelectedAction,
  ListSelectedSetItemSelectedAction,
  ListSelectedSetLoadingAction,
  ListSortFieldSelectorModel,
  ListSortLabelModel,
  ListSortModel,
  ListSortSetAvailableAction,
  ListSortSetFieldSelectorsAction,
  ListSortSetGlobalAction,
  ListState,
  ListStateDispatcher,
  ListStateModel,
  ListStateOrchestrator,
  ListToolbarItemModel,
  ListToolbarItemsLoadAction,
  ListToolbarModel,
  ListToolbarSetExistsAction,
  ListToolbarSetTypeAction,
  ListViewModel,
  ListViewsLoadAction,
  ListViewsModel,
  ListViewsSetActiveAction
} from './modules/list/state';
export {
  SkyListFilterButtonComponent,
  SkyListFilterInlineComponent,
  SkyListFilterInlineItemComponent,
  SkyListFiltersModule,
  SkyListFilterSummaryComponent
} from './modules/list-filters';
export {
  SkyListPagingComponent,
  SkyListPagingModule
} from './modules/list-paging';
export {
  SkyListSecondaryActionComponent,
  SkyListSecondaryActionsComponent,
  SkyListSecondaryActionsModule
} from './modules/list-secondary-actions';
export {
  SkyListToolbarComponent,
  SkyListToolbarItemComponent,
  SkyListToolbarItemRendererComponent,
  SkyListToolbarModule,
  SkyListToolbarSortComponent
} from './modules/list-toolbar';
export {
  SkyListViewChecklistComponent,
  SkyListViewChecklistItemComponent,
  SkyListViewChecklistModule
} from './modules/list-view-checklist';
export {
  SkyListViewGridComponent,
  SkyListViewGridModule
} from './modules/list-view-grid';
export {
  SkyModalCloseArgs,
  SkyModalComponent,
  SkyModalConfiguration,
  SkyModalHostService,
  SkyModalInstance,
  SkyModalModule,
  SkyModalService
} from './modules/modal';
export {
  SkyMediaBreakpoints,
  SkyMediaQueryListener,
  SkyMediaQueryModule,
  SkyMediaQueryService
} from './modules/media-queries';
export {
  SkyNavbarComponent,
  SkyNavbarItemComponent,
  SkyNavbarModule
} from './modules/navbar';
export {
  SkyPageSummaryAlertComponent,
  SkyPageSummaryComponent,
  SkyPageSummaryContentComponent,
  SkyPageSummaryImageComponent,
  SkyPageSummaryKeyInfoComponent,
  SkyPageSummaryModule,
  SkyPageSummaryStatusComponent,
  SkyPageSummarySubtitleComponent,
  SkyPageSummaryTitleComponent
} from './modules/page-summary';
export {
  SkyPagingComponent,
  SkyPagingModule
} from './modules/paging';
export {
  SkyRadioComponent,
  SkyRadioModule
} from './modules/radio';
export {
  SkyRepeaterComponent,
  SkyRepeaterItemComponent,
  SkyRepeaterModule
} from './modules/repeater';
export {
  SkySearchComponent,
  SkySearchModule
} from './modules/search';
export {
  SkySortComponent,
  SkySortItemComponent,
  SkySortModule
} from './modules/sort';
export {
  SkyTabComponent,
  SkyTabsModule,
  SkyTabsetComponent,
  SkyTabsetNavButtonComponent
} from './modules/tabs';
export {
  SkyTextExpandComponent,
  SkyTextExpandModalComponent,
  SkyTextExpandModalContext,
  SkyTextExpandModule
} from './modules/text-expand';
export {
  SkyTextExpandRepeaterComponent,
  SkyTextExpandRepeaterModule
} from './modules/text-expand-repeater';
export {
  SkyTileComponent,
  SkyTileContentModule,
  SkyTileContentSectionComponent,
  SkyTileDashboardColumnComponent,
  SkyTileDashboardColumnModule,
  SkyTileDashboardComponent,
  SkyTileDashboardConfig,
  SkyTileDashboardConfigLayout,
  SkyTileDashboardConfigLayoutColumn,
  SkyTileDashboardConfigLayoutTile,
  SkyTileDashboardConfigTile,
  SkyTileDashboardModule,
  SkyTileDashboardService,
  SkyTileModule,
  SkyTilesModule
} from './modules/tiles';
export {
  SkyTimepickerComponent
} from './modules/timepicker';
export {
  SkyToolbarComponent,
  SkyToolbarItemComponent,
  SkyToolbarModule,
  SkyToolbarSectionComponent
} from './modules/toolbar';
export {
  SkyWaitComponent,
  SkyWaitModule,
  SKY_WAIT_PROVIDERS,
  SkyWaitService
} from './modules/wait';

export const SKY_PROVIDERS: any[] = [
  ...SKY_MODAL_PROVIDERS, SKY_WAIT_PROVIDERS
];
