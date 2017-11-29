import {
  Component
} from '@angular/core';

import {
  Observable
} from 'rxjs/Observable';

import {
  SkyListViewActionButtonItemModel
} from '../../../modules/list-view-action-button/state/items';

@Component({
  selector: 'sky-list-view-action-button-demo',
  templateUrl: './list-view-action-button-demo.component.html'
})
export class SkyListViewActionButtonDemoComponent {
  public items: Observable<SkyListViewActionButtonItemModel[]> = Observable.of([
    {
      title: 'Some title',
      summary: 'This is a summary.',
      route: '/home',
      icon: 'circle'
    },
    {
      title: 'Duis arcu enim lobortis at augue',
      summary: 'This is a summary.',
      route: '/home',
      icon: 'circle'
    },
    {
      title: 'Some title',
      summary: 'This is a summary.',
      route: '/home',
      icon: 'circle'
    },
    {
      title: 'Nam vel rhoncus lacus',
      summary: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'Phasellus nec bibendum felis. Duis arcu enim, tincidunt non',
        'condimentum et, lobortis at augue.'
      ].join(' '),
      route: '/home',
      icon: 'circle'
    },
    {
      title: 'Some title',
      summary: 'This is a summary.',
      route: '/home',
      icon: 'circle'
    },
    {
      title: 'Duis arcu enim lobortis at augue',
      summary: 'This is a summary.',
      route: '/home',
      icon: 'circle'
    },
    {
      title: 'Some title',
      summary: 'This is a summary.',
      route: '/home',
      icon: 'circle'
    },
    {
      title: 'Nam vel rhoncus lacus',
      summary: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'Phasellus nec bibendum felis. Duis arcu enim, tincidunt non',
        'condimentum et, lobortis at augue.'
      ].join(' '),
      route: '/home',
      icon: 'circle'
    }
  ]);
}
