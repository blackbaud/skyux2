export class ListItemModel {
  public id: string;
  public selected: boolean = false;
  public data: any;

  constructor(id: string, selected: boolean, data?: any) {
    if (id === undefined) {
      throw new Error('All list item models require an ID');
    }

    this.id = id;
    this.selected = selected;
    if (data !== undefined) {
      this.data = data;
    }
  }
}
