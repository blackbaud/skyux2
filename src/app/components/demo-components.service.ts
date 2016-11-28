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
              name: 'list-demo-custom.component.html',
              fileContents: require('!!raw!./list/list-demo-custom.component.html')
            },
            {
              name: 'list-demo-custom.component.ts',
              fileContents: require('!!raw!./list/list-demo-custom.component.ts'),
              componentName: 'SkyListDemoCustomComponent',
              bootstrapSelector: 'sky-list-demo-custom'
            },
            {
              name: 'list-view-custom.component.html',
              fileContents: require('!!raw!./list/list-view-custom.component.html')
            },
            {
              name: 'list-view-custom.component.ts',
              fileContents: require('!!raw!./list/list-view-custom.component.ts'),
              componentName: 'SkyListViewCustomComponent',
              bootstrapSelector: 'sky-list-view-custom'
            }
          ];
        }
      },
      {
        name: 'List Filters',
        icon: 'filter',
        // tslint:disable-next-line
        summary: `The list filters component is used to filter data displayed
        in the list component.`,
        url: '/components/list-filters',
        getCodeFiles: function () {
          return [
            {
              name: 'list-filters-demo.component.html',
              fileContents: require('!!raw!./list-filters/list-filters-demo.component.html')
            },
            {
              name: 'list-filters-demo.component.ts',
              fileContents: require('!!raw!./list-filters/list-filters-demo.component.ts'),
              componentName: 'SkyListFiltersDemoComponent',
              bootstrapSelector: 'sky-list-filters-demo'
            },
            {
              name: 'list-filters-demo-modal.component.html',
              fileContents: require('!!raw!./list-filters/list-filters-demo-modal.component.html')
            },
            {
              name: 'list-filters-demo-modal.component.ts',
              fileContents: require('!!raw!./list-filters/list-filters-demo-modal.component.ts'),
              componentName: 'SkyListFiltersDemoModalComponent',
              bootstrapSelector: 'sky-list-filters-demo-modal'
            },
            {
              name: 'list-filters-demo-combo.component.html',
              fileContents: require('!!raw!./list-filters/list-filters-demo-combo.component.html')
            },
            {
              name: 'list-filters-demo-combo.component.ts',
              fileContents: require('!!raw!./list-filters/list-filters-demo-combo.component.ts'),
              componentName: 'SkyListFiltersDemoComboComponent',
              bootstrapSelector: 'sky-list-filters-demo-combo'
            }
          ];
        }
      },
      {
        name: 'List Paging Default',
        icon: 'files-o',
        // tslint:disable-next-line
        summary: `The list component is used to display data in a consistent and flexible way.`,
        url: '/components/list-paging-default',
        getCodeFiles: function () {
          return [
            {
              name: 'list-paging-default-demo.component.html',
              fileContents:
              require('!!raw!./list-paging-default/list-paging-default-demo.component.html')
            },
            {
              name: 'list-paging-default-demo.component.ts',
              fileContents:
              require('!!raw!./list-paging-default/list-paging-default-demo.component.ts'),
              componentName: 'SkyListPagingDefaultDemoComponent',
              bootstrapSelector: 'sky-list-paging-default-demo'
            }
          ];
        }
      },
      {
        name: 'List Toolbar',
        icon: 'wrench',
        // tslint:disable-next-line
        summary: `The list component is used to display data in a consistent and flexible way.`,
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
        name: 'List View Checklist',
        icon: 'list-ul',
        // tslint:disable-next-line
        summary: `The list component is used to display data in a consistent and flexible way.`,
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
        name: 'List View Grid',
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
        name: 'List View Repeater',
        icon: 'bars',
        // tslint:disable-next-line
        summary: `The list component is used to display data in a consistent and flexible way.`,
        url: '/components/list-view-repeater',
        getCodeFiles: function () {
          return [
            {
              name: 'list-view-repeater-demo.component.html',
              fileContents:
              require('!!raw!./list-view-repeater/list-view-repeater-demo.component.html')
            },
            {
              name: 'list-view-repeater-demo.component.ts',
              fileContents:
              require('!!raw!./list-view-repeater/list-view-repeater-demo.component.ts'),
              componentName: 'SkyListViewRepeaterDemoComponent',
              bootstrapSelector: 'sky-list-view-repeater-demo'
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
              fileContents: require('!!raw!./modal/modal-demo-form.component.ts')
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
        summary: `The page summary displays critical information
        and actions for users to access quickly and frequently.`,
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
        summary: `The repeater component creates a container
        to display formatted information for a list of objects.`,
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
        name: 'Spinner',
        icon: 'spinner',
        // tslint:disable-next-line
        summary: `This spinner component displays a loading animation.`,
        url: '/components/spinner',
        getCodeFiles: function () {
          return [
            {
              name: 'spinner-demo.component.html',
              fileContents: require('!!raw!./spinner/spinner-demo.component.html')
            },
            {
              name: 'spinner-demo.component.ts',
              fileContents: require('!!raw!./spinner/spinner-demo.component.ts'),
              componentName: 'SkySpinnerDemoComponent',
              bootstrapSelector: 'sky-spinner-demo'
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
        name: 'Tiles',
        icon: 'th-large',
        // tslint:disable-next-line
        summary: `Tiles provides a collapsible container that is the
        building block for pages and forms in SKY UX applications.`,
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
              folder: 'tiles',
              name: 'tiles-demo-tile1.component.ts',
              fileContents: require('!!raw!./tiles/tiles-demo-tile1.component.ts')
            },
            {
              folder: 'tiles',
              name: 'tiles-demo-tile2.component.html',
              fileContents: require('!!raw!./tiles/tiles-demo-tile2.component.html')
            },
            {
              folder: 'tiles',
              name: 'tiles-demo-tile2.component.ts',
              fileContents: require('!!raw!./tiles/tiles-demo-tile2.component.ts'),
              componentName: 'SkyTilesDemoTile2Component'
            }
          ];
        }
      },
      {
        name: 'Wizard',
        icon: 'magic',
        // tslint:disable-next-line
        summary: `The wizard adjusts a modal form to guide users through a set of pre-defined steps in a particular order.`,
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
