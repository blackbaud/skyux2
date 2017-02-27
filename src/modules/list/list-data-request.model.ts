import { ListSearchModel } from './state/search/search.model';

export class ListDataRequestModel {
  public pageSize: number = 10;
  public pageNumber: number = 1;
  public search: ListSearchModel;

  constructor(data?: any) {
    if (data !== undefined) {
      this.pageSize = data.pageSize;
      this.pageNumber = data.pageNumber;
      this.search = data.search;
    }
  }
}
