import { Injectable } from '@angular/core';

import {
  SkyActionButtonDemoComponent,
  SkyAlertDemoComponent,
  SkyAutocompleteDemoComponent,
  SkyAvatarDemoComponent,
  SkyCardDemoComponent,
  SkyCheckboxDemoComponent,
  SkyColorpickerDemoComponent,
  SkyConfirmDemoComponent,
  SkyDatepickerDemoComponent,
  SkyDefinitionListDemoComponent,
  SkyDropdownDemoComponent,
  SkyEmailValidationDemoComponent,
  SkyErrorDemoComponent,
  SkyFileAttachmentDemoComponent,
  SkyFilterDemoComponent,
  SkyFilterInlineDemoComponent,
  SkyFluidGridDemoComponent,
  SkyFlyoutDemoComponent,
  SkyGridDemoComponent,
  SkyHelpInlineDemoComponent,
  SkyKeyInfoDemoComponent,
  SkyLabelDemoComponent,
  SkyLinkRecordsDemoComponent,
  SkyListDemoComponent,
  SkyListFiltersDemoComponent,
  SkyListFiltersInlineDemoComponent,
  SkyListPagingDemoComponent,
  SkyListProviderDemoComponent,
  SkyListToolbarDemoComponent,
  SkyListToolbarCustomDemoComponent,
  SkyListViewChecklistDemoComponent,
  SkyListViewGridDemoComponent,
  SkyLookupDemoComponent,
  SkyMediaQueryDemoComponent,
  SkyModalDemoComponent,
  SkyNavbarDemoComponent,
  SkyNumericDemoComponent,
  SkyPageSummaryDemoComponent,
  SkyPagingDemoComponent,
  SkyPopoverDemoComponent,
  SkyRadioDemoComponent,
  SkyRepeaterDemoComponent,
  SkySearchDemoComponent,
  SkySectionedFormDemoComponent,
  SkySortDemoComponent,
  SkyTabsDemoComponent,
  SkyTextExpandDemoComponent,
  SkyTextHighlightDemoComponent,
  SkyTileDemoComponent,
  SkyTimepickerDemoComponent,
  SkyToastDemoComponent,
  SkyTokensDemoComponent,
  SkyToolbarDemoComponent,
  SkyUrlValidationDemoComponent,
  SkyVerticalTabsDemoComponent,
  SkyWaitDemoComponent,
  SkyWizardDemoComponent
} from './index';

/**
 * This service provides consumers with the raw file contents for each component demo.
 * The `componentName` and `bootstrapSelector` properties allow the consumer to dynamically
 * generate the demo when needed. For example:
 *
 * `import { componentName } from 'file location';
 * `template: '<bootstrap-selector></bootstrap-selector>'`
 *
 * Note: If the componentName is provided but the bootstrapSelector is omitted, it can be assumed that
 * the component is an entry component.
 */

@Injectable()
export class SkyDemoService {
  public components: any[] = [
    {
      name: 'Action button',
      component: SkyActionButtonDemoComponent,
      files: [
        {
          name: 'action-button-demo.component.html',
          fileContents: require('!!raw-loader!./action-button/action-button-demo.component.html')
        },
        {
          name: 'action-button-demo.component.ts',
          fileContents: require('!!raw-loader!./action-button/action-button-demo.component.ts'),
          componentName: 'SkyActionButtonDemoComponent',
          bootstrapSelector: 'sky-action-button-demo'
        }
      ]
    },
    {
      name: 'Alert',
      component: SkyAlertDemoComponent,
      files: [
        {
          name: 'alert-demo.component.html',
          fileContents: require('!!raw-loader!./alert/alert-demo.component.html')
        },
        {
          name: 'alert-demo.component.ts',
          fileContents: require('!!raw-loader!./alert/alert-demo.component.ts'),
          componentName: 'SkyAlertDemoComponent',
          bootstrapSelector: 'sky-alert-demo'
        }
      ]
    },
    {
      name: 'Autocomplete',
      component: SkyAutocompleteDemoComponent,
      files: [
        {
          name: 'autocomplete-demo.component.html',
          fileContents: require('!!raw-loader!./autocomplete/autocomplete-demo.component.html')
        },
        {
          name: 'autocomplete-demo.component.scss',
          fileContents: require('!!raw-loader!./autocomplete/autocomplete-demo.component.scss')
        },
        {
          name: 'autocomplete-demo.component.ts',
          fileContents: require('!!raw-loader!./autocomplete/autocomplete-demo.component.ts'),
          componentName: 'SkyAutocompleteDemoComponent',
          bootstrapSelector: 'sky-autocomplete-demo'
        }
      ]
    },
    {
      name: 'Avatar',
      component: SkyAvatarDemoComponent,
      files: [
        {
          name: 'avatar-demo.component.html',
          fileContents: require('!!raw-loader!./avatar/avatar-demo.component.html')
        },
        {
          name: 'avatar-demo.component.ts',
          fileContents: require('!!raw-loader!./avatar/avatar-demo.component.ts'),
          componentName: 'SkyAvatarDemoComponent',
          bootstrapSelector: 'sky-avatar-demo'
        }
      ]
    },
    {
      name: 'Card',
      component: SkyCardDemoComponent,
      files: [
        {
          name: 'card-demo.component.html',
          fileContents: require('!!raw-loader!./card/card-demo.component.html')
        },
        {
          name: 'card-demo.component.ts',
          fileContents: require('!!raw-loader!./card/card-demo.component.ts'),
          componentName: 'SkyCardDemoComponent',
          bootstrapSelector: 'sky-card-demo'
        }
      ]
    },
    {
      name: 'Checkbox',
      component: SkyCheckboxDemoComponent,
      files: [
        {
          name: 'checkbox-demo.component.html',
          fileContents: require('!!raw-loader!./checkbox/checkbox-demo.component.html')
        },
        {
          name: 'checkbox-demo.component.ts',
          fileContents: require('!!raw-loader!./checkbox/checkbox-demo.component.ts'),
          componentName: 'SkyCheckboxDemoComponent',
          bootstrapSelector: 'sky-checkbox-demo'
        }
      ]
    },
    {
      name: 'Colorpicker',
      component: SkyColorpickerDemoComponent,
      files: [
        {
          name: 'colorpicker-demo.component.html',
          fileContents: require('!!raw-loader!./colorpicker/colorpicker-demo.component.html')
        },
        {
          name: 'colorpicker-demo.component.ts',
          fileContents: require('!!raw-loader!./colorpicker/colorpicker-demo.component.ts'),
          componentName: 'SkyColorpickerDemoComponent',
          bootstrapSelector: 'sky-colorpicker-demo'
        }
      ]
    },
    {
      name: 'Confirm',
      component: SkyConfirmDemoComponent,
      files: [
        {
          name: 'confirm-demo.component.html',
          fileContents: require('!!raw-loader!./confirm/confirm-demo.component.html')
        },
        {
          name: 'confirm-demo.component.ts',
          fileContents: require('!!raw-loader!./confirm/confirm-demo.component.ts'),
          componentName: 'SkyConfirmDemoComponent',
          bootstrapSelector: 'sky-confirm-demo'
        }
      ]
    },
    {
      name: 'Datepicker',
      component: SkyDatepickerDemoComponent,
      files: [
        {
          name: 'datepicker-demo.component.html',
          fileContents: require('!!raw-loader!./datepicker/datepicker-demo.component.html')
        },
        {
          name: 'datepicker-demo.component.ts',
          fileContents: require('!!raw-loader!./datepicker/datepicker-demo.component.ts'),
          componentName: 'SkyDatepickerDemoComponent',
          bootstrapSelector: 'sky-datepicker-demo'
        }
      ]
    },
    {
      name: 'Definition list',
      component: SkyDefinitionListDemoComponent,
      files: [
        {
          name: 'definition-list-demo.component.html',
          fileContents: require('!!raw-loader!./definition-list/definition-list-demo.component.html')
        },
        {
          name: 'definition-list-demo.component.ts',
          fileContents: require('!!raw-loader!./definition-list/definition-list-demo.component.ts'),
          componentName: 'SkyDefinitionListDemoComponent',
          bootstrapSelector: 'sky-definition-list-demo'
        }
      ]
    },
    {
      name: 'Dropdown',
      component: SkyDropdownDemoComponent,
      files: [
        {
          name: 'dropdown-demo.component.html',
          fileContents: require('!!raw-loader!./dropdown/dropdown-demo.component.html')
        },
        {
          name: 'dropdown-demo.component.ts',
          fileContents: require('!!raw-loader!./dropdown/dropdown-demo.component.ts'),
          componentName: 'SkyDropdownDemoComponent',
          bootstrapSelector: 'sky-dropdown-demo'
        }
      ]
    },
    {
      name: 'Email validation',
      component: SkyEmailValidationDemoComponent,
      files: [
        {
          name: 'email-validation-demo.component.html',
          fileContents: require('!!raw-loader!./email-validation/email-validation-demo.component.html')
        },
        {
          name: 'email-validation.component.ts',
          fileContents: require('!!raw-loader!./email-validation/email-validation-demo.component.ts'),
          componentName: 'SkyEmailValidationDemoComponent',
          bootstrapSelector: 'sky-email-validation-demo'
        }
      ]
    },
    {
      name: 'Error',
      component: SkyErrorDemoComponent,
      files: [
        {
          name: 'error-demo.component.html',
          fileContents: require('!!raw-loader!./error/error-demo.component.html')
        },
        {
          name: 'error-demo.component.scss',
          fileContents: require('!!raw-loader!./error/error-demo.component.scss')
        },
        {
          name: 'error-demo.component.ts',
          fileContents: require('!!raw-loader!./error/error-demo.component.ts'),
          componentName: 'SkyErrorDemoComponent',
          bootstrapSelector: 'sky-error-demo'
        }
      ]
    },
    {
      name: 'File attachment',
      component: SkyFileAttachmentDemoComponent,
      files: [
        {
          name: 'file-attachment-demo.component.html',
          fileContents: require('!!raw-loader!./file-attachment/file-attachment-demo.component.html')
        },
        {
          name: 'file-attachment-demo.component.ts',
          fileContents: require('!!raw-loader!./file-attachment/file-attachment-demo.component.ts'),
          componentName: 'SkyFileAttachmentDemoComponent',
          bootstrapSelector: 'sky-file-attachment-demo'
        }
      ]
    },
    {
      name: 'Filter',
      component: SkyFilterDemoComponent,
      files: [
        {
          name: 'filter-demo.component.html',
          fileContents: require('!!raw-loader!./filter/filter-demo.component.html')
        },
        {
          name: 'filter-demo.component.ts',
          fileContents: require('!!raw-loader!./filter/filter-demo.component.ts'),
          componentName: 'SkyFilterDemoComponent',
          bootstrapSelector: 'sky-filter-demo'
        },
        {
          name: 'filter-demo-modal.component.html',
          fileContents: require('!!raw-loader!./filter/filter-demo-modal.component.html')
        },
        {
          name: 'filter-demo-modal.component.ts',
          fileContents: require('!!raw-loader!./filter/filter-demo-modal.component.ts'),
          componentName: 'SkyFilterDemoModalComponent'
        },
        {
          name: 'filter-demo-modal-context.ts',
          fileContents: require('!!raw-loader!./filter/filter-demo-modal-context.ts')
        }
      ]
    },
    {
      name: 'Filter inline',
      component: SkyFilterInlineDemoComponent,
      files: [
        {
          name: 'filter-inline-demo.component.html',
          fileContents: require('!!raw-loader!./filter/filter-inline-demo.component.html')
        },
        {
          name: 'filter-inline-demo.component.ts',
          fileContents: require('!!raw-loader!./filter/filter-inline-demo.component.ts'),
          componentName: 'SkyFilterInlineDemoComponent',
          bootstrapSelector: 'sky-filter-inline-demo'
        }
      ]
    },
    {
      name: 'Fluid grid',
      component: SkyFluidGridDemoComponent,
      files: [
        {
          name: 'fluid-grid-demo.component.html',
          fileContents: require('!!raw-loader!./fluid-grid/fluid-grid-demo.component.html')
        },
        {
          name: 'fluid-grid-demo.component.ts',
          fileContents: require('!!raw-loader!./fluid-grid/fluid-grid-demo.component.ts'),
          componentName: 'SkyFluidGridDemoComponent',
          bootstrapSelector: 'sky-fluid-grid-demo'
        }
      ]
    },
    {
      name: 'Flyout',
      component: SkyFlyoutDemoComponent,
      files: [
        {
          name: 'flyout-demo.component.html',
          fileContents: require('!!raw-loader!./flyout/flyout-demo.component.html')
        },
        {
          name: 'flyout-demo.component.ts',
          fileContents: require('!!raw-loader!./flyout/flyout-demo.component.ts'),
          componentName: 'SkyFlyoutDemoComponent',
          bootstrapSelector: 'sky-flyout-demo'
        },
        {
          name: 'flyout-demo-internal.component.html',
          fileContents: require('!!raw-loader!./flyout/flyout-demo-internal.component.html')
        },
        {
          name: 'flyout-demo-internal.component.ts',
          fileContents: require('!!raw-loader!./flyout/flyout-demo-internal.component.ts'),
          componentName: 'SkyFlyoutDemoInternalComponent'
        }
      ]
    },
    {
      name: 'Grid',
      component: SkyGridDemoComponent,
      files: [
        {
          name: 'grid-demo.component.html',
          fileContents: require('!!raw-loader!./grid/grid-demo.component.html')
        },
        {
          name: 'grid-demo.component.ts',
          fileContents: require('!!raw-loader!./grid/grid-demo.component.ts'),
          componentName: 'SkyGridDemoComponent',
          bootstrapSelector: 'sky-grid-demo'
        }
      ]
    },
    {
      name: 'Help inline',
      component: SkyHelpInlineDemoComponent,
      files: [
        {
          name: 'help-inline-demo.component.html',
          fileContents: require('!!raw-loader!./help-inline/help-inline-demo.component.html')
        },
        {
          name: 'help-inline-demo.component.ts',
          fileContents: require('!!raw-loader!./help-inline/help-inline-demo.component.ts'),
          componentName: 'SkyHelpInlineDemoComponent',
          bootstrapSelector: 'sky-help-inline-demo'
        }
      ]
    },
    {
      name: 'Key info',
      component: SkyKeyInfoDemoComponent,
      files: [
        {
          name: 'key-info-demo.component.html',
          fileContents: require('!!raw-loader!./key-info/key-info-demo.component.html')
        },
        {
          name: 'key-info-demo.component.ts',
          fileContents: require('!!raw-loader!./key-info/key-info-demo.component.ts'),
          componentName: 'SkyKeyInfoDemoComponent',
          bootstrapSelector: 'sky-key-info-demo'
        }
      ]
    },
    {
      name: 'Label',
      component: SkyLabelDemoComponent,
      files: [
        {
          name: 'label-demo.component.html',
          fileContents: require('!!raw-loader!./label/label-demo.component.html')
        },
        {
          name: 'label-demo.component.ts',
          fileContents: require('!!raw-loader!./label/label-demo.component.ts'),
          componentName: 'SkyLabelDemoComponent',
          bootstrapSelector: 'sky-label-demo'
        }
      ]
    },
    {
      name: 'Link records',
      component: SkyLinkRecordsDemoComponent,
      files: [
        {
          name: 'link-records-demo.component.html',
          fileContents: require('!!raw-loader!./link-records/link-records-demo.component.html')
        },
        {
          name: 'link-records-demo.component.ts',
          fileContents: require('!!raw-loader!./link-records/link-records-demo.component.ts'),
          componentName: 'SkyLinkRecordsDemoComponent',
          bootstrapSelector: 'sky-link-records-demo'
        }
      ]
    },
    {
      name: 'List',
      component: SkyListDemoComponent,
      files: [
        {
          name: 'list-demo.component.html',
          fileContents: require('!!raw-loader!./list/list-demo.component.html')
        },
        {
          name: 'list-demo.component.ts',
          fileContents: require('!!raw-loader!./list/list-demo.component.ts'),
          componentName: 'SkyListDemoComponent',
          bootstrapSelector: 'sky-list-demo'
        }
      ]
    },
    {
      name: 'List filters',
      component: SkyListFiltersDemoComponent,
      files: [
        {
          name: 'list-filters-demo.component.html',
          fileContents: require('!!raw-loader!./list-filters/list-filters-demo.component.html')
        },
        {
          name: 'list-filters-demo.component.ts',
          fileContents: require('!!raw-loader!./list-filters/list-filters-demo.component.ts'),
          componentName: 'SkyListFiltersDemoComponent',
          bootstrapSelector: 'sky-list-filters-demo'
        },
        {
          name: 'list-filters-demo-modal.component.html',
          fileContents: require('!!raw-loader!./list-filters/list-filters-demo-modal.component.html')
        },
        {
          name: 'list-filters-demo-modal.component.ts',
          fileContents: require('!!raw-loader!./list-filters/list-filters-demo-modal.component.ts'),
          componentName: 'SkyListFiltersModalDemoComponent'
        },
        {
          name: 'list-filters-demo-modal-context.ts',
          fileContents: require('!!raw-loader!./list-filters/list-filters-demo-modal-context.ts')
        }
      ]
    },
    {
      name: 'List filters inline',
      component: SkyListFiltersInlineDemoComponent,
      files: [
        {
          name: 'list-filters-inline-demo.component.html',
          fileContents: require('!!raw-loader!./list-filters/list-filters-inline-demo.component.html')
        },
        {
          name: 'list-filters-inline-demo.component.ts',
          fileContents: require('!!raw-loader!./list-filters/list-filters-inline-demo.component.ts'),
          componentName: 'SkyListFiltersInlineDemoComponent',
          bootstrapSelector: 'sky-list-filters-inline-demo'
        }
      ]
    },
    {
      name: 'List paging',
      component: SkyListPagingDemoComponent,
      files: [
        {
          name: 'list-paging-demo.component.html',
          fileContents: require('!!raw-loader!./list-paging/list-paging-demo.component.html')
        },
        {
          name: 'list-paging-demo.component.ts',
          fileContents: require('!!raw-loader!./list-paging/list-paging-demo.component.ts'),
          componentName: 'SkyListPagingDemoComponent',
          bootstrapSelector: 'sky-list-paging-demo'
        }
      ]
    },
    {
      name: 'List provider',
      component: SkyListProviderDemoComponent,
      files: [
        {
          name: 'list-provider-demo.component.html',
          fileContents: require('!!raw-loader!./list/list-provider-demo.component.html')
        },
        {
          name: 'list-provider-demo.component.ts',
          fileContents: require('!!raw-loader!./list/list-provider-demo.component.ts'),
          componentName: 'SkyListProviderDemoComponent',
          bootstrapSelector: 'sky-list-provider-demo'
        }
      ]
    },
    {
      name: 'List toolbar',
      component: SkyListToolbarDemoComponent,
      files: [
        {
          name: 'list-toolbar-demo.component.html',
          fileContents: require('!!raw-loader!./list-toolbar/list-toolbar-demo.component.html')
        },
        {
          name: 'list-toolbar-demo.component.ts',
          fileContents: require('!!raw-loader!./list-toolbar/list-toolbar-demo.component.ts'),
          componentName: 'SkyListToolbarDemoComponent',
          bootstrapSelector: 'sky-list-toolbar-demo'
        }
      ]
    },
    {
      name: 'List toolbar custom',
      component: SkyListToolbarCustomDemoComponent,
      files: [
        {
          name: 'list-toolbar-custom-demo.component.html',
          fileContents: require('!!raw-loader!./list-toolbar/list-toolbar-custom-demo.component.html')
        },
        {
          name: 'list-toolbar-custom-demo.component.ts',
          fileContents: require('!!raw-loader!./list-toolbar/list-toolbar-custom-demo.component.ts'),
          componentName: 'SkyListToolbarCustomDemoComponent',
          bootstrapSelector: 'sky-list-toolbar-custom-demo'
        }
      ]
    },
    {
      name: 'List view checklist',
      component: SkyListViewChecklistDemoComponent,
      files: [
        {
          name: 'list-view-checklist-demo.component.html',
          fileContents: require('!!raw-loader!./list-view-checklist/list-view-checklist-demo.component.html')
        },
        {
          name: 'list-view-checklist-demo.component.ts',
          fileContents: require('!!raw-loader!./list-view-checklist/list-view-checklist-demo.component.ts'),
          componentName: 'SkyListViewChecklistDemoComponent',
          bootstrapSelector: 'sky-list-view-checklist-demo'
        }
      ]
    },
    {
      name: 'List view grid',
      component: SkyListViewGridDemoComponent,
      files: [
        {
          name: 'list-view-grid-demo.component.html',
          fileContents: require('!!raw-loader!./list-view-grid/list-view-grid-demo.component.html')
        },
        {
          name: 'list-view-grid-demo.component.ts',
          fileContents: require('!!raw-loader!./list-view-grid/list-view-grid-demo.component.ts'),
          componentName: 'SkyListViewGridDemoComponent',
          bootstrapSelector: 'sky-list-view-grid-demo'
        }
      ]
    },
    {
      name: 'Lookup',
      component: SkyLookupDemoComponent,
      files: [
        {
          name: 'lookup-demo.component.html',
          fileContents: require('!!raw-loader!./lookup/lookup-demo.component.html')
        },
        {
          name: 'lookup-demo.component.ts',
          fileContents: require('!!raw-loader!./lookup/lookup-demo.component.ts'),
          componentName: 'SkyLookupDemoComponent',
          bootstrapSelector: 'sky-lookup-demo'
        }
      ]
    },
    {
      name: 'Media query',
      component: SkyMediaQueryDemoComponent,
      files: [
        {
          name: 'media-query-demo.component.html',
          fileContents: require('!!raw-loader!./media-queries/media-query-demo.component.html')
        },
        {
          name: 'media-query-demo.component.ts',
          fileContents: require('!!raw-loader!./media-queries/media-query-demo.component.ts'),
          componentName: 'SkyMediaQueryDemoComponent',
          bootstrapSelector: 'sky-media-query-demo'
        }
      ]
    },
    {
      name: 'Modal',
      component: SkyModalDemoComponent,
      files: [
        {
          name: 'modal-demo.component.html',
          fileContents: require('!!raw-loader!./modal/modal-demo.component.html')
        },
        {
          name: 'modal-demo.component.ts',
          fileContents: require('!!raw-loader!./modal/modal-demo.component.ts'),
          componentName: 'SkyModalDemoComponent',
          bootstrapSelector: 'sky-modal-demo'
        },
        {
          name: 'modal-demo-form.component.html',
          fileContents: require('!!raw-loader!./modal/modal-demo-form.component.html')
        },
        {
          name: 'modal-demo-form.component.ts',
          fileContents: require('!!raw-loader!./modal/modal-demo-form.component.ts'),
          componentName: 'SkyModalDemoFormComponent'
        },
        {
          name: 'modal-demo-tiled-form.component.html',
          fileContents: require('!!raw-loader!./modal/modal-demo-tiled-form.component.html')
        },
        {
          name: 'modal-demo-tiled-form.component.ts',
          fileContents: require('!!raw-loader!./modal/modal-demo-tiled-form.component.ts'),
          componentName: 'SkyModalDemoTiledFormComponent'
        },
        {
          name: 'modal-demo-context.ts',
          fileContents: require('!!raw-loader!./modal/modal-demo-context.ts')
        }
      ]
    },
    {
      name: 'Navbar',
      component: SkyNavbarDemoComponent,
      files: [
        {
          name: 'navbar-demo.component.html',
          fileContents: require('!!raw-loader!./navbar/navbar-demo.component.html')
        },
        {
          name: 'navbar-demo.component.ts',
          fileContents: require('!!raw-loader!./navbar/navbar-demo.component.ts'),
          componentName: 'SkyNavbarDemoComponent',
          bootstrapSelector: 'sky-navbar-demo'
        }
      ]
    },
    {
      name: 'Numeric',
      component: SkyNumericDemoComponent,
      files: [
        {
          name: 'numeric-demo.component.html',
          fileContents: require('!!raw-loader!./numeric/numeric-demo.component.html')
        },
        {
          name: 'numeric-demo.component.ts',
          fileContents: require('!!raw-loader!./numeric/numeric-demo.component.ts'),
          componentName: 'SkyNumericDemoComponent',
          bootstrapSelector: 'sky-numeric-demo'
        }
      ]
    },
    {
      name: 'Page summary',
      component: SkyPageSummaryDemoComponent,
      files: [
        {
          name: 'page-summary-demo.component.html',
          fileContents: require('!!raw-loader!./page-summary/page-summary-demo.component.html')
        },
        {
          name: 'page-summary-demo.component.ts',
          fileContents: require('!!raw-loader!./page-summary/page-summary-demo.component.ts'),
          componentName: 'SkyPageSummaryDemoComponent',
          bootstrapSelector: 'sky-page-summary-demo'
        }
      ]
    },
    {
      name: 'Paging',
      component: SkyPagingDemoComponent,
      files: [
        {
          name: 'paging-demo.component.html',
          fileContents: require('!!raw-loader!./paging/paging-demo.component.html')
        },
        {
          name: 'paging-demo.component.ts',
          fileContents: require('!!raw-loader!./paging/paging-demo.component.ts'),
          componentName: 'SkyPagingDemoComponent',
          bootstrapSelector: 'sky-paging-demo'
        }
      ]
    },
    {
      name: 'Popover',
      component: SkyPopoverDemoComponent,
      files: [
        {
          name: 'popover-demo.component.html',
          fileContents: require('!!raw-loader!./popover/popover-demo.component.html')
        },
        {
          name: 'popover-demo.component.scss',
          fileContents: require('!!raw-loader!./popover/popover-demo.component.scss')
        },
        {
          name: 'popover-demo.component.ts',
          fileContents: require('!!raw-loader!./popover/popover-demo.component.ts'),
          componentName: 'SkyPopoverDemoComponent',
          bootstrapSelector: 'sky-popover-demo'
        }
      ]
    },
    {
      name: 'Radio',
      component: SkyRadioDemoComponent,
      files: [
        {
          name: 'radio-demo.component.html',
          fileContents: require('!!raw-loader!./radio/radio-demo.component.html')
        },
        {
          name: 'radio-demo.component.ts',
          fileContents: require('!!raw-loader!./radio/radio-demo.component.ts'),
          componentName: 'SkyRadioDemoComponent',
          bootstrapSelector: 'sky-radio-demo'
        }
      ]
    },
    {
      name: 'Repeater',
      component: SkyRepeaterDemoComponent,
      files: [
        {
          name: 'repeater-demo.component.html',
          fileContents: require('!!raw-loader!./repeater/repeater-demo.component.html')
        },
        {
          name: 'repeater-demo.component.ts',
          fileContents: require('!!raw-loader!./repeater/repeater-demo.component.ts'),
          componentName: 'SkyRepeaterDemoComponent',
          bootstrapSelector: 'sky-repeater-demo'
        }
      ]
    },
    {
      name: 'Search',
      component: SkySearchDemoComponent,
      files: [
        {
          name: 'search-demo.component.html',
          fileContents: require('!!raw-loader!./search/search-demo.component.html')
        },
        {
          name: 'search-demo.component.ts',
          fileContents: require('!!raw-loader!./search/search-demo.component.ts'),
          componentName: 'SkySearchDemoComponent',
          bootstrapSelector: 'sky-search-demo'
        }
      ]
    },
    {
      name: 'Sectioned form',
      component: SkySectionedFormDemoComponent,
      files: [
        {
          name: 'sectioned-form-demo.component.html',
          fileContents: require('!!raw-loader!./sectioned-form/sectioned-form-demo.component.html')
        },
        {
          name: 'sectioned-form-demo.component.ts',
          fileContents: require('!!raw-loader!./sectioned-form/sectioned-form-demo.component.ts'),
          componentName: 'SkySectionedFormDemoComponent',
          bootstrapSelector: 'sky-sectioned-form-demo'
        },
        {
          name: 'sectioned-modal-form-demo.component.html',
          fileContents: require('!!raw-loader!./sectioned-form/sectioned-modal-form-demo.component.html')
        },
        {
          name: 'sectioned-modal-form-demo.component.ts',
          fileContents: require('!!raw-loader!./sectioned-form/sectioned-modal-form-demo.component.ts')
        },
        {
          name: 'demo-address-form.component.html',
          fileContents: require('!!raw-loader!./sectioned-form/demo-address-form.component.html')
        },
        {
          name: 'demo-address-form.component.ts',
          fileContents: require('!!raw-loader!./sectioned-form/demo-address-form.component.ts'),
          componentName: 'SkyDemoAddressFormComponent'
        },
        {
          name: 'demo-information-form.component.html',
          fileContents: require('!!raw-loader!./sectioned-form/demo-information-form.component.html')
        },
        {
          name: 'demo-information-form.component.ts',
          fileContents: require('!!raw-loader!./sectioned-form/demo-information-form.component.ts'),
          componentName: 'SkyDemoInformationFormComponent'
        },
        {
          name: 'demo-phone-form.component.html',
          fileContents: require('!!raw-loader!./sectioned-form/demo-phone-form.component.html')
        },
        {
          name: 'demo-phone-form.component.ts',
          fileContents: require('!!raw-loader!./sectioned-form/demo-phone-form.component.ts'),
          componentName: 'SkyDemoPhoneFormComponent'
        }
      ]
    },
    {
      name: 'Sort',
      component: SkySortDemoComponent,
      files: [
        {
          name: 'sort-demo.component.html',
          fileContents: require('!!raw-loader!./sort/sort-demo.component.html')
        },
        {
          name: 'sort-demo.component.ts',
          fileContents: require('!!raw-loader!./sort/sort-demo.component.ts'),
          componentName: 'SkySortDemoComponent',
          bootstrapSelector: 'sky-sort-demo'
        }
      ]
    },
    {
      name: 'Tabs',
      component: SkyTabsDemoComponent,
      files: [
        {
          name: 'tabs-demo.component.html',
          fileContents: require('!!raw-loader!./tabs/tabs-demo.component.html')
        },
        {
          name: 'tabs-demo.component.ts',
          fileContents: require('!!raw-loader!./tabs/tabs-demo.component.ts'),
          componentName: 'SkyTabsDemoComponent',
          bootstrapSelector: 'sky-tabs-demo'
        }
      ]
    },
    {
      name: 'Text expand',
      component: SkyTextExpandDemoComponent,
      files: [
        {
          name: 'text-expand-demo.component.html',
          fileContents: require('!!raw-loader!./text-expand/text-expand-demo.component.html')
        },
        {
          name: 'tabs-demo.component.ts',
          fileContents: require('!!raw-loader!./text-expand/text-expand-demo.component.ts'),
          componentName: 'SkyTextExpandDemoComponent',
          bootstrapSelector: 'sky-text-expand-demo'
        }
      ]
    },
    {
      name: 'Text highlight',
      component: SkyTextHighlightDemoComponent,
      files: [
        {
          name: 'text-highlight-demo.component.html',
          fileContents: require('!!raw-loader!./text-highlight/text-highlight-demo.component.html')
        },
        {
          name: 'text-highlight-demo.component.ts',
          fileContents: require('!!raw-loader!./text-highlight/text-highlight-demo.component.ts'),
          componentName: 'SkyTextHighlightDemoComponent',
          bootstrapSelector: 'sky-text-highlight-demo'
        }
      ]
    },
    {
      name: 'Tile',
      component: SkyTileDemoComponent,
      files: [
        {
          name: 'tile-demo.component.html',
          fileContents: require('!!raw-loader!./tile/tile-demo.component.html')
        },
        {
          name: 'tile-demo.component.ts',
          fileContents: require('!!raw-loader!./tile/tile-demo.component.ts'),
          componentName: 'SkyTileDemoComponent',
          bootstrapSelector: 'sky-tile-demo'
        },
        {
          name: 'tile-demo-tile1.component.html',
          fileContents: require('!!raw-loader!./tile/tile-demo-tile1.component.html')
        },
        {
          name: 'tile-demo-tile1.component.ts',
          fileContents: require('!!raw-loader!./tile/tile-demo-tile1.component.ts'),
          componentName: 'SkyTileDemoTile1Component'
        },
        {
          name: 'tile-demo-tile2.component.html',
          fileContents: require('!!raw-loader!./tile/tile-demo-tile2.component.html')
        },
        {
          name: 'tile-demo-tile2.component.ts',
          fileContents: require('!!raw-loader!./tile/tile-demo-tile2.component.ts'),
          componentName: 'SkyTileDemoTile2Component'
        }
      ]
    },
    {
      name: 'Timepicker',
      component: SkyTimepickerDemoComponent,
      files: [
        {
          name: 'timepicker-demo.component.html',
          fileContents: require('!!raw-loader!./timepicker/timepicker-demo.component.html')
        },
        {
          name: 'timepicker-demo.component.ts',
          fileContents: require('!!raw-loader!./timepicker/timepicker-demo.component.ts'),
          componentName: 'SkyTimepickerDemoComponent',
          bootstrapSelector: 'sky-timepicker-demo'
        }
      ]
    },
    {
      name: 'Toast',
      component: SkyToastDemoComponent,
      files: [
        {
          name: 'toast-demo.component.html',
          fileContents: require('!!raw-loader!./toast/toast-demo.component.html')
        },
        {
          name: 'toast-demo.component.ts',
          fileContents: require('!!raw-loader!./toast/toast-demo.component.ts'),
          componentName: 'SkyToastDemoComponent',
          bootstrapSelector: 'sky-toast-demo'
        }
      ]
    },
    {
      name: 'Tokens',
      component: SkyTokensDemoComponent,
      files: [
        {
          name: 'tokens-demo.component.html',
          fileContents: require('!!raw-loader!./tokens/tokens-demo.component.html')
        },
        {
          name: 'tokens-demo.component.ts',
          fileContents: require('!!raw-loader!./tokens/tokens-demo.component.ts'),
          componentName: 'SkyTokensDemoComponent',
          bootstrapSelector: 'sky-tokens-demo'
        }
      ]
    },
    {
      name: 'Toolbar',
      component: SkyToolbarDemoComponent,
      files: [
        {
          name: 'toolbar-demo.component.html',
          fileContents: require('!!raw-loader!./toolbar/toolbar-demo.component.html')
        },
        {
          name: 'toolbar-demo.component.ts',
          fileContents: require('!!raw-loader!./toolbar/toolbar-demo.component.ts'),
          componentName: 'SkyToolbarDemoComponent',
          bootstrapSelector: 'sky-toolbar-demo'
        }
      ]
    },
    {
      name: 'URL validation',
      component: SkyUrlValidationDemoComponent,
      files: [
        {
          name: 'url-validation-demo.component.html',
          fileContents: require('!!raw-loader!./url-validation/url-validation-demo.component.html')
        },
        {
          name: 'url-validation.component.ts',
          fileContents: require('!!raw-loader!./url-validation/url-validation-demo.component.ts'),
          componentName: 'SkyUrlValidationDemoComponent',
          bootstrapSelector: 'sky-url-validation-demo'
        }
      ]
    },
    {
      name: 'Vertical tabs',
      component: SkyVerticalTabsDemoComponent,
      files: [
        {
          name: 'vertical-tabs-demo.component.html',
          fileContents: require('!!raw-loader!./vertical-tabs/vertical-tabs-demo.component.html')
        },
        {
          name: 'vertical-tabs-demo.component.ts',
          fileContents: require('!!raw-loader!./vertical-tabs/vertical-tabs-demo.component.ts'),
          componentName: 'SkyVerticalTabsDemoComponent',
          bootstrapSelector: 'sky-vertical-tabs-demo'
        }
      ]
    },
    {
      name: 'Wait',
      component: SkyWaitDemoComponent,
      files: [
        {
          name: 'wait-demo.component.html',
          fileContents: require('!!raw-loader!./wait/wait-demo.component.html')
        },
        {
          name: 'wait-demo.component.ts',
          fileContents: require('!!raw-loader!./wait/wait-demo.component.ts'),
          componentName: 'SkyWaitDemoComponent',
          bootstrapSelector: 'sky-wait-demo'
        }
      ]
    },
    {
      name: 'Wizard',
      component: SkyWizardDemoComponent,
      files: [
        {
          name: 'wizard-demo.component.html',
          fileContents: require('!!raw-loader!./wizard/wizard-demo.component.html')
        },
        {
          name: 'wizard-demo.component.ts',
          fileContents: require('!!raw-loader!./wizard/wizard-demo.component.ts'),
          componentName: 'SkyWizardDemoComponent',
          bootstrapSelector: 'sky-wizard-demo'
        },
        {
          name: 'wizard-demo-form.component.html',
          fileContents: require('!!raw-loader!./wizard/wizard-demo-form.component.html')
        },
        {
          name: 'wizard-demo-form.component.ts',
          fileContents: require('!!raw-loader!./wizard/wizard-demo-form.component.ts'),
          componentName: 'SkyWizardDemoFormComponent'
        }
      ]
    }
  ];

  public getComponent(name: string): any {
    const found = this.components.find((component: any) => {
      return component.component.name === name;
    });

    return found;
  }
}
