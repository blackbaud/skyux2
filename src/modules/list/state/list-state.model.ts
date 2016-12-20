import { AsyncList, AsyncItem } from 'microedge-rxstate/dist';
import { ListPagingModel } from './paging/paging.model';
import { ListItemModel } from './items/item.model';

export class ListStateModel {
  public paging: ListPagingModel = new ListPagingModel();
  public items: AsyncList<ListItemModel> = new AsyncList<ListItemModel>();
}
