import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnInit
} from '@angular/core';

import {
  Router
} from '@angular/router';

import {
  AsyncList
} from 'microedge-rxstate';

import {
  ListViewComponent
} from '../list';

import {
  getData
} from '../list/helpers';

import {
  ListState,
  ListItemModel,
  ListStateDispatcher
} from '../list/state';

import {
  ListToolbarSetTypeAction
} from '../list/state/toolbar/actions';

import {
  SkyListViewActionButtonStateModel
} from './state';

export type SkyListViewActionButtonSearchFunction =
  (data: any, searchText: string) => boolean;

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
    SkyListViewActionButtonStateModel
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyListViewActionButtonComponent extends ListViewComponent implements OnInit {
  @Input()
  public search: SkyListViewActionButtonSearchFunction;
  public items: ListItemModel[];
  public searchText: string;

  constructor(
    public state: ListState,
    private router: Router,
    private dispatcher: ListStateDispatcher,
    private changeDetector: ChangeDetectorRef
  ) {
    super(state, 'Action Button View');
    this.search = this.getDefaultSearchFunction();
  }

  public ngOnInit(): void {
    this.getItems();

    this.dispatcher.searchSetFunctions([this.search]);
    this.dispatcher.next(new ListToolbarSetTypeAction('search-bar'));
  }

  public navigate(route: string): void {
    if (route !== undefined) {
      this.router.navigate([route]);
    }
  }

  private getItems(): void {
    this.state
      .map(s => s.items)
      .distinctUntilChanged()
      .subscribe((list: AsyncList<ListItemModel>) => {
        if (list.lastUpdate) {
          this.items = list.items;
          this.changeDetector.detectChanges();
        }
      });
  }

  private getDefaultSearchFunction(): SkyListViewActionButtonSearchFunction {
    return (data: any, searchText: string) => {
      const query = searchText.toLowerCase();
      const title = (getData(data, 'title') || '').toLowerCase();

      this.searchText = searchText;

      if (title.match(query)) {
        return true;
      }

      return false;
    };
  }
}
