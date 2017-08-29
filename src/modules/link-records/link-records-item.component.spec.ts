import {
  TestBed,
  async,
  ComponentFixture
} from '@angular/core/testing';
import {
  LinkRecordsMatchesLoadAction
} from './state/matches/actions';
import {
  LinkRecordsSelectedSetSelectedAction
} from './state/selected/actions';
import {
  LinkRecordsFieldsSetFieldsAction
} from './state/fields/actions';
import { LinkRecordsFieldModel } from './state/fields/field.model';
import { LinkRecordsMatchModel } from './state/matches/match.model';
import { LinkRecordsItemModel } from './link-records-item.model';
import {
  LinkRecordsState,
  LinkRecordsStateDispatcher,
  LinkRecordsStateModel }
from './state/';
import { SkyCheckboxModule } from '@blackbaud/skyux/dist/core';
import { LinkRecordsApi } from './link-records-api';
import {
  SkyLinkRecordsItemComponent,
  SkyLinkRecordsRendererComponent,
  SkyLinkRecordsItemDiffComponent
} from './';
import { STATUSES } from './link-records-statuses';

describe('Component: SkyLinkRecordsItemComponent ', () => {
  let fixture: ComponentFixture<SkyLinkRecordsItemComponent>,
    component: SkyLinkRecordsItemComponent,
    dispatcher: LinkRecordsStateDispatcher,
    state: LinkRecordsState;

  beforeEach(async(() => {
    dispatcher = new LinkRecordsStateDispatcher();
    state = new LinkRecordsState(new LinkRecordsStateModel(), dispatcher);

    TestBed.configureTestingModule({
      declarations: [
        SkyLinkRecordsItemComponent,
        SkyLinkRecordsRendererComponent,
        SkyLinkRecordsItemDiffComponent
      ],
      imports: [
        SkyCheckboxModule
      ],
      providers: [
        { provide: LinkRecordsState, useValue: state },
        { provide: LinkRecordsStateDispatcher, useValue: dispatcher },
        { provide: LinkRecordsApi }
      ]
    });

    fixture = TestBed.createComponent(SkyLinkRecordsItemComponent);
    component = fixture.componentInstance;

  }));

  it('match state is updated to linked if status is edit and matchFields is falsey', async(() => {
     let linkRecordMatch = new LinkRecordsMatchModel({
      key: '1',
      status: STATUSES.NoMatch,
      item: { id: '11', name: 'Kevin' }
    });

    let linkRecordItem = new LinkRecordsItemModel({
      key: '1',
      status: STATUSES.Edit,
      item: { id: '111', name: 'David' },
      match: linkRecordMatch,
      matchFields: []
    });

    dispatcher.next(new LinkRecordsMatchesLoadAction([linkRecordMatch]));
    component.record = linkRecordItem;

    fixture.detectChanges();

    state.map(s => s.matches.items).take(1)
      .subscribe(m => {
        let match = m[0];
        expect(match.status).toEqual(STATUSES.Linked);
      });
  }));

  it('link updated match state to linked', async(() => {
    let linkRecordMatch = new LinkRecordsMatchModel({
      key: '1',
      status: STATUSES.NoMatch,
      item: { id: 1, name: 'Kevin'}
    });

    let linkRecordItem = new LinkRecordsItemModel({
      key: '1',
      status: STATUSES.Created,
      item: {},
      match: {}
    });

    dispatcher.next(new LinkRecordsMatchesLoadAction([linkRecordMatch]));
    component.record = linkRecordItem;

    fixture.detectChanges();

    component.link();

    state.map(s => s.matches.items).take(1)
      .subscribe(m => {
        let match = m[0];
        expect(match.status).toEqual(STATUSES.Linked);
      });
  }));

  it('updatedFieldsTotal returns total of field objects in selected state', async(() => {
     let linkRecordItem = new LinkRecordsItemModel({
      key: '1',
      status: STATUSES.Created,
      item: { id: 1, name: 'Kevin', description: 'desc' },
      matchFields: [{ key: 'name' }]
    });

    dispatcher.next(new LinkRecordsSelectedSetSelectedAction('1', 'name', true));
    component.record = linkRecordItem;

    fixture.detectChanges();

    component.updatedFieldsTotal.take(1)
      .subscribe(l => {
        let length = l;
        expect(length).toEqual(1);
      });
  }));

  it('unlink sets match status to no match, set item to undefined, clear selection', async(() => {
    let linkRecordMatch = new LinkRecordsMatchModel({
      key: '1',
      status: STATUSES.NoMatch,
      item: {}
    });

    let linkRecordItem = new LinkRecordsItemModel({
      key: '1',
      status: STATUSES.Created,
      item: { id: 1, name: 'Kevin'},
      match: {}
    });

    let fieldModel = new LinkRecordsFieldModel({
      key: '1',
      currentValue: 'Apples',
      newValue: 'Banana'
    });

    dispatcher.next(new LinkRecordsMatchesLoadAction([linkRecordMatch]));
    dispatcher.next(new LinkRecordsSelectedSetSelectedAction('1', 'testField', true));
    dispatcher.next(new LinkRecordsFieldsSetFieldsAction('1', [fieldModel]));

    component.record = linkRecordItem;

    fixture.detectChanges();

    component.unlink();

    state.map(s => s.matches.items).take(1)
      .subscribe(m => {
        let match = m[0];
        expect(match.status).toEqual(STATUSES.NoMatch);
        expect(match.item).toBeUndefined();
      });

    state.map(s => s.selected.item).take(1)
      .subscribe(s => {
        let selected = s['1'];
        expect(selected).toBeUndefined();
      });

    state.map(s => s.fields.item).take(1)
      .subscribe(f => {
        let field = f['1'];
        expect(field).toBeUndefined();
      });
  }));

  it('create sets match status to created and maps record key to record item', async(() => {
    let linkRecordItem = new LinkRecordsItemModel({
      key: '1',
      status: STATUSES.Created,
      item: { id: 1, name: 'Kevin'},
      match: {}
    });

    let linkRecordMatch = new LinkRecordsMatchModel({
      key: '1',
      status: STATUSES.NoMatch,
      item: {}
    });

    dispatcher.next(new LinkRecordsMatchesLoadAction([linkRecordMatch]));

    component.record = linkRecordItem;

    fixture.detectChanges();

    component.create();

    state.map(s => s.matches.items).take(1)
      .subscribe(m => {
        let match = m[0];
        expect(match.status).toEqual(STATUSES.Created);
        expect(match.key).toEqual(component.record.key);
        expect(match.item).toEqual(component.record.item);
      });
  }));

  it('edit sets match status of edit if match field is defined', async(() => {
    let linkRecordItem = new LinkRecordsItemModel({
      key: '1',
      status: STATUSES.Created,
      item: { id: 1, name: 'Kevin'},
      match: {},
      matchFields: [{ key: 'name'}]
    });

    let linkRecordMatch = new LinkRecordsMatchModel({
      key: '1',
      status: STATUSES.NoMatch,
      item: {}
    });

    dispatcher.next(new LinkRecordsMatchesLoadAction([linkRecordMatch]));

    component.record = linkRecordItem;

    fixture.detectChanges();

    component.edit();

    state.map(s => s.matches.items).take(1)
      .subscribe(m => {
        let match = m[0];
        expect(match.status).toEqual(STATUSES.Edit);
      });
  }));

  it('edit sets match status of linked if match field is undefined', async(() => {
     let linkRecordItem = new LinkRecordsItemModel({
      key: '1',
      status: STATUSES.Created,
      item: { id: 1, name: 'Kevin'},
      match: {}
    });

    let linkRecordMatch = new LinkRecordsMatchModel({
      key: '1',
      status: STATUSES.NoMatch,
      item: {}
    });

    dispatcher.next(new LinkRecordsMatchesLoadAction([linkRecordMatch]));

    component.record = linkRecordItem;

    fixture.detectChanges();

    component.edit();

    state.map(s => s.matches.items).take(1)
      .subscribe(m => {
        let match = m[0];
        expect(match.status).toEqual(STATUSES.Linked);
      });
  }));

  it('cancelEdit sets match status to suggested and selected and fields are cleared', async(() => {
     let linkRecordItem = new LinkRecordsItemModel({
      key: '1',
      status: STATUSES.Created,
      item: {},
      match: { id: 1, name: 'David' }
    });

    let linkRecordMatch = new LinkRecordsMatchModel({
      key: '1',
      status: STATUSES.NoMatch,
      item: {}
    });

    dispatcher.next(new LinkRecordsMatchesLoadAction([linkRecordMatch]));

    component.record = linkRecordItem;

    fixture.detectChanges();

    component.cancelEdit();

    state.map(s => s.matches.items).take(1)
      .subscribe(m => {
        let match = m[0];
        expect(match.status).toEqual(STATUSES.Suggested);
      });

    state.map(s => s.selected.item).take(1)
      .subscribe(s => {
        let selected = s['1'];
        expect(selected).toBeUndefined();
      });

    state.map(s => s.fields.item).take(1)
      .subscribe(f => {
        let field = f['1'];
        expect(field).toBeUndefined();
      });
  }));
});
