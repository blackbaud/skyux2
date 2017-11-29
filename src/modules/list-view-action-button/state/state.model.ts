import {
  AsyncList
} from 'microedge-rxstate/dist';

import {
  SkyListViewActionButtonItemModel
} from './item.model';

export class SkyListViewActionButtonStateModel {
  public items: AsyncList<SkyListViewActionButtonItemModel> = new AsyncList<SkyListViewActionButtonItemModel>();
}
