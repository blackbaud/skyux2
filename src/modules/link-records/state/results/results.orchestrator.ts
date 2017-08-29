import { LinkRecordsStateOrchestrator } from '../link-records-state.rxstate';
import { AsyncList } from 'microedge-rxstate/dist';
let moment = require('moment');

import { LinkRecordsResultModel } from './result.model';
import { LinkRecordsResultsLoadAction } from './actions';

export class LinkRecordsResultsOrchestrator
  extends LinkRecordsStateOrchestrator<AsyncList<LinkRecordsResultModel>> {
  constructor() {
    super();

    this
      .register(LinkRecordsResultsLoadAction, this.load);
  }

  private load(
    state: AsyncList<LinkRecordsResultModel>,
    action: LinkRecordsResultsLoadAction): AsyncList<LinkRecordsResultModel> {
    const newResults = action.results.filter(c => c).map(g => new LinkRecordsResultModel(g));

    if (action.refresh) {
      return new AsyncList<LinkRecordsResultModel>(newResults, moment());
    }

    return new AsyncList<LinkRecordsResultModel>([...state.items, ...newResults], moment());
  }
}
