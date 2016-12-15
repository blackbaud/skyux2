import { ListFilterModel } from './state/filters/filter.model';
import { ListPagingModel } from './state/paging/paging.model';
import { ListSearchModel } from './state/search/search.model';
import { ListSortModel } from './state/sort/sort.model';

export class ListDataRequestModel {
  public filters: ListFilterModel[];
  public paging: ListPagingModel;
  public search: ListSearchModel;
  public sort: ListSortModel;

  constructor(data?: any) {
    if (data !== undefined) {
      this.filters = data.filters;
      this.paging = data.paging;
      this.search = data.search;
      this.sort = data.sort;
    }
  }
}
