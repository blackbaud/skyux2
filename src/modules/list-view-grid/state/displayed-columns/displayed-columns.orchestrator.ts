import { GridStateOrchestrator } from '../grid-state.rxstate';
import { AsyncList } from 'microedge-rxstate/dist';

import { SkyGridColumnModel } from '../../../grid';
import { ListViewDisplayedGridColumnsLoadAction } from './actions';

let moment = require('moment');

export class ListViewDisplayedGridColumnsOrchestrator
  extends GridStateOrchestrator<AsyncList<SkyGridColumnModel>> {
  /* istanbul ignore next */
  constructor() {
    super();

    this
      .register(ListViewDisplayedGridColumnsLoadAction, this.load);
  }

  private load(
    state: AsyncList<SkyGridColumnModel>,
    action: ListViewDisplayedGridColumnsLoadAction): AsyncList<SkyGridColumnModel> {
    const newColumns = action.columns.map(g => new SkyGridColumnModel(g.template, g));

    if (action.refresh) {
      return new AsyncList<SkyGridColumnModel>([...newColumns], moment());
    }

    return new AsyncList<SkyGridColumnModel>([...state.items, ...newColumns], moment());
  }
}
