import { ListToolbarStateOrchestrator } from '../toolbar-state.rxstate';
import { AsyncList } from 'microedge-rxstate/core';
import * as moment from 'moment';
import { ListToolbarItemModel } from './item.model';
import { ListToolbarItemsLoadAction } from './actions';

export class ListToolbarItemsOrchestrator
  extends ListToolbarStateOrchestrator<AsyncList<ListToolbarItemModel>> {
  constructor() {
    super();

    this
      .register(ListToolbarItemsLoadAction, this.load);
  }

  private load(state, action: ListToolbarItemsLoadAction): AsyncList<ListToolbarItemModel> {
    const newListItems = action.items.map(g => new ListToolbarItemModel(g));

    let resultItems = [...state.items];
    if (action.index === -1 || action.index > state.items.length) {
      resultItems = [...resultItems, ...newListItems];
    } else if (action.index === 0) {
      resultItems = [...newListItems, ...resultItems];
    } else {
      newListItems.reverse().forEach(item => resultItems.splice(action.index, 0, item));
    }

    return new AsyncList<ListToolbarItemModel>(resultItems, moment());
  }
}
