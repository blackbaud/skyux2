import { ListToolbarItemModel } from './toolbar-item.model';

export class ListToolbarModel {
  public exists: boolean;
  public items: ListToolbarItemModel[] = [];
  public type: string;

  constructor(data?: any) {
    if (data) {
      this.exists = data.exists;
      this.items = data.items;
      this.type = data.type;
    }
  }
}
