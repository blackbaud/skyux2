import { SkyLinkRecordsStateOrchestrator } from '../link-records-state.rxstate';
import { AsyncList } from 'microedge-rxstate/dist';
let moment = require('moment');

import { SKY_LINK_RECORDS_STATUSES } from '../../link-records-statuses';
import { SkyLinkRecordsMatchModel } from './match.model';
import {
  SkyLinkRecordsMatchesLoadAction,
  SkyLinkRecordsMatchesSetStatusAction,
  SkyLinkRecordsMatchesSetItemAction
} from './actions';

export class SkyLinkRecordsMatchesOrchestrator
  extends SkyLinkRecordsStateOrchestrator<AsyncList<SkyLinkRecordsMatchModel>> {
  constructor() {
    super();

    this
      .register(SkyLinkRecordsMatchesLoadAction, this.load)
      .register(SkyLinkRecordsMatchesSetStatusAction, this.setStatus)
      .register(SkyLinkRecordsMatchesSetItemAction, this.setItem);
  }

  private load(
    state: AsyncList<SkyLinkRecordsMatchModel>,
    action: SkyLinkRecordsMatchesLoadAction): AsyncList<SkyLinkRecordsMatchModel> {
    const newMatches = action.matches
      .filter(m => m)
      .map(m => new SkyLinkRecordsMatchModel(m))
      .filter(m => m.status !== SKY_LINK_RECORDS_STATUSES.NoMatch
        || !SKY_LINK_RECORDS_STATUSES.isValid(status));

    if (action.refresh) {
      return new AsyncList<SkyLinkRecordsMatchModel>([...newMatches], moment());
    }

    return new AsyncList<SkyLinkRecordsMatchModel>([...state.items, ...newMatches], moment());
  }

  private setStatus(
    state: AsyncList<SkyLinkRecordsMatchModel>,
    action: SkyLinkRecordsMatchesSetStatusAction): AsyncList<SkyLinkRecordsMatchModel> {
      const newMatches = state.items
        .filter(m => m)
        .map(m => {
          let match = new SkyLinkRecordsMatchModel(m);
          if (match.key === action.key) {
            match.status = action.status;
          }

          return match;
        })
        .filter(m => m.status !== SKY_LINK_RECORDS_STATUSES.NoMatch
          || !SKY_LINK_RECORDS_STATUSES.isValid(status));

      return new AsyncList<SkyLinkRecordsMatchModel>([...newMatches], moment());
  }

  private setItem(
    state: AsyncList<SkyLinkRecordsMatchModel>,
    action: SkyLinkRecordsMatchesSetItemAction): AsyncList<SkyLinkRecordsMatchModel> {
      const newMatches = state.items
        .filter(m => m)
        .map(m => {
          let match = new SkyLinkRecordsMatchModel(m);
          if (match.key === action.key) {
            match.item = (action.item) ? Object.assign({}, action.item) : undefined;
          }

          return match;
        })
        .filter(m => m.status !== SKY_LINK_RECORDS_STATUSES.NoMatch
          || !SKY_LINK_RECORDS_STATUSES.isValid(status));

      return new AsyncList<SkyLinkRecordsMatchModel>([...newMatches], moment());
  }
}
