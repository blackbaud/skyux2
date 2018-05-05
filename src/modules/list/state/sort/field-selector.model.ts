export class ListSortFieldSelectorModel {
  public fieldSelector: string;
  public descending = false;

  constructor(data?: any) {
    if (data) {
      this.fieldSelector = data.fieldSelector;
      this.descending = data.descending;
    }
  }
}
