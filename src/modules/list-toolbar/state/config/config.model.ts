export class ListToolbarConfigModel {
  public searchEnabled: boolean = true;
  public filterEnabled: boolean = true;
  public viewSelectorEnabled: boolean = true;
  public sortSelectorEnabled: boolean = true;

  constructor(data?: any) {
    if (data) {
      this.searchEnabled = data.searchEnabled;
      this.filterEnabled = data.filterEnabled;
      this.viewSelectorEnabled = data.viewSelectorEnabled;
      this.sortSelectorEnabled = data.sortSelectorEnabled;
    }
  }
}
