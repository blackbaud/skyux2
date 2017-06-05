import { GridStateOrchestrator } from '../grid-state.rxstate';
import { AsyncList } from 'microedge-rxstate/dist';

import { SkyGridColumnModel } from '../../../grid';
import { ListViewGridColumnsLoadAction } from './actions';

let moment = require('moment');

export class ListViewGridColumnsOrchestrator
  extends GridStateOrchestrator<AsyncList<SkyGridColumnModel>> {
  constructor() {
    super()/* istanbul ignore next */;

    this
      .register(ListViewGridColumnsLoadAction, this.load);
  }

  private load(
    state: AsyncList<SkyGridColumnModel>,
    action: ListViewGridColumnsLoadAction): AsyncList<SkyGridColumnModel> {
    const newColumns = action.columns.map(g => new SkyGridColumnModel(g.template, g));

    if (action.refresh) {
      return new AsyncList<SkyGridColumnModel>([...newColumns], moment());
    }

    return new AsyncList<SkyGridColumnModel>([...state.items, ...newColumns], moment());
  }
}
