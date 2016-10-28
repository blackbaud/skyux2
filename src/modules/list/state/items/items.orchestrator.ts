import { ListStateOrchestrator } from '../list-state.rxstate';
import { AsyncList } from 'microedge-rxstate/core';
import * as moment from 'moment';
import { ListItemModel } from './item.model';
import {
  ListItemsSetLoadingAction, ListItemsLoadAction, ListItemsSetItemSelectedAction,
  ListItemsSetItemsSelectedAction
} from './actions';

export class ListItemsOrchestrator extends ListStateOrchestrator<AsyncList<ListItemModel>> {
  constructor() {
    super();

    this
      .register(ListItemsSetLoadingAction, this.setLoading)
      .register(ListItemsSetItemSelectedAction, this.setItemSelected)
      .register(ListItemsSetItemsSelectedAction, this.setItemsSelected)
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
    const newListItems = action.items.map(g => new ListItemModel(g.id, g.selected, g.data));

    if (action.refresh) {
      return new AsyncList<ListItemModel>(
        [...newListItems],
        action.dataChanged ? moment() : state.lastUpdate,
        false,
        state.count
      );
    }

    return new AsyncList<ListItemModel>(
      [...state.items, ...newListItems],
      action.dataChanged ? moment() : state.lastUpdate,
      false,
      action.itemCount
    );
  }

  private setItemSelected(
    state: AsyncList<ListItemModel>,
    action: ListItemsSetItemSelectedAction): AsyncList<ListItemModel> {
    const newItems = [...state.items];
    const itemIndex = newItems.findIndex(t => t.id === action.id);

    if (itemIndex > -1) {
      const oldItem = newItems[itemIndex];
      const newItem = new ListItemModel(oldItem.id, action.selected, oldItem.data);
      newItems[itemIndex] = newItem;
    }

    return new AsyncList<ListItemModel>(newItems, state.lastUpdate, state.loading, state.count);
  }

  private setItemsSelected(
    state: AsyncList<ListItemModel> ,
    action: ListItemsSetItemsSelectedAction): AsyncList<ListItemModel> {
    const newItems = state.items.map(g =>
      new ListItemModel(g.id,
        action.items.filter(c => c.id === g.id).length > 0 ? action.selected : g.selected,
        g.data
      )
    );

    return new AsyncList<ListItemModel>(newItems, state.lastUpdate, state.loading, state.count);
  }
}
