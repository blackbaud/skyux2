import { GridStateOrchestrator } from '../grid-state.rxstate';
import { AsyncList } from 'microedge-rxstate/dist';
import * as moment from 'moment';

import { ListViewGridColumnModel } from '../columns/column.model';
import { ListViewDisplayedGridColumnsLoadAction } from './actions';

export class ListViewDisplayedGridColumnsOrchestrator
  extends GridStateOrchestrator<AsyncList<ListViewGridColumnModel>> {
  constructor() {
    super();

    this
      .register(ListViewDisplayedGridColumnsLoadAction, this.load);
  }

  private load(
    state: AsyncList<ListViewGridColumnModel>,
    action: ListViewDisplayedGridColumnsLoadAction): AsyncList<ListViewGridColumnModel> {
    const newColumns = action.columns.map(g => new ListViewGridColumnModel(g.template, g));

    if (action.refresh) {
      return new AsyncList<ListViewGridColumnModel>([...newColumns], moment());
    }

    return new AsyncList<ListViewGridColumnModel>([...state.items, ...newColumns], moment());
  }
}
