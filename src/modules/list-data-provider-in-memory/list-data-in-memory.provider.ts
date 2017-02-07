import { Observable, BehaviorSubject } from 'rxjs';
import { ListDataProvider } from '../list/list-data.provider';
import { ListDataRequestModel } from '../list/list-data-request.model';
import { ListDataResponseModel } from '../list/list-data-response.model';
import { ListItemModel } from '../list/state/items/item.model';
import { ListSearchModel } from '../list/state/search/search.model';

let moment = require('moment');

export class SkyListInMemoryDataProvider extends ListDataProvider {
  private items: BehaviorSubject<Array<ListItemModel>> =
    new BehaviorSubject<Array<ListItemModel>>([]);

  private lastItems: ListItemModel[];
  private lastSearch: ListSearchModel;
  private lastSearchResults: ListItemModel[];
  private searchFunction: (data: any, searchText: string) => boolean;

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
        let itemStart = (request.pageNumber - 1) * request.pageSize;
        let pagedResult = result.slice(itemStart, itemStart + request.pageSize);

        return new ListDataResponseModel({
          count: result.length,
          items: pagedResult
        });
    });
  }

  private filteredItems(request: ListDataRequestModel): Observable<Array<ListItemModel>> {
    return this.items.map(items => {
      let dataChanged = false;
      let search = request.search;

      if (this.lastItems === undefined || this.lastItems !== items) {
        dataChanged = true;
        this.lastItems = items;
      }

      let searchChanged = false;
      if (this.lastSearch === undefined || this.lastSearch !== search) {
        searchChanged = true;
        this.lastSearch = search;
      }

      let result = items;

      /* ignore if until multiple different types of filtering can occur */
      /* istanbul ignore next */
      if (!dataChanged && !searchChanged && this.lastSearchResults !== undefined) {
        result = this.lastSearchResults;
      } else if (search.searchText !== undefined && search.searchText.length > 0) {
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
      }

      return result;
    });
  }
}
