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
              fileContents: require('!!raw!./alert/alert-demo.component.html')
            },
            {
              name: 'alert-demo.component.ts',
              fileContents: require('!!raw!./alert/alert-demo.component.ts'),
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
        summary: `The avatar component displays an image with an option to let users change the image.`,
        url: '/components/avatar',
        getCodeFiles: function () {
          return [
            {
              name: 'avatar-demo.component.html',
              fileContents: require('!!raw!./avatar/avatar-demo.component.html')
            },
            {
              name: 'avatar-demo.component.ts',
              fileContents: require('!!raw!./avatar/avatar-demo.component.ts'),
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
              fileContents: require('!!raw!./action-button/action-button-demo.component.html')
            },
            {
              name: 'action-button-demo.component.ts',
              fileContents: require('!!raw!./action-button/action-button-demo.component.ts'),
              componentName: 'SkyActionButtonDemoComponent',
              bootstrapSelector: 'sky-action-button-demo'
            }
          ];
        }
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
              fileContents: require('!!raw!./card/card-demo.component.html')
            },
            {
              name: 'card-demo.component.ts',
              fileContents: require('!!raw!./card/card-demo.component.ts'),
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
              fileContents: require('!!raw!./checkbox/checkbox-demo.component.html')
            },
            {
              name: 'checkbox-demo.component.ts',
              fileContents: require('!!raw!./checkbox/checkbox-demo.component.ts'),
              componentName: 'SkyCheckboxDemoComponent',
              bootstrapSelector: 'sky-checkbox-demo'
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
              fileContents: require('!!raw!./definition-list/definition-list-demo.component.html')
            },
            {
              name: 'definition-list-demo.component.ts',
              fileContents: require('!!raw!./definition-list/definition-list-demo.component.ts'),
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
        summary: `The dropdown component renders a button that when clicked will display a dropdown menu.`,
        url: '/components/dropdown',
        getCodeFiles: function () {
          return [
            {
              name: 'dropdown-demo.component.html',
              fileContents: require('!!raw!./dropdown/dropdown-demo.component.html')
            },
            {
              name: 'dropdown-demo.component.ts',
              fileContents: require('!!raw!./dropdown/dropdown-demo.component.ts'),
              componentName: 'SkyDropdownDemoComponent',
              bootstrapSelector: 'sky-dropdown-demo'
            }
          ];
        }
      },
      {
        name: 'Error',
        icon: 'exclamation',
        // tslint:disable-next-line
        summary: `The error component provides a template that allows other components to display error messages when errors occur.`,
        url: '/components/error',
        getCodeFiles: function () {
          return [
            {
              name: 'error-demo.component.html',
              fileContents: require('!!raw!./error/error-demo.component.html')
            },
            {
              name: 'error-demo.component.ts',
              fileContents: require('!!raw!./error/error-demo.component.ts'),
              componentName: 'ErrorDemoComponent',
              bootstrapSelector: 'sky-error-demo'
            }
          ];
        }
      },
      {
        name: 'File attachments',
        icon: 'cloud-upload',
        // tslint:disable-next-line
        summary: `The file attachment components provide the ability to add multiple files to forms and then display information about the files.`,
        url: '/components/fileattachments',
        getCodeFiles: function () {
          return [
            {
              name: 'fileattachments-demo.component.html',
              fileContents: require('!!raw!./fileattachments/fileattachments-demo.component.html')
            },
            {
              name: 'fileattachments-demo.component.ts',
              fileContents: require('!!raw!./fileattachments/fileattachments-demo.component.ts'),
              componentName: 'SkyFileattachmentsDemoComponent',
              bootstrapSelector: 'sky-fileattachments-demo'
            }
          ];
        }
      },
      {
        name: 'Grid',
        icon: 'table',
        // tslint:disable-next-line
        summary: `The grid component is used to display data in a consistent and flexible way.`,
        url: '/components/grid',
        getCodeFiles: function () {
          return [
            {
              name: 'grid-demo.component.html',
              fileContents: require('!!raw!./grid/grid-demo.component.html')
            },
            {
              name: 'grid-demo.component.ts',
              fileContents: require('!!raw!./grid/grid-demo.component.ts'),
              componentName: 'SkyGridDemoComponent',
              bootstrapSelector: 'sky-grid-demo'
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
              fileContents: require('!!raw!./key-info/key-info-demo.component.html')
            },
            {
              name: 'key-info-demo.component.ts',
              fileContents: require('!!raw!./key-info/key-info-demo.component.ts'),
              componentName: 'SkyKeyInfoDemoComponent',
              bootstrapSelector: 'sky-key-info-demo'
            }
          ];
        }
      },
      {
        name: 'Labels',
        icon: 'tags',
        // tslint:disable-next-line
        summary: `The label component is used to call out important status information.`,
        url: '/components/label',
        getCodeFiles: function () {
          return [
            {
              name: 'label-demo.component.html',
              fileContents: require('!!raw!./label/label-demo.component.html')
            },
            {
              name: 'label-demo.component.ts',
              fileContents: require('!!raw!./label/label-demo.component.ts'),
              componentName: 'SkyLabelDemoComponent',
              bootstrapSelector: 'sky-label-demo'
            }
          ];
        }
      },
      {
        name: 'List',
        icon: 'list',
        // tslint:disable-next-line
        summary: `The list component is used to display data in a consistent and flexible way.`,
        url: '/components/list',
        getCodeFiles: function () {
          return [
            {
              name: 'list-demo.component.html',
              fileContents: require('!!raw!./list/list-demo.component.html')
            },
            {
              name: 'list-demo.component.ts',
              fileContents: require('!!raw!./list/list-demo.component.ts'),
              componentName: 'SkyListDemoComponent',
              bootstrapSelector: 'sky-list-demo'
            },
            {
              name: 'list-provider-demo.component.html',
              fileContents: require('!!raw!./list/list-provider-demo.component.html')
            },
            {
              name: 'list-provider-demo.component.ts',
              fileContents: require('!!raw!./list/list-provider-demo.component.ts'),
              componentName: 'SkyListProviderDemoComponent',
              bootstrapSelector: 'sky-list-provider-demo'
            }
          ];
        }
      },
      {
        name: 'List paging',
        icon: 'file-o',
        // tslint:disable-next-line
        summary: `The list paging component displays a SKY UX-themed pagination control for a list of data.`,
        url: '/components/list-paging',
        getCodeFiles: function () {
          return [
            {
              name: 'list-paging-demo.component.html',
              fileContents:
              require('!!raw!./list-paging/list-paging-demo.component.html')
            },
            {
              name: 'list-paging-demo.component.ts',
              fileContents:
              require('!!raw!./list-paging/list-paging-demo.component.ts'),
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
        `The list toolbar component displays a SKY UX-themed toolbar for the list component.`,
        url: '/components/list-toolbar',
        getCodeFiles: function () {
          return [
            {
              name: 'list-toolbar-demo.component.html',
              fileContents: require('!!raw!./list-toolbar/list-toolbar-demo.component.html')
            },
            {
              name: 'list-toolbar-demo.component.ts',
              fileContents: require('!!raw!./list-toolbar/list-toolbar-demo.component.ts'),
              componentName: 'SkyListToolbarDemoComponent',
              bootstrapSelector: 'sky-list-toolbar-demo'
            },
            {
              name: 'list-toolbar-demo-custom.component.html',
              fileContents: require('!!raw!./list-toolbar/list-toolbar-demo-custom.component.html')
            },
            {
              name: 'list-toolbar-demo-custom.component.ts',
              fileContents: require('!!raw!./list-toolbar/list-toolbar-demo-custom.component.ts'),
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
        summary: `The checklist builds a filterable checkbox list of data.`,
        url: '/components/list-view-checklist',
        getCodeFiles: function () {
          return [
            {
              name: 'list-view-checklist-demo.component.html',
              fileContents:
              require('!!raw!./list-view-checklist/list-view-checklist-demo.component.html')
            },
            {
              name: 'list-view-checklist-demo.component.ts',
              fileContents:
              require('!!raw!./list-view-checklist/list-view-checklist-demo.component.ts'),
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
        summary: `The list component is used to display data in a consistent and flexible way.`,
        url: '/components/list-view-grid',
        getCodeFiles: function () {
          return [
            {
              name: 'list-view-grid-demo.component.html',
              fileContents: require('!!raw!./list-view-grid/list-view-grid-demo.component.html')
            },
            {
              name: 'list-view-grid-demo.component.ts',
              fileContents: require('!!raw!./list-view-grid/list-view-grid-demo.component.ts'),
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
        summary: `The media queries service allows users to subscribe to screen size changes at different breakpoints.`,
        url: '/components/media-queries',
        getCodeFiles: function () {
          return [
            {
              name: 'media-query-demo.component.html',
              fileContents:
              require('!!raw!./media-queries/media-query-demo.component.html')
            },
            {
              name: 'media-query-demo.component.ts',
              fileContents:
              require('!!raw!./media-queries/media-query-demo.component.ts'),
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
              fileContents: require('!!raw!./modal/modal-demo.component.html')
            },
            {
              name: 'modal-demo.component.ts',
              fileContents: require('!!raw!./modal/modal-demo.component.ts'),
              componentName: 'SkyModalDemoComponent',
              bootstrapSelector: 'sky-modal-demo'
            },
            {
              name: 'modal-demo-form.component.html',
              fileContents: require('!!raw!./modal/modal-demo-form.component.html')
            },
            {
              name: 'modal-demo-form.component.ts',
              fileContents: require('!!raw!./modal/modal-demo-form.component.ts'),
              componentName: 'SkyModalDemoFormComponent'
            },
            {
              name: 'modal-demo-context.ts',
              fileContents: require('!!raw!./modal/modal-demo-context.ts')
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
              fileContents: require('!!raw!./navbar/navbar-demo.component.html')
            },
            {
              name: 'navbar-demo.component.ts',
              fileContents: require('!!raw!./navbar/navbar-demo.component.ts'),
              componentName: 'SkyNavbarDemoComponent',
              bootstrapSelector: 'sky-navbar-demo'
            }
          ];
        }
      },
      {
        name: 'Page summary',
        icon: 'newspaper-o',
        // tslint:disable-next-line
        summary: `The page summary displays critical information and actions for users to access quickly and frequently.`,
        url: '/components/page-summary',
        getCodeFiles: function () {
          return [
            {
              name: 'page-summary-demo.component.html',
              fileContents: require('!!raw!./page-summary/page-summary-demo.component.html')
            },
            {
              name: 'page-summary-demo.component.ts',
              fileContents: require('!!raw!./page-summary/page-summary-demo.component.ts'),
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
        summary: `The paging component is used to display a pagination control.`,
        url: '/components/paging',
        getCodeFiles: function () {
          return [
            {
              name: 'paging-demo.component.html',
              fileContents: require('!!raw!./paging/paging-demo.component.html')
            },
            {
              name: 'paging-demo.component.ts',
              fileContents: require('!!raw!./paging/paging-demo.component.ts'),
              componentName: 'SkyPagingDemoComponent',
              bootstrapSelector: 'sky-paging-demo'
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
              fileContents: require('!!raw!./radio/radio-demo.component.html')
            },
            {
              name: 'radio-demo.component.ts',
              fileContents: require('!!raw!./radio/radio-demo.component.ts'),
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
              fileContents: require('!!raw!./repeater/repeater-demo.component.html')
            },
            {
              name: 'repeater-demo.component.ts',
              fileContents: require('!!raw!./repeater/repeater-demo.component.ts'),
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
              fileContents: require('!!raw!./search/search-demo.component.html')
            },
            {
              name: 'search-demo.component.ts',
              fileContents: require('!!raw!./search/search-demo.component.ts'),
              componentName: 'SkySearchDemoComponent',
              bootstrapSelector: 'sky-search-demo'
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
              fileContents: require('!!raw!./sort/sort-demo.component.html')
            },
            {
              name: 'sort-demo.component.ts',
              fileContents: require('!!raw!./sort/sort-demo.component.ts'),
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
              fileContents: require('!!raw!./tabs/tabs-demo.component.html')
            },
            {
              name: 'tabs-demo.component.ts',
              fileContents: require('!!raw!./tabs/tabs-demo.component.ts'),
              componentName: 'SkyTabsDemoComponent',
              bootstrapSelector: 'sky-tabs-demo'
            }
          ];
        }
      },
      {
        name: 'Text Expand',
        icon: 'text-height',
        // tslint:disable-next-line
        summary: `The text expand component truncates long text with an ellipsis and a link that users can click to expand the text.`,
        url: '/components/text-expand',
        getCodeFiles: function () {
          return [
            {
              name: 'text-expand-demo.component.html',
              fileContents: require('!!raw!./text-expand/text-expand-demo.component.html')
            },
            {
              name: 'tabs-demo.component.ts',
              fileContents: require('!!raw!./text-expand/text-expand-demo.component.ts'),
              componentName: 'SkyTextExpandDemoComponent',
              bootstrapSelector: 'sky-text-expand-demo'
            }
          ];
        }
      },
      {
        name: 'Tiles',
        icon: 'th-large',
        // tslint:disable-next-line
        summary: `Tiles provides a collapsible container that is the building block for pages and forms in SKY UX applications.`,
        url: '/components/tiles',
        getCodeFiles: function () {
          return [
            {
              name: 'tiles-demo.component.html',
              fileContents: require('!!raw!./tiles/tiles-demo.component.html')
            },
            {
              name: 'tiles-demo.component.ts',
              fileContents: require('!!raw!./tiles/tiles-demo.component.ts'),
              componentName: 'SkyTilesDemoComponent',
              bootstrapSelector: 'sky-tiles-demo'
            },
            {
              name: 'tiles-demo-tile1.component.html',
              fileContents: require('!!raw!./tiles/tiles-demo-tile1.component.html')
            },
            {
              name: 'tiles-demo-tile1.component.ts',
              fileContents: require('!!raw!./tiles/tiles-demo-tile1.component.ts'),
              componentName: 'SkyTilesDemoTile1Component'
            },
            {
              name: 'tiles-demo-tile2.component.html',
              fileContents: require('!!raw!./tiles/tiles-demo-tile2.component.html')
            },
            {
              name: 'tiles-demo-tile2.component.ts',
              fileContents: require('!!raw!./tiles/tiles-demo-tile2.component.ts'),
              componentName: 'SkyTilesDemoTile2Component'
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
              fileContents: require('!!raw!./toolbar/toolbar-demo.component.html')
            },
            {
              name: 'toolbar-demo.component.ts',
              fileContents: require('!!raw!./toolbar/toolbar-demo.component.ts'),
              componentName: 'SkyToolbarDemoComponent',
              bootstrapSelector: 'sky-toolbar-demo'
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
              fileContents: require('!!raw!./wait/wait-demo.component.html')
            },
            {
              name: 'wait-demo.component.ts',
              fileContents: require('!!raw!./wait/wait-demo.component.ts'),
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
              fileContents: require('!!raw!./wizard/wizard-demo.component.html')
            },
            {
              name: 'wizard-demo.component.ts',
              fileContents: require('!!raw!./wizard/wizard-demo.component.ts'),
              componentName: 'SkyWizardDemoComponent',
              bootstrapSelector: 'sky-wizard-demo'
            },
            {
              name: 'wizard-demo-form.component.html',
              fileContents: require('!!raw!./wizard/wizard-demo-form.component.html')
            },
            {
              name: 'wizard-demo-form.component.ts',
              fileContents: require('!!raw!./wizard/wizard-demo-form.component.ts')
            }
          ];
        }
      }
    ];
  }
}
