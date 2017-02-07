export class ListToolbarConfigModel {
  public searchEnabled: boolean = true;

  constructor(data?: any) {
    if (data) {
      this.searchEnabled = data.searchEnabled;
    }
  }
}
