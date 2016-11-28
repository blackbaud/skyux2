import {
  Component, ContentChildren, QueryList, AfterContentInit, ChangeDetectionStrategy, Input
} from '@angular/core';
import {
  ListItemsLoadAction, ListItemsSetLoadingAction
} from './state/items/actions';
import {
  ListDisplayedItemsLoadAction, ListDisplayedItemsSetLoadingAction
} from './state/displayed-items/actions';
import {
  ListSelectedLoadAction,
  ListSelectedSetLoadingAction
} from './state/selected/actions';
import { ListSelectedModel } from './state/selected/selected.model';
import { AsyncItem } from 'microedge-rxstate/dist';
import { ListState, ListStateDispatcher } from './state';
import { Observable } from 'rxjs/Observable';
import { ListViewComponent } from './list-view.component';
import { ListPagingComponent } from './list-paging.component';
import { ListSortModel } from './state/sort/sort.model';
import { ListSearchModel } from './state/search/search.model';
import { ListFilterModel } from './state/filters/filter.model';
import { getData, compare } from './helpers';
import { getValue } from 'microedge-rxstate/dist/helpers';
import { ListViewsLoadAction, ListViewsSetActiveAction } from './state/views/actions';
import { ListViewModel } from './state/views/view.model';
import { ListItemModel } from './state/items/item.model';
import { ListSortSetFieldSelectorsAction } from './state/sort/actions';
import * as moment from 'moment';

@Component({
  selector: 'sky-list',
  template: '<ng-content></ng-content>',
  styles: [require('./list.component.scss')],
  providers: [ListState, ListStateDispatcher],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyListComponent implements AfterContentInit {
  public id: string = moment().toDate().getTime().toString();
  @Input() public data: Array<any> | Observable<Array<any>> = [];
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

  constructor(
    private state: ListState,
    private dispatcher: ListStateDispatcher
  ) {
  }

  public ngAfterContentInit() {
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

    // set sort fields
    getValue(this.sortFields, (sortFields: string[]) =>
      this.dispatcher.next(new ListSortSetFieldSelectorsAction(sortFields || []))
    );

    // load the data
    let lastItems: ListItemModel[];
    let lastSearch: ListSearchModel;
    let lastFilters: ListFilterModel[];
    let lastFilterResults: ListItemModel[];
    let lastSearchResults: ListItemModel[];
    this.dispatcher.next(new ListItemsSetLoadingAction());
    Observable.combineLatest(
      this.items.distinctUntilChanged(),
      this.state.map(s => s.sort).distinctUntilChanged(),
      this.state.map(s => s.search).distinctUntilChanged(),
      this.state.map(s => s.filters).distinctUntilChanged(),
      (items: ListItemModel[], sort: ListSortModel,
       search: ListSearchModel, filters: ListFilterModel[]) => {
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

          lastFilterResults = result;
        }

        if (!dataChanged && !searchChanged && lastSearchResults !== undefined) {
          result = lastSearchResults;
        } else if (
          (this.searchAsyncFunction !== undefined && this.forceClientSideSearch) ||
          (search.searchText !== undefined && search.searchText.length > 0)
        ) {
          let searchText = search.searchText.toLowerCase();
          let searchFunctions: any[];
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

  get items(): Observable<Array<ListItemModel>> {
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

          lastSearchData = searchResult.take(1);
          return lastSearchData;
        }

        return Observable.of(undefined);
      });

    let lastItems: ListItemModel[];
    let lastDataItems: any[];
    return Observable.combineLatest(
      data.distinctUntilChanged(),
      searchResults.distinctUntilChanged(),
      selectedIds.distinctUntilChanged(),
      (dataItems: any[], asyncSearchResults: any[], selected: Array<string>) => {
        this.dispatcher.next(new ListDisplayedItemsSetLoadingAction(false));
        let inputItems: any[] =
          asyncSearchResults !== undefined &&
          searchText !== undefined &&
          searchText.length > 0 ?
            asyncSearchResults :
            dataItems;

        let items: ListItemModel[] = [];

        inputItems.forEach(item => {
          let id = this.dataIdGenerator(item);
          if (id === undefined) {
            id = moment().toDate().getTime().toString();
          }

          items.push(new ListItemModel(id, item));
        });

        this.dispatcher.next(new ListSelectedSetLoadingAction());
        this.dispatcher.next(new ListSelectedLoadAction(selected));
        this.dispatcher.next(new ListSelectedSetLoadingAction(false));

        if (dataItems !== lastDataItems) {
          lastItems = items;
          lastDataItems = dataItems;
        }

        if (asyncSearchResults !== undefined) {
          return items;
        }

        return lastItems;
      });
  }

  get selectedItems(): Observable<Array<ListItemModel>> {
    return Observable.combineLatest(
      this.state.map(s => s.items.items).distinctUntilChanged(),
      this.state.map(s => s.selected).distinctUntilChanged(),
      (items: Array<ListItemModel>, selected: AsyncItem<ListSelectedModel>) => {
        return items.filter(i => selected.item[i.id]);
      });
  }

  get itemCount() {
    return this.state.map(s => s.displayedItems.count);
  }

  get lastUpdate() {
    return this.state.map(s =>
      s.items.lastUpdate ? moment(s.items.lastUpdate).toDate() : undefined
    );
  }

  public get views() {
    return this.listViews.toArray();
  }
}
