import { ListItemModel } from './item.model';

export class ListItemsSetItemsSelectedAction {
  constructor(public items: ListItemModel[], public selected: boolean = false) {}
}
