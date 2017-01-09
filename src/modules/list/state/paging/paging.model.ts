export class ListPagingModel {
  public itemsPerPage: number = 10;
  public maxDisplayedPages: number = 5;
  public pageCount: number = 0;
  public pageNumber: number = 1;
  public displayedPages: number[] = [];

  constructor(data?: any) {
    if (data !== undefined) {
      this.itemsPerPage = data.itemsPerPage;
      this.maxDisplayedPages = data.maxDisplayedPages;
      this.pageCount = data.pageCount;
      this.pageNumber = data.pageNumber;
      this.displayedPages = data.displayedPages;
    }
  }
}
