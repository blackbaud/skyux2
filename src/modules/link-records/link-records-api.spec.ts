import { async } from '@angular/core/testing/';
import {
  SkyLinkRecordsStateDispatcher,
  SkyLinkRecordsStateModel,
  SkyLinkRecordsState
} from './state';
import { SkyLinkRecordsApi } from './link-records-api';
import { SkyLinkRecordsMatchesLoadAction } from './state/matches/actions';
import { SKY_LINK_RECORDS_STATUSES } from './link-records-statuses';

describe('Injectable: Link Records API ', () => {
  let linkRecordApi: SkyLinkRecordsApi, dispatcher: SkyLinkRecordsStateDispatcher,
    state: SkyLinkRecordsState;

  beforeEach(() => {
    dispatcher = new SkyLinkRecordsStateDispatcher(),
    state = new SkyLinkRecordsState(new SkyLinkRecordsStateModel(), dispatcher),
    linkRecordApi = new SkyLinkRecordsApi(dispatcher);
  });

  it('addSelectedItem set match status to selected and match item to the state', async(() => {
    let expectedKey: string = '1';
    let oldItem: any = {
      id: 123,
      name: 'Org Name',
      addressLine1: ''
    };

    let newItem: any = {
      id: 456,
      name: 'New Name',
      addressLine1: ''
    };

    let matches = [{
      key: expectedKey,
      status: SKY_LINK_RECORDS_STATUSES.Created,
      item: oldItem
    }];

    dispatcher.next(new SkyLinkRecordsMatchesLoadAction(matches));

    linkRecordApi.addSelectedItem(expectedKey, newItem);

    state.take(1).subscribe(s => {
      expect(s.matches.items[0].status).toEqual(SKY_LINK_RECORDS_STATUSES.Selected);
      expect(s.matches.items[0].item).toEqual(newItem);
    });
  }));

  it('addSelectedItem should set match item to undefined if new item is undefined', async(() => {
    let expectedKey: string = '1';
    let oldItem: any = {
      id: 123,
      name: 'Org Name',
      addressLine1: ''
    };
    let newItem: any = undefined;

    let matches = [
      {
        key: expectedKey,
        status: SKY_LINK_RECORDS_STATUSES.Created,
        item: oldItem
      }
    ];

    dispatcher.next(new SkyLinkRecordsMatchesLoadAction(matches));

    linkRecordApi.addSelectedItem(expectedKey, newItem);

    state.take(1).subscribe(s => {
      expect(s.matches.items[0].item).toEqual(undefined);
    });
  }));

  it('removeSelectedItem set match status to NoMatch and match item to undefined', async(() => {
    let expectedKey: string = '1';
    let oldItem: any = {
      id: 123,
      name: 'Org Name',
      addressLine1: ''
    };

    let matches = [
      {
        key: expectedKey,
        status: SKY_LINK_RECORDS_STATUSES.Created,
        item: oldItem
      }
    ];

    dispatcher.next(new SkyLinkRecordsMatchesLoadAction(matches));

    linkRecordApi.removeSelectedItem(expectedKey);

    state.take(1).subscribe(s => {
      expect(s.matches.items[0].status).toEqual(SKY_LINK_RECORDS_STATUSES.NoMatch);
      expect(s.matches.items[0].item).toEqual(undefined);
    });
  }));
});
