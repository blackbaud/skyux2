export class ListPagingCurrentModel {
  public pageCount: number = 0;
  public pageNumber: number = 1;
  public displayedPages: number[] = [];

  constructor(data?: any) {
    if (data !== undefined) {
      this.pageCount = data.pageCount;
      this.pageNumber = data.pageNumber;
      this.displayedPages = data.displayedPages;
    }
  }
}
