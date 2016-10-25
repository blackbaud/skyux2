import { AsyncList } from 'microedge-rxstate/core';
import { ListToolbarConfigModel } from './config/config.model';
import { ListToolbarItemModel } from './items/item.model';

export class ListToolbarStateModel {
  public items: AsyncList<ListToolbarItemModel> = new AsyncList<ListToolbarItemModel>();
  public config: ListToolbarConfigModel = new ListToolbarConfigModel();
}
