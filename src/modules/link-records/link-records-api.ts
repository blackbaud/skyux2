import { Injectable } from '@angular/core';
import { SkyLinkRecordsStateDispatcher } from './state';
import {
  SkyLinkRecordsMatchesSetStatusAction,
  SkyLinkRecordsMatchesSetItemAction
} from './state/matches/actions';
import { SKY_LINK_RECORDS_STATUSES } from './link-records-statuses';

@Injectable()
export class SkyLinkRecordsApi {
  constructor(
    private dispatcher: SkyLinkRecordsStateDispatcher
  ) {}

  public addSelectedItem(key: string, item: any) {
    this.dispatcher.next(
      new SkyLinkRecordsMatchesSetStatusAction(key, SKY_LINK_RECORDS_STATUSES.Selected)
    );
    this.dispatcher.next(new SkyLinkRecordsMatchesSetItemAction(key, item));
  }

  public removeSelectedItem(key: string) {
    this.dispatcher.next(
      new SkyLinkRecordsMatchesSetStatusAction(key, SKY_LINK_RECORDS_STATUSES.NoMatch)
    );
    this.dispatcher.next(new SkyLinkRecordsMatchesSetItemAction(key, undefined));
  }
}
