import {
  Component, ContentChildren, QueryList, AfterContentInit, ChangeDetectionStrategy, Input
} from '@angular/core';
import {
  ListItemsLoadAction, ListItemsSetLoadingAction
} from './state/items/actions';

import { ListDataResponseModel } from './list-data-response.model';
import { ListDataProvider } from './list-data.provider';
import { SkyListInMemoryDataProvider } from '../list-data-provider-in-memory';
import { AsyncItem } from 'microedge-rxstate/dist';
import { ListState, ListStateDispatcher } from './state';
import { Observable } from 'rxjs/Observable';
import { ListViewComponent } from './list-view.component';

import {
  ListViewsLoadAction,
  ListViewsSetActiveAction
} from './state/views/actions';

import { getValue } from 'microedge-rxstate/dist/helpers';
import { ListViewModel } from './state/views/view.model';
import { ListItemModel } from './state/items/item.model';
let moment = require('moment');

@Component({
  selector: 'sky-list',
  template: '<ng-content></ng-content>',
  styles: [require('./list.component.scss')],
  providers: [ListState, ListStateDispatcher],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyListComponent implements AfterContentInit {
  public id: string = moment().toDate().getTime().toString();
  @Input()
  public data?: Array<any> | Observable<Array<any>> = [];

  @Input()
  public dataProvider?: ListDataProvider;

  @Input()
  public defaultView?: ListViewComponent;

  @Input()
  public initialTotal?: number;

  @Input()
  public selectedIds: Array<string> | Observable<Array<string>>;
  @Input()
  public sortFields?: string | Array<string> | Observable<Array<string>> | Observable<string>;

  /* tslint:disable-next-line */
  @Input('search')
  private searchFunction: (data: any, searchText: string) => boolean;
  private dataFirstLoad: boolean = false;

  @ContentChildren(ListViewComponent)
  private listViews: QueryList<ListViewComponent>;

  constructor(
    private state: ListState,
    private dispatcher: ListStateDispatcher
  ) {}

  public ngAfterContentInit() {
    if (this.data && this.dataProvider && this.initialTotal) {
      this.dataFirstLoad = true;
    }

    if (this.listViews.length > 0) {
      let defaultView: ListViewComponent =
        (this.defaultView === undefined) ? this.listViews.first : this.defaultView;

      this.dispatcher.next(
        new ListViewsLoadAction(this.listViews.map(v => new ListViewModel(v.id, v.label)))
      );

      // activate the default view
      this.dispatcher.next(new ListViewsSetActiveAction(defaultView.id));
    } else {
      return;
    }

    this.displayedItems.subscribe(result => {
      this.dispatcher.next(new ListItemsSetLoadingAction());
      this.dispatcher.next(new ListItemsLoadAction(result.items, true, true, result.count));
    });
  }

  public refreshDisplayedItems(): void {
    this.displayedItems.take(1).subscribe(result => {
      this.dispatcher.next(new ListItemsSetLoadingAction());
      this.dispatcher.next(new ListItemsLoadAction(result.items, true, true, result.count));
    });
  }

  get displayedItems(): Observable<ListDataResponseModel> {
    if (!this.data && !this.dataProvider) {
      throw new Error('List requires data or dataProvider to be set.');
    }

    let data: any = this.data;
    if (!(this.data instanceof Observable)) {
      data = Observable.of(this.data);
    }

    if (!this.dataProvider) {
      this.dataProvider = new SkyListInMemoryDataProvider(data, this.searchFunction);
    }

    // deal with selected items
    let selectedIds: any = this.selectedIds || Observable.of([]);
  if (!(selectedIds instanceof Observable)) {
      selectedIds = Observable.of(selectedIds);
    }

    let selectedChanged: boolean = false;

    return Observable.combineLatest(
      this.state.map(s => s.paging.itemsPerPage).distinctUntilChanged(),
      this.state.map(s => s.paging.pageNumber).distinctUntilChanged(),
      data.distinctUntilChanged(),
      (
        itemsPerPage: number,
        pageNumber: number,
        itemsData: Array<any>
      ) => {

        let response: Observable<ListDataResponseModel>;
        if (this.dataFirstLoad) {
          this.dataFirstLoad = false;
          let initialItems = itemsData.map(d =>
            new ListItemModel(d.id || moment().toDate().getTime().toString(), d));
          response = Observable.of(new ListDataResponseModel({
            count: this.initialTotal,
            items: initialItems
          }));
        } else {
          response = this.dataProvider.get(new ListDataRequestModel({
            pageSize: itemsPerPage,
            pageNumber: pageNumber
          }));
        }

        return response;
      })
      .flatMap((o: any[], index: number) => o);
  }

public get selectedItems(): Observable<Array<ListItemModel>> {
    return Observable.combineLatest(
    this.state.map(s => s.items.items).distinctUntilChanged(),
    this.state.map(s => s.selected).distinctUntilChanged(),
    (items: Array<ListItemModel>, selected: AsyncItem<ListSelectedModel>) => {
        return items.filter(i => selected.item[i.id]);
      });
  }

  public get lastUpdate() {
    return this.state.map(s =>
      s.items.lastUpdate ? moment(s.items.lastUpdate).toDate() : undefined
    );
  }

  public get views() {
    return this.listViews.toArray();
  }

  public get itemCount() {
    return this.dataProvider.count();
  }
}
