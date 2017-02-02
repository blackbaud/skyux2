import { ListToolbarItemModel } from './toolbar-item.model';

export class ListToolbarModel {
  public exists: boolean;
  public items: ListToolbarItemModel[] = [];

  constructor(data?: any) {
    if (data) {
      this.exists = data.exists;
      this.items = data.items;
    }
  }
}
