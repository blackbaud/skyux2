export class ListDataRequestModel {
  public pageSize: number = 10;
  public pageNumber: number = 1;

  constructor(data?: any) {
    if (data !== undefined) {
      this.pageSize = data.pageSize;
      this.pageNumber = data.pageNumber;
    }
  }
}
