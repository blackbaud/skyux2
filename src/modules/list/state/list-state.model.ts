import { AsyncList } from 'microedge-rxstate/dist';
import { ListPagingModel } from './paging/paging.model';
import { ListItemModel } from './items/item.model';
import { ListViewsModel } from './views/views.model';

export class ListStateModel {
  public paging: ListPagingModel = new ListPagingModel();
  public items: AsyncList<ListItemModel> = new AsyncList<ListItemModel>();
  public views: ListViewsModel = new ListViewsModel();
}
