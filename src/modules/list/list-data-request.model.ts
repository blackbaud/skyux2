import { ListSearchModel } from './state/search/search.model';
import { ListSortModel } from './state/sort/sort.model';

export class ListDataRequestModel {
  public pageSize: number = 10;
  public pageNumber: number = 1;
  public search: ListSearchModel;
  public sort: ListSortModel;

  constructor(data?: any) {
    if (data !== undefined) {
      this.pageSize = data.pageSize;
      this.pageNumber = data.pageNumber;
      this.search = data.search;
      this.sort = data.sort;
    }
  }
}
