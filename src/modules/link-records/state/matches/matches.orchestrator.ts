import { LinkRecordsStateOrchestrator } from '../link-records-state.rxstate';
import { AsyncList } from 'microedge-rxstate/dist';
let moment = require('moment');

import { SKY_LINK_RECORDS_STATUSES } from '../../link-records-statuses';
import { LinkRecordsMatchModel } from './match.model';
import {
  LinkRecordsMatchesLoadAction,
  LinkRecordsMatchesSetStatusAction,
  LinkRecordsMatchesSetItemAction
} from './actions';

export class LinkRecordsMatchesOrchestrator
  extends LinkRecordsStateOrchestrator<AsyncList<LinkRecordsMatchModel>> {
  constructor() {
    super();

    this
      .register(LinkRecordsMatchesLoadAction, this.load)
      .register(LinkRecordsMatchesSetStatusAction, this.setStatus)
      .register(LinkRecordsMatchesSetItemAction, this.setItem);
  }

  private load(
    state: AsyncList<LinkRecordsMatchModel>,
    action: LinkRecordsMatchesLoadAction): AsyncList<LinkRecordsMatchModel> {
    const newMatches = action.matches
      .filter(m => m)
      .map(m => new LinkRecordsMatchModel(m))
      .filter(m => m.status !== SKY_LINK_RECORDS_STATUSES.NoMatch
        || !SKY_LINK_RECORDS_STATUSES.isValid(status));

    if (action.refresh) {
      return new AsyncList<LinkRecordsMatchModel>([...newMatches], moment());
    }

    return new AsyncList<LinkRecordsMatchModel>([...state.items, ...newMatches], moment());
  }

  private setStatus(
    state: AsyncList<LinkRecordsMatchModel>,
    action: LinkRecordsMatchesSetStatusAction): AsyncList<LinkRecordsMatchModel> {
      const newMatches = state.items
        .filter(m => m)
        .map(m => {
          let match = new LinkRecordsMatchModel(m);
          if (match.key === action.key) {
            match.status = action.status;
          }

          return match;
        })
        .filter(m => m.status !== SKY_LINK_RECORDS_STATUSES.NoMatch
          || !SKY_LINK_RECORDS_STATUSES.isValid(status));

      return new AsyncList<LinkRecordsMatchModel>([...newMatches], moment());
  }

  private setItem(
    state: AsyncList<LinkRecordsMatchModel>,
    action: LinkRecordsMatchesSetItemAction): AsyncList<LinkRecordsMatchModel> {
      const newMatches = state.items
        .filter(m => m)
        .map(m => {
          let match = new LinkRecordsMatchModel(m);
          if (match.key === action.key) {
            match.item = (action.item) ? Object.assign({}, action.item) : undefined;
          }

          return match;
        })
        .filter(m => m.status !== SKY_LINK_RECORDS_STATUSES.NoMatch
          || !SKY_LINK_RECORDS_STATUSES.isValid(status));

      return new AsyncList<LinkRecordsMatchModel>([...newMatches], moment());
  }
}
