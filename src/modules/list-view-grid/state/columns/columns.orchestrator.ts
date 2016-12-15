import { GridStateOrchestrator } from '../grid-state.rxstate';
import { AsyncList } from 'microedge-rxstate/dist';
import * as moment from 'moment';

import { ListViewGridColumnModel } from './column.model';
import { ListViewGridColumnsLoadAction } from './actions';

export class ListViewGridColumnsOrchestrator
  extends GridStateOrchestrator<AsyncList<ListViewGridColumnModel>> {
  constructor() {
    super();

    this
      .register(ListViewGridColumnsLoadAction, this.load);
  }

  private load(
    state: AsyncList<ListViewGridColumnModel>,
    action: ListViewGridColumnsLoadAction): AsyncList<ListViewGridColumnModel> {
    const newColumns = action.columns.map(g => new ListViewGridColumnModel(g.template, g));

    if (action.refresh) {
      return new AsyncList<ListViewGridColumnModel>([...newColumns], moment());
    }

    return new AsyncList<ListViewGridColumnModel>([...state.items, ...newColumns], moment());
  }
}
