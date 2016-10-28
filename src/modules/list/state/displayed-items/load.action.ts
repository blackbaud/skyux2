import { ListItemModel } from '../items/item.model';

export class ListDisplayedItemsLoadAction {
  constructor(public items: ListItemModel[], public itemCount: number = items.length) {}
}
