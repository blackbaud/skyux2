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
      }
    ];
  }
}
