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
        url: '/components/alert'
      },
      {
        name: 'Avatar',
        icon: 'user',
        // tslint:disable-next-line
        summary: `The avatar component displays an image with an option to let users change the image.`,
        url: '/components/avatar'
      },
      {
        name: 'Tiles',
        icon: 'th-large',
        // tslint:disable-next-line
        summary: `Tiles provides a collapsible container that is the building block for pages and forms in SKY UX applications.`,
        url: '/components/tiles'
      }
    ];
  }
}
