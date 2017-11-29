import {
  AsyncList
} from 'microedge-rxstate/dist';

import {
  SkyListViewActionButtonItemModel
} from './items/item.model';

export class SkyListViewActionButtonStateModel {
  public items: AsyncList<SkyListViewActionButtonItemModel> = new AsyncList<SkyListViewActionButtonItemModel>();
}
