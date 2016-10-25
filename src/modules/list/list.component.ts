import {
  Component, ContentChildren, QueryList, AfterContentInit, ChangeDetectionStrategy,
  Input, OnInit
} from '@angular/core';
import { ListState, ListStateDispatcher, ListStateModel } from './state';
import { Observable } from 'rxjs/Observable';
import { ListViewComponent } from './list-view.component';
import { ListPagingComponent } from './list-paging.component';
import { SkyListToolbarComponent } from '../list-toolbar/list-toolbar.component';
import { SkyListFiltersComponent } from '../list-filters/list-filters.component';
import { getData, compare } from './helpers';
import { getValue } from 'microedge-rxstate/helpers';
const moment = require('moment');

import {
  ListItemsLoadAction, ListItemsSetLoadingAction, ListItemsSetItemsSelectedAction
} from './state/items/actions';
import {
  ListDisplayedItemsLoadAction, ListDisplayedItemsSetLoadingAction
} from './state/displayed-items/actions';
import { ListViewsLoadAction, ListViewsSetActiveAction } from './state/views/actions';
import { ListViewModel } from './state/views/view.model';
import { ListItemModel } from './state/items/item.model';
import { ListSortSetFieldSelectorsAction } from './state/sort/actions';

@Component({
  selector: 'sky-list',
  template: '<ng-content></ng-content>',
  styleUrls: ['./list.component.scss'],
  providers: [ListState, ListStateDispatcher, ListStateModel],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyListComponent implements AfterContentInit, OnInit {
  public id: string = moment().toDate().getTime();
  @Input() public data: Array<any> | Observable<Array<any>>;
  @Input() public defaultView?: ListViewComponent;
  @Input() public selectedIds: Array<string> | Observable<Array<string>>;
  @Input()
  public sortFields?: string | Array<string> | Observable<Array<string>> | Observable<string>;
  @Input() public dataIdGenerator: (item: any) => string = (item: any) => item.id;

  /* tslint:disable */
  @Input('search') private searchFunction: (data: any, searchText: string) => boolean;
  // experimental feature: async (server-side) search functionality
  @Input('searchAsync')
  private searchAsyncFunction: (searchText: string) => Observable<Array<any>> | Promise<Array<any>>;
  @Input() private forceClientSideSearch: boolean = false;
  /* tslint:enable */

  @ContentChildren(ListViewComponent) private listViews: QueryList<ListViewComponent>;
  @ContentChildren(ListPagingComponent) private listPaging: QueryList<ListPagingComponent>;
  @ContentChildren(SkyListToolbarComponent) private listToolbar: QueryList<SkyListToolbarComponent>;
  @ContentChildren(SkyListFiltersComponent) private listFilters: QueryList<SkyListFiltersComponent>;

  constructor(
    private state: ListState,
    private dispatcher: ListStateDispatcher
  ) {
  }

  public ngOnInit() {
    // transform provided data into ListItemModels
    if (this.data === undefined) {
      throw new Error('You must supply the [data] attribute with a value for the list to function');
    }
  }

  public ngAfterContentInit() {
    let defaultView: ListViewComponent = this.defaultView;
    if (defaultView === undefined) {
      if (this.listViews.length > 0) {
        defaultView = this.listViews.first;
        this.dispatcher.next(
          new ListViewsLoadAction(this.listViews.map(v => new ListViewModel(v.id, v.label)))
        );
      } else {
        throw new Error('sky-list requires at least one list view component to render');
      }
    }

    if (this.listPaging.length > 1) {
      throw new Error('sky-list only allows for a single paging component at once');
    }

    if (this.listToolbar.length > 1) {
      throw new Error('sky-list only allows for a single toolbar component at once');
    }

    // pass list reference into child controls
    this.listViews.forEach(listView => listView.onListInit(this));
    this.listToolbar.forEach(listToolbar => listToolbar.onListInit(this));
    this.listFilters.forEach(listFilter => listFilter.onListInit(this));
    this.listPaging.forEach(listPaging => listPaging.onListInit(this));

    // activate the default view
    this.dispatcher.next(new ListViewsSetActiveAction(defaultView.id));

    // set sort fields
    getValue(this.sortFields, sortFields =>
      this.dispatcher.next(new ListSortSetFieldSelectorsAction(sortFields || []))
    );

    // load the data
    let lastItems;
    let lastSearch;
    let lastFilters;
    let lastFilterResults;
    let lastSearchResults;
    this.dispatcher.next(new ListItemsSetLoadingAction());
    Observable.combineLatest(
      this.items.distinctUntilChanged(),
      this.state.map(s => s.sort).distinctUntilChanged(),
      this.state.map(s => s.search).distinctUntilChanged(),
      this.state.map(s => s.filters).distinctUntilChanged(),
      (items: Array<any>, sort, search, filters: Array<any>) => {
        let dataChanged = false;
        if (lastItems === undefined || lastItems !== items) {
          dataChanged = true;
          lastItems = items;
        }

        let searchChanged = false;
        if (lastSearch === undefined || lastSearch !== search) {
          searchChanged = true;
          lastSearch = search;
        }

        let filtersChanged = false;
        if (lastFilters === undefined || lastFilters !== filters) {
          filtersChanged = true;
          lastFilters = filters;
        }

        let result = items;
        if (!dataChanged && !filtersChanged && lastFilterResults !== undefined) {
          result = lastFilterResults;
        } else if (filters.length > 0) {
          result = result.filter(item => {
            for (let i = 0; i < filters.length; i++) {
              let filter = filters[i];
              if (filter.filterModel.value === undefined || filter.filterModel.value === '') {
                continue;
              }

              if (!filter.filterFunction(item, filter.filterModel)) {
                return false;
              }
            }

            return true;
          });
        }

        if (!dataChanged && !searchChanged && lastSearchResults !== undefined) {
          result = lastSearchResults;
        } else if (
          (this.searchAsyncFunction !== undefined && this.forceClientSideSearch) ||
          (search.searchText !== undefined && search.searchText.length > 0)
        ) {
          let searchText = search.searchText.toLowerCase();
          let searchFunctions;
          if (this.searchFunction !== undefined) {
            searchFunctions = [this.searchFunction];
          } else {
            searchFunctions = search.functions;
          }

          result = result.filter(item => {
            let isMatch = false;

            for (let i = 0; i < searchFunctions.length; i++) {
              let searchFunction = searchFunctions[i];
              let searchResult = searchFunction(item.data, searchText);
              if (
                (typeof searchResult === 'string' && searchResult.indexOf(searchText) !== -1) ||
                searchResult === true
              ) {
                isMatch = true;
                break;
              }
            }

            return isMatch;
          });

          lastSearchResults = result;
        }

        if (sort.fieldSelectors.length > 0) {
          result = result.slice().sort((item1, item2) => {
            let r = 0;
            for (let i = 0; i < sort.fieldSelectors.length; i++) {
              let selector = sort.fieldSelectors[i];
              let value1 = getData(item1.data, selector.fieldSelector);
              let value2 = getData(item2.data, selector.fieldSelector);
              r = compare(value1, value2);
              if (selector.descending && r !== 0) {
                r *= -1;
              }

              if (r !== 0) {
                break;
              }
            }

            return r;
          });
        }

        this.dispatcher.next(new ListItemsLoadAction(result, true, dataChanged));
        if (this.listPaging.length === 0) {
          this.dispatcher.next(new ListDisplayedItemsLoadAction(result));
        }
      }
    )
    .subscribe();
  }

  get hasToolbar() {
    return this.listToolbar.length > 0;
  }

  get items(): Observable<Array<any>> {
    let data: any = this.data;
    if (!(this.data instanceof Observable)) {
      data = Observable.of(this.data);
    }

    // deal with selected items
    let selectedIds: any = this.selectedIds || Observable.of([]);
    if (!(selectedIds instanceof Observable)) {
      selectedIds = Observable.of(selectedIds);
    }

    let searchText: string;
    let lastSearchData: Observable<Array<any>>;
    let searchResults = this.state.map(s => s.search)
      .distinctUntilChanged()
      .flatMap(search => {
        if (search.searchText === searchText && lastSearchData !== undefined) {
          return lastSearchData;
        }

        searchText = search.searchText;
        if (searchText !== undefined && searchText.length > 0 && this.searchAsyncFunction) {
          this.dispatcher.next(new ListDisplayedItemsSetLoadingAction());
          let searchResult: any = this.searchAsyncFunction(searchText);
          if (typeof searchResult.then === 'function') {
            searchResult = Observable.fromPromise(searchResult);
          }

          lastSearchData = searchResult.take(1);
          return lastSearchData;
        }

        return Observable.of(undefined);
      });

    let lastItems;
    let lastDataItems;
    let lastDate;
    return Observable.combineLatest(
      data.distinctUntilChanged(),
      searchResults.distinctUntilChanged(),
      selectedIds.distinctUntilChanged(),
      (dataItems, asyncSearchResults, selected: Array<string>) => {
        this.dispatcher.next(new ListDisplayedItemsSetLoadingAction(false));
        let inputItems =
          asyncSearchResults !== undefined &&
          searchText !== undefined &&
          searchText.length > 0 ?
            asyncSearchResults :
            dataItems;

        let items = [];

        inputItems.forEach(item => {
          let id = this.dataIdGenerator(item);
          if (id === undefined) {
            id = moment().toDate().getTime();
          }

          items.push(new ListItemModel(id, selected.indexOf(id) !== -1, item));
        });

        if (dataItems !== lastDataItems) {
          lastDate = new Date();
          lastItems = items;
        }

        return lastItems;
      });
  }

  get selectedItems(): Observable<Array<any>> {
    return this.state.map(s => s.items.items.filter(x => x.selected));
  }

  get itemCount() {
    return this.state.map(s => s.displayedItems.count);
  }

  get lastUpdate() {
    return this.state.map(s =>
      s.items.lastUpdate ? moment(s.items.lastUpdate).toDate() : undefined
    );
  }

  get toolbarDispatcher() {
    if (this.listToolbar.length > 0) {
      return this.listToolbar.first.toolbarDispatcher;
    }

    return undefined;
  }

  public clearSelections() {
    this.state.map(s => s.items.items)
      .take(1)
      .subscribe(items => {
        this.dispatcher.next(new ListItemsSetItemsSelectedAction(items, false));
      });
  }

  public selectAll() {
    this.state.map(s => s.items.items)
      .take(1)
      .subscribe(items => {
        this.dispatcher.next(new ListItemsSetItemsSelectedAction(items, true));
      });
  }

  public get views() {
    return this.listViews.toArray();
  }
}
