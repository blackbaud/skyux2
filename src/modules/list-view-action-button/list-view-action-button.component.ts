import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  forwardRef
} from '@angular/core';

import {
  Router
} from '@angular/router';

import {
  AsyncList
} from 'microedge-rxstate';

// import {
//   Observable
// } from 'rxjs/Observable';

import {
  ListViewComponent
} from '../list';

import {
  SkyListViewActionButtonItemModel
} from './state/items';

import {
  ListState
  // ListStateModel
  // ListItemModel
  // ListStateDispatcher
} from '../list/state';

import {
  // SkyListViewActionButtonState,
  // SkyListViewActionButtonStateDispatcher,
  SkyListViewActionButtonStateModel
} from './state';

@Component({
  selector: 'sky-list-view-action-button',
  templateUrl: './list-view-action-button.component.html',
  styleUrls: ['./list-view-action-button.component.scss'],
  providers: [
    /* tslint:disable:no-forward-ref */
    {
      provide: ListViewComponent,
      useExisting: forwardRef(() => SkyListViewActionButtonComponent)
    },
    /* tslint:enable */
    // SkyListViewActionButtonState,
    // SkyListViewActionButtonStateDispatcher,
    SkyListViewActionButtonStateModel
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyListViewActionButtonComponent
  extends ListViewComponent implements AfterContentInit {

  public items: any[];

  constructor(
    public state: ListState,
    private router: Router
    // private dispatcher: ListStateDispatcher,
    // private checklistState: ChecklistState,
    // private checklistDispatcher: ChecklistStateDispatcher
  ) {
    super(state, 'Action Button View');
  }

  public ngAfterContentInit() {
    this.getItems();
  }

  public navigate(route: string) {
    if (route === undefined) {
      return;
    }

    this.router.navigate([route]);
  }

  private getItems() {
    this.state
      .map(s => s.items)
      .distinctUntilChanged()
      .subscribe((list: AsyncList<SkyListViewActionButtonItemModel>) => {
        if (list.lastUpdate) {
          this.items = list.items;
        }
      });
  }
}
