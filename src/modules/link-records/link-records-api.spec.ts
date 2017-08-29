import { async } from '@angular/core/testing/';
import { LinkRecordsStateDispatcher, LinkRecordsStateModel, LinkRecordsState } from './state';
import { LinkRecordsApi } from './link-records-api';
import { LinkRecordsMatchesLoadAction } from './state/matches/actions';
import { STATUSES } from './link-records-statuses';

describe('Injectable: Link Records API ', () => {
  let linkRecordApi: LinkRecordsApi, dispatcher: LinkRecordsStateDispatcher,
    state: LinkRecordsState;

  beforeEach(() => {
    dispatcher = new LinkRecordsStateDispatcher(),
    state = new LinkRecordsState(new LinkRecordsStateModel(), dispatcher),
    linkRecordApi = new LinkRecordsApi(dispatcher);
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
      status: STATUSES.Created,
      item: oldItem
    }];

    dispatcher.next(new LinkRecordsMatchesLoadAction(matches));

    linkRecordApi.addSelectedItem(expectedKey, newItem);

    state.take(1).subscribe(s => {
      expect(s.matches.items[0].status).toEqual(STATUSES.Selected);
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
        status: STATUSES.Created,
        item: oldItem
      }
    ];

    dispatcher.next(new LinkRecordsMatchesLoadAction(matches));

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
        status: STATUSES.Created,
        item: oldItem
      }
    ];

    dispatcher.next(new LinkRecordsMatchesLoadAction(matches));

    linkRecordApi.removeSelectedItem(expectedKey);

    state.take(1).subscribe(s => {
      expect(s.matches.items[0].status).toEqual(STATUSES.NoMatch);
      expect(s.matches.items[0].item).toEqual(undefined);
    });
  }));
});
