import { ListStateOrchestrator } from '../list-state.rxstate';
import { AsyncItem } from 'microedge-rxstate/dist';
import * as moment from 'moment';
import { ListSelectedModel } from './selected.model';
import {
  ListSelectedLoadAction,
  ListSelectedSetLoadingAction,
  ListSelectedSetItemSelectedAction,
  ListSelectedSetItemsSelectedAction
} from './actions';

export class ListSelectedOrchestrator extends ListStateOrchestrator<AsyncItem<ListSelectedModel>> {
  constructor() {
    super();

    this
      .register(ListSelectedSetLoadingAction, this.setLoading)
      .register(ListSelectedSetItemSelectedAction, this.setItemSelected)
      .register(ListSelectedSetItemsSelectedAction, this.setItemsSelected)
      .register(ListSelectedLoadAction, this.load);
  }

  private setLoading(
    state: AsyncItem<ListSelectedModel>,
    action: ListSelectedSetLoadingAction): AsyncItem<ListSelectedModel> {
    return new AsyncItem<ListSelectedModel>(state.item, state.lastUpdate, action.loading);
  }

  private load(
    state: AsyncItem<ListSelectedModel>,
    action: ListSelectedLoadAction): AsyncItem<ListSelectedModel> {
    const newSelected = new ListSelectedModel();
    action.items.map(s => newSelected[s] = true);

    return new AsyncItem<ListSelectedModel>(
      Object.assign({}, state.item, newSelected),
      moment(),
      false
    );
  }

  private setItemSelected(
    state: AsyncItem<ListSelectedModel>,
    action: ListSelectedSetItemSelectedAction): AsyncItem<ListSelectedModel> {
    const newSelected = Object.assign({}, state.item);
    newSelected[action.id] = action.selected;

    return new AsyncItem<ListSelectedModel>(newSelected, state.lastUpdate, state.loading);
  }

  private setItemsSelected(
    state: AsyncItem<ListSelectedModel>,
    action: ListSelectedSetItemsSelectedAction): AsyncItem<ListSelectedModel> {
    const newSelected = new ListSelectedModel();
    action.items.map(s => newSelected[s] = action.selected);

    return new AsyncItem<ListSelectedModel>(newSelected, state.lastUpdate, state.loading);
  }
}
