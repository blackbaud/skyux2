import { SkyLinkRecordsStateOrchestrator } from '../link-records-state.rxstate';
import { AsyncList } from 'microedge-rxstate/dist';
let moment = require('moment');

import { SkyLinkRecordsResultModel } from './result.model';
import { SkyLinkRecordsResultsLoadAction } from './actions';

export class SkyLinkRecordsResultsOrchestrator
  extends SkyLinkRecordsStateOrchestrator<AsyncList<SkyLinkRecordsResultModel>> {
  constructor() {
    super();

    this
      .register(SkyLinkRecordsResultsLoadAction, this.load);
  }

  private load(
    state: AsyncList<SkyLinkRecordsResultModel>,
    action: SkyLinkRecordsResultsLoadAction): AsyncList<SkyLinkRecordsResultModel> {
    const newResults = action.results.filter(c => c).map(g => new SkyLinkRecordsResultModel(g));

    if (action.refresh) {
      return new AsyncList<SkyLinkRecordsResultModel>(newResults, moment());
    }

    return new AsyncList<SkyLinkRecordsResultModel>([...state.items, ...newResults], moment());
  }
}
