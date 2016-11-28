export class ListSearchModel {
  public searchText: string = '';
  public functions: Array<(data: any, searchText: string) => boolean> = [];

  constructor(data?: any) {
    if (data) {
      this.searchText = data.searchText;
      this.functions = [...data.functions];
    }
  }
}
