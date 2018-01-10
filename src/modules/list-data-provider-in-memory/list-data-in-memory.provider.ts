import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ListDataProvider } from '../list/list-data.provider';
import { ListDataRequestModel } from '../list/list-data-request.model';
import { ListDataResponseModel } from '../list/list-data-response.model';
import { ListItemModel } from '../list/state/items/item.model';
import { ListSearchModel } from '../list/state/search/search.model';
import { ListFilterModel } from '../list/state/filters/filter.model';

import {
  compare,
  getData
} from '../list/helpers';

let moment = require('moment');

export class SkyListInMemoryDataProvider extends ListDataProvider {
  public items: BehaviorSubject<Array<ListItemModel>> =
    new BehaviorSubject<Array<ListItemModel>>([]);

  private lastItems: ListItemModel[];
  private lastSearch: ListSearchModel;
  private lastSearchResults: ListItemModel[];
  private searchFunction: (data: any, searchText: string) => boolean;

  private lastFilters: ListFilterModel[];
  private lastFilterResults: ListItemModel[];

  constructor(
    data?: Observable<Array<any>>,
    searchFunction?: (data: any, searchText: string) => boolean
  ) {
    super(data);

    this.searchFunction = searchFunction;

    if (data) {
      data.subscribe(items => {
        this.items.next(items.map(d =>
          new ListItemModel(d.id || moment().toDate().getTime().toString() , d)
        ));
      });
    }
  }

  public count(): Observable<number> {
    return this.items.map((items) => items.length);
  }

  public get(request: ListDataRequestModel): Observable<ListDataResponseModel> {
    return this.filteredItems(request).map((result: Array<ListItemModel>) => {
        if (request.pageNumber && request.pageSize) {
          let itemStart = (request.pageNumber - 1) * request.pageSize;
          let pagedResult = result.slice(itemStart, itemStart + request.pageSize);
          return new ListDataResponseModel({
            count: result.length,
            items: pagedResult
          });
        } else {
          return new ListDataResponseModel({
            count: result.length,
            items: result
          });
        }

    });
  }

  private filteredItems(request: ListDataRequestModel): Observable<Array<ListItemModel>> {
    return this.items.map(items => {
      let dataChanged = false;
      let search = request.search;
      let sort = request.sort;
      let filters = request.filters;

      if (this.lastItems === undefined || this.lastItems !== items) {
        dataChanged = true;
        this.lastItems = items;
      }

      let searchChanged = false;
      if (this.lastSearch === undefined || this.lastSearch !== search) {
        searchChanged = true;
        this.lastSearch = search;
      }

      let filtersChanged = false;

      if (this.lastFilters === undefined || this.lastFilters !== filters) {
        filtersChanged = true;
        this.lastFilters = filters;
      }

      let result = items;

      if (!dataChanged && !filtersChanged && this.lastFilterResults !== undefined) {
        result = this.lastFilterResults;
      } else if (filters && filters.length > 0) {
        result = result.filter(item => {
          for (let i = 0; i < filters.length; i++) {
            let filter = filters[i];
            if (filter.value === undefined ||
              filter.value === '' ||
              filter.value === false ||
              filter.value === filter.defaultValue) {
              continue;
            }

            if (!filter.filterFunction(item, filter.value)) {
              return false;
            }
          }
          return true;
        });

        this.lastFilterResults = result;
      } else {
        this.lastFilterResults = undefined;
      }

      if (!dataChanged && !searchChanged && this.lastSearchResults !== undefined) {
        result = this.lastSearchResults;
      } else if (search && search.searchText !== undefined && search.searchText.length > 0) {
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

        this.lastSearchResults = result;
      } else {
        this.lastSearchResults = undefined;
      }

      if (sort && sort.fieldSelectors.length > 0) {
        result = result.slice().sort((item1: ListItemModel, item2: ListItemModel) => {
          let compareResult = 0;
          for (let i = 0; i < sort.fieldSelectors.length; i++) {
            let selector = sort.fieldSelectors[i];
            let value1 = getData(item1.data, selector.fieldSelector);
            let value2 = getData(item2.data, selector.fieldSelector);

            compareResult = compare(value1, value2);

            if (selector.descending && compareResult !== 0) {
              compareResult *= -1;
            }

            if (compareResult !== 0) {
              break;
            }
          }

          return compareResult;
        });
      }
      return result;
    });
  }
}
