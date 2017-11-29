import {
  Component
} from '@angular/core';

import {
  Observable
} from 'rxjs/Observable';

@Component({
  selector: 'sky-list-view-action-button-demo',
  templateUrl: './list-view-action-button-demo.component.html'
})
export class SkyListViewActionButtonDemoComponent {
  public items: Observable<any[]> = Observable.of([
    {
      title: 'Rock',
      summary: 'Enter a description of what to find at the navigation item.',
      route: '/',
      icon: 'hand-rock-o'
    },
    {
      title: 'Paper',
      summary: 'Keep the length relatively short.',
      route: '/',
      icon: 'hand-paper-o'
    },
    {
      title: 'Scissors',
      summary: 'Write the description with a positive verb about what the user can do on the next page.',
      route: '/',
      icon: 'hand-scissors-o'
    }
  ]);
}
