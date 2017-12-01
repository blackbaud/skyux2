import { Injectable } from '@angular/core';

import { SkyDemoComponent } from './demo-component';

@Injectable()
export class SkyDemoComponentsService {
  public getComponents(filter?: string): SkyDemoComponent[] {
    return [
      {
        name: 'Alert',
        icon: 'bell',
        summary: 'The alert component displays a SKY UX-themed alert.',
        url: '/components/alert',
        getCodeFiles: function () {
          return [
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
          ];
        }
      },
      {
        name: 'Avatar',
        icon: 'user',
        // tslint:disable-next-line
        summary: `The avatar component displays an image and allows users to change the image.`,
        url: '/components/avatar',
        getCodeFiles: function () {
          return [
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
          ];
        }
      },
      {
        name: 'Action button',
        icon: 'square-o',
        // tslint:disable-next-line
        summary:
        `The action button component creates a large button with an icon, heading, and details.`,
        url: '/components/action-button',
        getCodeFiles: function () {
          return [
            {
              name: 'action-button-demo.component.html',
              fileContents:
              require('!!raw-loader!./action-button/action-button-demo.component.html')
            },
            {
              name: 'action-button-demo.component.ts',
              fileContents: require('!!raw-loader!./action-button/action-button-demo.component.ts'),
              componentName: 'SkyActionButtonDemoComponent',
              bootstrapSelector: 'sky-action-button-demo'
            }
          ];
        }
      },
      {
        name: 'Button',
        icon: 'square-o',
        // tslint:disable-next-line
        summary: `The button classes create buttons to trigger actions from within an interface.`,
        url: '/components/button'
      },
      {
        name: 'Card',
        icon: 'th-large',
        // tslint:disable-next-line
        summary: `The card component creates a small container to highlight important information.`,
        url: '/components/card',
        getCodeFiles: function () {
          return [
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
          ];
        }
      },
      {
        name: 'Checkbox',
        icon: 'check-square',
        // tslint:disable-next-line
        summary: `The checkbox component renders a SKY UX-themed checkbox.`,
        url: '/components/checkbox',
        getCodeFiles: function () {
          return [
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
          ];
        }
      },
      {
        name: 'Colorpicker',
        icon: 'eyedropper',
        // tslint:disable-next-line
        summary: `The colorpicker module allows users to use an input to select colors.`,
        url: '/components/colorpicker',
        getCodeFiles: function () {
          return [
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
          ];
        }
      },
      {
        name: 'Confirmation dialog',
        icon: 'list-alt',
        // tslint:disable-next-line
        summary: `The confirmation dialog component launches simple confirmation dialogs to allow users to confirm actions.`,
        url: '/components/confirmation-dialog',
        getCodeFiles: function () {
          return [
            {
              name: 'confirmation-dialog-demo.component.html',
              fileContents: require('!!raw-loader!./confirmation-dialog/' +
                'confirmation-dialog-demo.component.html')
            },
            {
              name: 'confirmation-dialog-demo.component.ts',
              fileContents: require('!!raw-loader!./confirmation-dialog/' +
                'confirmation-dialog-demo.component.ts'),
              componentName: 'SkyConfirmationDialogDemoComponent',
              bootstrapSelector: 'sky-confirmation-dialog-demo'
            }
          ];
        }
      },
      {
        name: 'Datepicker',
        icon: 'calendar',
        // tslint:disable-next-line
        summary: `The datepicker module allows users to use an input and calendar to select dates.`,
        url: '/components/datepicker',
        getCodeFiles: function () {
          return [
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
          ];
        }
      },
      {
        name: 'Definition list',
        icon: 'list-alt',
        // tslint:disable-next-line
        summary: `The definition list component displays a list of label-value pairs.`,
        url: '/components/definition-list',
        getCodeFiles: function () {
          return [
            {
              name: 'definition-list-demo.component.html',
              fileContents:
              require('!!raw-loader!./definition-list/definition-list-demo.component.html')
            },
            {
              name: 'definition-list-demo.component.ts',
              fileContents:
              require('!!raw-loader!./definition-list/definition-list-demo.component.ts'),
              componentName: 'SkyDefinitionListDemoComponent',
              bootstrapSelector: 'sky-definition-list-demo'
            }
          ];
        }
      },
      {
        name: 'Dropdown',
        icon: 'caret-down',
        // tslint:disable-next-line
        summary: `The dropdown component renders a button that displays a dropdown menu.`,
        url: '/components/dropdown',
        getCodeFiles: function () {
          return [
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
          ];
        }
      },
      {
        name: 'Email validation',
        icon: 'check',
        // tslint:disable-next-line
        summary: `The email validation module allows users to validate email format.`,
        url: '/components/email-validation',
        getCodeFiles: function () {
          return [
            {
              name: 'email-validation-demo.component.html',
              fileContents: require
              ('!!raw-loader!./email-validation/email-validation-demo.component.html')
            },
            {
              name: 'email-validation.component.ts',
              fileContents: require
              ('!!raw-loader!./email-validation/email-validation-demo.component.ts'),
              componentName: 'SkyEmailValidationDemoComponent',
              bootstrapSelector: 'sky-email-validation-demo'
            }
          ];
        }
      },
      {
        name: 'Error',
        icon: 'exclamation',
        // tslint:disable-next-line
        summary: `The error component provides a template for other components to display error messages.`,
        url: '/components/error',
        getCodeFiles: function () {
          return [
            {
              name: 'error-demo.component.html',
              fileContents: require('!!raw-loader!./error/error-demo.component.html')
            },
            {
              name: 'error-demo.component.ts',
              fileContents: require('!!raw-loader!./error/error-demo.component.ts'),
              componentName: 'ErrorDemoComponent',
              bootstrapSelector: 'sky-error-demo'
            }
          ];
        }
      },
      {
        name: 'File attachment',
        icon: 'cloud-upload',
        // tslint:disable-next-line
        summary: `The file attachment components allow users to add file attachments to forms.`,
        url: '/components/fileattachments',
        getCodeFiles: function () {
          return [
            {
              name: 'fileattachments-demo.component.html',
              fileContents:
              require('!!raw-loader!./fileattachments/fileattachments-demo.component.html')
            },
            {
              name: 'fileattachments-demo.component.ts',
              fileContents:
              require('!!raw-loader!./fileattachments/fileattachments-demo.component.ts'),
              componentName: 'SkyFileattachmentsDemoComponent',
              bootstrapSelector: 'sky-fileattachments-demo'
            }
          ];
        }
      },
      {
        name: 'Filter',
        icon: 'filter',
        // tslint:disable-next-line
        summary: `The filter module provides components that allow users to select filter criteria.`,
        url: '/components/filter',
        getCodeFiles: function () {
          return [
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
            },
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
          ];
        }
      },
      {
        name: 'Fluid grid',
        icon: 'table',
        // tslint:disable-next-line
        summary: `The fluid grid component provides a responsive 12-column layout to organize content.`,
        url: '/components/fluid-grid',
        getCodeFiles: function () {
          return [
            {
              name: 'fluid-grid.component.html',
              fileContents: require('!!raw-loader!./fluid-grid/fluid-grid-demo.component.html')
            },
            {
              name: 'fluid-grid-demo.component.ts',
              fileContents: require('!!raw-loader!./fluid-grid/fluid-grid-demo.component.ts'),
              componentName: 'SkyFluidGridDemoComponent',
              bootstrapSelector: 'sky-fluid-grid-demo'
            }
          ];
        }
      },
      {
        name: 'Form',
        icon: 'keyboard-o',
        // tslint:disable-next-line
        summary: `The form classes create styled inputs and labels for use in forms.`,
        url: '/components/form'
      },
      {
        name: 'Grid',
        icon: 'table',
        // tslint:disable-next-line
        summary: `The grid component displays data in a consistent and flexible way.`,
        url: '/components/grid',
        getCodeFiles: function () {
          return [
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
          ];
        }
      },
      {
        name: 'Help inline',
        icon: 'question',
        summary: 'The help inline component creates a small help button next to a field.',
        url: '/components/help-inline',
        getCodeFiles: function () {
          return [
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
          ];
        }
      },
      {
        name: 'Highlight',
        icon: 'paint-brush',
        summary: `The highlight component highlights text within DOM elements.`,
        url: '/components/text-highlight',
        getCodeFiles: function () {
          return [
            {
              name: 'text-highlight-demo.component.html',
              // tslint:disable-next-line
              fileContents: require('!!raw-loader!./text-highlight/text-highlight-demo.component.html')
            },
            {
              name: 'text-highlight-demo.component.ts',
              // tslint:disable-next-line
              fileContents: require('!!raw-loader!./text-highlight/text-highlight-demo.component.ts'),
              componentName: 'SkyTextHighlightDemoComponent',
              bootstrapSelector: 'sky-text-highlight-demo'
            }
          ];
        }
      },
      {
        name: 'Key info',
        icon: 'key',
        // tslint:disable-next-line
        summary: `The key info component highlights important information such as summary numbers.`,
        url: '/components/key-info',
        getCodeFiles: function () {
          return [
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
          ];
        }
      },
      {
        name: 'Label',
        icon: 'tags',
        // tslint:disable-next-line
        summary: `The label component calls out important status information such as warnings.`,
        url: '/components/label',
        getCodeFiles: function () {
          return [
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
          ];
        }
      },
      {
        name: 'Link records',
        icon: 'link',
        // tslint:disable-next-line
        summary: `The link records component matches data between two sources.`,
        url: '/components/link-records',
        getCodeFiles: function () {
          return [
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
          ];
        }
      },
      {
        name: 'List',
        icon: 'list',
        // tslint:disable-next-line
        summary: `The list component displays data in a consistent and flexible way.`,
        url: '/components/list',
        getCodeFiles: function () {
          return [
            {
              name: 'list-demo.component.html',
              fileContents: require('!!raw-loader!./list/list-demo.component.html')
            },
            {
              name: 'list-demo.component.ts',
              fileContents: require('!!raw-loader!./list/list-demo.component.ts'),
              componentName: 'SkyListDemoComponent',
              bootstrapSelector: 'sky-list-demo'
            },
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
          ];
        }
      },
      {
        name: 'List filters',
        icon: 'filter',
        // tslint:disable-next-line
        summary: `The list filter module provides components that allow users to select filter criteria.`,
        url: '/components/list-filters',
        getCodeFiles: function () {
          return [
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
              fileContents:
              require('!!raw-loader!./list-filters/list-filters-demo-modal.component.html')
            },
            {
              name: 'list-filters-demo-modal.component.ts',
              fileContents:
              require('!!raw-loader!./list-filters/list-filters-demo-modal.component.ts'),
              componentName: 'SkyListFiltersModalDemoComponent'
            },
            {
              name: 'list-filters-inline-demo.component.html',
              fileContents:
              require('!!raw-loader!./list-filters/list-filters-inline-demo.component.html')
            },
            {
              name: 'list-filters-inline-demo.component.ts',
              fileContents:
              require('!!raw-loader!./list-filters/list-filters-inline-demo.component.ts'),
              componentName: 'SkyListFiltersInlineDemoComponent',
              bootstrapSelector: 'sky-list-filters-inline-demo'
            }
          ];
        }
      },
      {
        name: 'List paging',
        icon: 'file-o',
        // tslint:disable-next-line
        summary: `The list paging component displays a SKY UX-themed pagination control for a list.`,
        url: '/components/list-paging',
        getCodeFiles: function () {
          return [
            {
              name: 'list-paging-demo.component.html',
              fileContents:
              require('!!raw-loader!./list-paging/list-paging-demo.component.html')
            },
            {
              name: 'list-paging-demo.component.ts',
              fileContents:
              require('!!raw-loader!./list-paging/list-paging-demo.component.ts'),
              componentName: 'SkyListPagingDemoComponent',
              bootstrapSelector: 'sky-list-paging-demo'
            }
          ];
        }
      },
      {
        name: 'List toolbar',
        icon: 'wrench',
        // tslint:disable-next-line
        summary:
        `The list toolbar component displays a SKY UX-themed toolbar for a list.`,
        url: '/components/list-toolbar',
        getCodeFiles: function () {
          return [
            {
              name: 'list-toolbar-demo.component.html',
              fileContents: require('!!raw-loader!./list-toolbar/list-toolbar-demo.component.html')
            },
            {
              name: 'list-toolbar-demo.component.ts',
              fileContents: require('!!raw-loader!./list-toolbar/list-toolbar-demo.component.ts'),
              componentName: 'SkyListToolbarDemoComponent',
              bootstrapSelector: 'sky-list-toolbar-demo'
            },
            {
              name: 'list-toolbar-demo-custom.component.html',
              fileContents:
              require('!!raw-loader!./list-toolbar/list-toolbar-demo-custom.component.html')
            },
            {
              name: 'list-toolbar-demo-custom.component.ts',
              fileContents:
              require('!!raw-loader!./list-toolbar/list-toolbar-demo-custom.component.ts'),
              componentName: 'SkyListToolbarDemoCustomComponent',
              bootstrapSelector: 'sky-list-toolbar-demo-custom'
            }
          ];
        }
      },
      {
        name: 'List view checklist',
        icon: 'list-ul',
        // tslint:disable-next-line
        summary: `The list view checklist component builds a filterable checkbox list of data.`,
        url: '/components/list-view-checklist',
        getCodeFiles: function () {
          return [
            {
              name: 'list-view-checklist-demo.component.html',
              fileContents:
              require('!!raw-loader!./list-view-checklist/list-view-checklist-demo.component.html')
            },
            {
              name: 'list-view-checklist-demo.component.ts',
              fileContents:
              require('!!raw-loader!./list-view-checklist/list-view-checklist-demo.component.ts'),
              componentName: 'SkyListViewChecklistDemoComponent',
              bootstrapSelector: 'sky-list-view-checklist-demo'
            }
          ];
        }
      },
      {
        name: 'List view grid',
        icon: 'table',
        // tslint:disable-next-line
        summary: `The list view grid component displays a SKY UX-themed grid for a list of data.`,
        url: '/components/list-view-grid',
        getCodeFiles: function () {
          return [
            {
              name: 'list-view-grid-demo.component.html',
              fileContents:
              require('!!raw-loader!./list-view-grid/list-view-grid-demo.component.html')
            },
            {
              name: 'list-view-grid-demo.component.ts',
              fileContents:
              require('!!raw-loader!./list-view-grid/list-view-grid-demo.component.ts'),
              componentName: 'SkyListViewGridDemoComponent',
              bootstrapSelector: 'sky-list-view-grid-demo'
            }
          ];
        }
      },
      {
        name: 'Media queries',
        icon: 'mobile',
        // tslint:disable-next-line
        summary: `The media queries service allows users to subscribe to screen size changes at breakpoints.`,
        url: '/components/media-queries',
        getCodeFiles: function () {
          return [
            {
              name: 'media-query-demo.component.html',
              fileContents:
              require('!!raw-loader!./media-queries/media-query-demo.component.html')
            },
            {
              name: 'media-query-demo.component.ts',
              fileContents:
              require('!!raw-loader!./media-queries/media-query-demo.component.ts'),
              componentName: 'SkyMediaQueryDemoComponent',
              bootstrapSelector: 'sky-media-query-demo'
            }
          ];
        }
      },
      {
        name: 'Modal',
        icon: 'list-alt',
        // tslint:disable-next-line
        summary: `The modal component launches modals in a consistent way in SKY UX applications.`,
        url: '/components/modal',
        getCodeFiles: function () {
          return [
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
          ];
        }
      },
      {
        name: 'Navbar',
        icon: 'compass',
        // tslint:disable-next-line
        summary: `The navbar component displays a list of top-level navigation items.`,
        url: '/components/navbar',
        getCodeFiles: function () {
          return [
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
          ];
        }
      },
      {
        name: 'Numeric',
        icon: 'calculator',
        summary: 'The numeric pipe shortens long numbers and can format as currency.',
        url: '/components/numeric',
        getCodeFiles: function () {
          return [
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
          ];
        }
      },
      {
        name: 'Page summary',
        icon: 'newspaper-o',
        // tslint:disable-next-line
        summary: `The page summary displays critical information and actions for users to access frequently.`,
        url: '/components/page-summary',
        getCodeFiles: function () {
          return [
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
          ];
        }
      },
      {
        name: 'Paging',
        icon: 'files-o',
        // tslint:disable-next-line
        summary: `The paging component displays a SKY UX-themed pagination control.`,
        url: '/components/paging',
        getCodeFiles: function () {
          return [
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
          ];
        }
      },
      {
        name: 'Popover',
        icon: 'newspaper-o',
        // tslint:disable-next-line
        summary: 'The popover component provides an HTML-formatted popover that is displayed by a trigger element.',
        url: '/components/popover',
        getCodeFiles: () => {
          return [
            {
              name: 'popover-demo.component.html',
              fileContents: require('!!raw-loader!./popover/popover-demo.component.html')
            },
            {
              name: 'popover-demo.component.ts',
              fileContents: require('!!raw-loader!./popover/popover-demo.component.ts'),
              componentName: 'SkyPopoverDemoComponent',
              bootstrapSelector: 'sky-popover-demo'
            }
          ];
        }
      },
      {
        name: 'Radio button',
        icon: 'circle-o',
        // tslint:disable-next-line
        summary: `The radio button component renders a SKY UX-themed radio button.`,
        url: '/components/radio',
        getCodeFiles: function () {
          return [
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
          ];
        }
      },
      {
        name: 'Repeater',
        icon: 'check-square',
        // tslint:disable-next-line
        summary: `The repeater component creates a container to display formatted information for a list of objects.`,
        url: '/components/repeater',
        getCodeFiles: function () {
          return [
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
          ];
        }
      },
      {
        name: 'Search',
        icon: 'search',
        // tslint:disable-next-line
        summary: `The search component creates a mobile-responsive input control for users to enter search criteria.`,
        url: '/components/search',
        getCodeFiles: function () {
          return [
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
          ];
        }
      },
      {
        name: 'Sectioned form',
        icon: 'object-group',
        // tslint:disable-next-line
        summary: `The sectioned form component combines forms and lets users target specific areas.`,
        url: '/components/sectioned-form',
        getCodeFiles: function () {
          return [
            {
              name: 'sectioned-form-demo.component.html',
              // tslint:disable-next-line
              fileContents: require('!!raw-loader!./sectioned-form/sectioned-form-demo.component.html')
            },
            {
              name: 'sectioned-form-demo.component.ts',
              // tslint:disable-next-line
              fileContents: require('!!raw-loader!./sectioned-form/sectioned-form-demo.component.ts'),
              componentName: 'SkySectionedFormDemoComponent',
              bootstrapSelector: 'sky-sectioned-form-demo'
            },
            {
              name: 'sectioned-modal-form-demo.component.html',
              // tslint:disable-next-line
              fileContents: require('!!raw-loader!./sectioned-form/sectioned-modal-form-demo.component.html')
            },
            {
              name: 'sectioned-modal-form-demo.component.ts',
              // tslint:disable-next-line
              fileContents: require('!!raw-loader!./sectioned-form/sectioned-modal-form-demo.component.ts')
            },
            {
              name: 'demo-address-form.component.html',
              // tslint:disable-next-line
              fileContents: require('!!raw-loader!./sectioned-form/demo-address-form.component.html')
            },
            {
              name: 'demo-address-form.component.ts',
              fileContents: require('!!raw-loader!./sectioned-form/demo-address-form.component.ts')
            },
            {
              name: 'demo-information-form.component.html',
              // tslint:disable-next-line
              fileContents: require('!!raw-loader!./sectioned-form/demo-information-form.component.html')
            },
            {
              name: 'demo-information-form.component.ts',
              // tslint:disable-next-line
              fileContents: require('!!raw-loader!./sectioned-form/demo-information-form.component.ts')
            },
            {
              name: 'demo-phone-form.component.html',
              fileContents: require('!!raw-loader!./sectioned-form/demo-phone-form.component.html')
            },
            {
              name: 'demo-phone-form.component.ts',
              fileContents: require('!!raw-loader!./sectioned-form/demo-phone-form.component.ts')
            }
          ];
        }
      },
      {
        name: 'Sort',
        icon: 'sort',
        // tslint:disable-next-line
        summary: `The sort component allows users to select sorting criteria.`,
        url: '/components/sort',
        getCodeFiles: function () {
          return [
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
          ];
        }
      },
      {
        name: 'Tabs',
        icon: 'folder-open-o',
        summary: `The tabs module contains components to render a tabset.`,
        url: '/components/tabs',
        getCodeFiles: function () {
          return [
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
          ];
        }
      },
      {
        name: 'Text expand',
        icon: 'text-height',
        // tslint:disable-next-line
        summary: `The text expand component truncates long text and provides a link to expand the text.`,
        url: '/components/text-expand',
        getCodeFiles: function () {
          return [
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
          ];
        }
      },
      {
        name: 'Tile',
        icon: 'th-large',
        // tslint:disable-next-line
        summary: `The tile directive provides a container that is the building block for pages and forms.`,
        url: '/components/tile',
        getCodeFiles: function () {
          return [
            {
              name: 'tiles-demo.component.html',
              fileContents: require('!!raw-loader!./tile/tiles-demo.component.html')
            },
            {
              name: 'tiles-demo.component.ts',
              fileContents: require('!!raw-loader!./tile/tiles-demo.component.ts'),
              componentName: 'SkyTilesDemoComponent',
              bootstrapSelector: 'sky-tiles-demo'
            },
            {
              name: 'tiles-demo-tile1.component.html',
              fileContents: require('!!raw-loader!./tile/tiles-demo-tile1.component.html')
            },
            {
              name: 'tiles-demo-tile1.component.ts',
              fileContents: require('!!raw-loader!./tile/tiles-demo-tile1.component.ts'),
              componentName: 'SkyTilesDemoTile1Component'
            },
            {
              name: 'tiles-demo-tile2.component.html',
              fileContents: require('!!raw-loader!./tile/tiles-demo-tile2.component.html')
            },
            {
              name: 'tiles-demo-tile2.component.ts',
              fileContents: require('!!raw-loader!./tile/tiles-demo-tile2.component.ts'),
              componentName: 'SkyTilesDemoTile2Component'
            }
          ];
        }
      },
      {
        name: 'Timepicker',
        icon: 'clock-o',
        // tslint:disable-next-line
        summary: `The timepicker module allows users to use an input to select times.`,
        url: '/components/timepicker',
        getCodeFiles: function () {
          return [
            {
              name: 'timepicker-demo.component.html',
              fileContents: require('!!raw-loader!./timepicker/timepicker-demo.component.html')
            },
            {
              name: 'timepicker-demo.component.ts',
              fileContents: require('!!raw-loader!./timepicker/timepicker-demo.component.ts'),
              componentName: 'SkyTimePickerDemoComponent',
              bootstrapSelector: 'sky-timepicker-demo'
            }
          ];
        }
      },
      {
        name: 'Toolbar',
        icon: 'bars',
        // tslint:disable-next-line
        summary: `The toolbar component displays a SKY UX-themed toolbar.`,
        url: '/components/toolbar',
        getCodeFiles: function () {
          return [
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
          ];
        }
      },
      {
        name: 'URL validation',
        icon: 'check',
        // tslint:disable-next-line
        summary: `The URL validation module allows users to validate URL format.`,
        url: '/components/url-validation',
        getCodeFiles: function () {
          return [
            {
              name: 'url-validation-demo.component.html',
              fileContents: require
              ('!!raw-loader!./url-validation/url-validation-demo.component.html')
            },
            {
              name: 'url-validation.component.ts',
              fileContents: require
              ('!!raw-loader!./url-validation/url-validation-demo.component.ts'),
              componentName: 'SkyUrlValidationDemoComponent',
              bootstrapSelector: 'sky-url-validation-demo'
            }
          ];
        }
      },
      {
        name: 'Vertical tabs',
        icon: 'folder-open-o',
        summary: `The vertical tabs module contains components to render a vertical tabset.`,
        url: '/components/vertical-tabs',
        getCodeFiles: function () {
          return [
            {
              name: 'vertical-tabs-demo.component.html',
              // tslint:disable-next-line:max-line-length
              fileContents: require('!!raw-loader!./vertical-tabs/vertical-tabs-demo.component.html')
            },
            {
              name: 'vertical-tabs-demo.component.ts',
              fileContents: require('!!raw-loader!./vertical-tabs/vertical-tabs-demo.component.ts'),
              componentName: 'SkyVerticalTabsDemoComponent',
              bootstrapSelector: 'sky-vertical-tabs-demo'
            }
          ];
        }
      },
      {
        name: 'Wait',
        icon: 'spinner',
        // tslint:disable-next-line
        summary: `The wait directive and service show wait indication on elements.`,
        url: '/components/wait',
        getCodeFiles: function () {
          return [
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
          ];
        }
      },
      {
        name: 'Wizard',
        icon: 'magic',
        // tslint:disable-next-line
        summary: `The wizard guides users through a set of pre-defined steps in a particular order.`,
        url: '/components/wizard',
        getCodeFiles: function () {
          return [
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
          ];
        }
      }
    ];
  }
}
