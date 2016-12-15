import { ChecklistStateOrchestrator } from '../checklist-state.rxstate';
import { AsyncList } from 'microedge-rxstate/dist';
import * as moment from 'moment';
import { ListViewChecklistItemModel } from './item.model';
import { ListViewChecklistItemsLoadAction } from './actions';

export class ListViewChecklistItemsOrchestrator
  extends ChecklistStateOrchestrator<AsyncList<ListViewChecklistItemModel>> {
  constructor() {
    super();

    this
      .register(ListViewChecklistItemsLoadAction, this.load);
  }

  private load(
    state: AsyncList<ListViewChecklistItemModel>,
    action: ListViewChecklistItemsLoadAction): AsyncList<ListViewChecklistItemModel> {
    const newListItems = action.items.map(g => new ListViewChecklistItemModel(g.id, g));

    if (action.refresh) {
      return new AsyncList<ListViewChecklistItemModel>(
        [...newListItems],
        action.dataChanged ? moment() : state.lastUpdate,
        false,
        state.count
      );
    }

    return new AsyncList<ListViewChecklistItemModel>(
      [...state.items, ...newListItems],
      action.dataChanged ? moment() : state.lastUpdate,
      false,
      action.itemCount
    );
  }
}
