import { ListStateOrchestrator } from '../list-state.rxstate';
import { AsyncList } from 'microedge-rxstate/dist';
import * as moment from 'moment';
import { ListItemModel } from './item.model';
import {
  ListItemsSetLoadingAction, ListItemsLoadAction
} from './actions';

export class ListItemsOrchestrator extends ListStateOrchestrator<AsyncList<ListItemModel>> {
  constructor() {
    super();

    this
      .register(ListItemsSetLoadingAction, this.setLoading)
      .register(ListItemsLoadAction, this.load);
  }

  private setLoading(
    state: AsyncList<ListItemModel>,
    action: ListItemsSetLoadingAction): AsyncList<ListItemModel> {
    return new AsyncList<ListItemModel>(state.items, state.lastUpdate, action.loading, state.count);
  }

  private load(
    state: AsyncList<ListItemModel>,
    action: ListItemsLoadAction): AsyncList<ListItemModel> {
    const newListItems = action.items.map(g => new ListItemModel(g.id, g.data));

    if (action.refresh) {
      return new AsyncList<ListItemModel>(
        [...newListItems],
        action.dataChanged ? moment() : state.lastUpdate,
        false,
        newListItems.length
      );
    }

    return new AsyncList<ListItemModel>(
      [...state.items, ...newListItems],
      action.dataChanged ? moment() : state.lastUpdate,
      false,
      action.itemCount
    );
  }
}
