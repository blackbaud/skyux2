import { Injectable } from '@angular/core';
import { LinkRecordsStateDispatcher } from './state';
import {
  LinkRecordsMatchesSetStatusAction,
  LinkRecordsMatchesSetItemAction
} from './state/matches/actions';
import { SKY_LINK_RECORDS_STATUSES } from './link-records-statuses';

@Injectable()
export class LinkRecordsApi {
  constructor(
    private dispatcher: LinkRecordsStateDispatcher
  ) {}

  public addSelectedItem(key: string, item: any) {
    this.dispatcher.next(
      new LinkRecordsMatchesSetStatusAction(key, SKY_LINK_RECORDS_STATUSES.Selected)
    );
    this.dispatcher.next(new LinkRecordsMatchesSetItemAction(key, item));
  }

  public removeSelectedItem(key: string) {
    this.dispatcher.next(
      new LinkRecordsMatchesSetStatusAction(key, SKY_LINK_RECORDS_STATUSES.NoMatch)
    );
    this.dispatcher.next(new LinkRecordsMatchesSetItemAction(key, undefined));
  }
}
