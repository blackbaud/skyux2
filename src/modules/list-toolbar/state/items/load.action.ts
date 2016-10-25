import { ListToolbarItemModel } from './item.model';

export class ListToolbarItemsLoadAction {
  constructor(public items: ListToolbarItemModel[], public index: number = -1) {
  }
}
