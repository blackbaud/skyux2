import { ListStateOrchestrator } from '../list-state.rxstate';
import { AsyncList } from 'microedge-rxstate/dist';
import * as moment from 'moment';
import { ListItemModel } from '../items/item.model';
import { ListDisplayedItemsLoadAction, ListDisplayedItemsSetLoadingAction } from './actions';

export class ListDisplayedItemsOrchestrator
  extends ListStateOrchestrator<AsyncList<ListItemModel>> {
  constructor() {
    super();

    this
      .register(ListDisplayedItemsSetLoadingAction, this.setLoading)
      .register(ListDisplayedItemsLoadAction, this.load);
  }

  private setLoading(
    state: AsyncList<ListItemModel>,
    action: ListDisplayedItemsSetLoadingAction): AsyncList<ListItemModel> {
    return new AsyncList<ListItemModel>(state.items, state.lastUpdate, action.loading, state.count);
  }

  private load(
    state: AsyncList<ListItemModel>,
    action: ListDisplayedItemsLoadAction): AsyncList<ListItemModel> {
    const newListItems = action.items.map(g => new ListItemModel(g.id, g.data));
    return new AsyncList<ListItemModel>(
      [...newListItems],
      moment(),
      state.loading,
      action.itemCount
    );
  }
}
