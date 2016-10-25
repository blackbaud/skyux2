export class ListPagingConfigModel {
  public itemsPerPage: number = 10;
  public maxDisplayedPages: number = 5;

  constructor(data?: any) {
    if (data !== undefined) {
      this.itemsPerPage = data.itemsPerPage;
      this.maxDisplayedPages = data.maxDisplayedPages;
    }
  }
}
