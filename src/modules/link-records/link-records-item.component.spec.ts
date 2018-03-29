import {
  TestBed,
  async,
  ComponentFixture
} from '@angular/core/testing';
import {
  SkyLinkRecordsMatchesLoadAction
} from './state/matches/actions';
import {
  SkyLinkRecordsSelectedSetSelectedAction
} from './state/selected/actions';
import {
  SkyLinkRecordsFieldsSetFieldsAction
} from './state/fields/actions';
import { SkyLinkRecordsFieldModel } from './state/fields/field.model';
import { SkyLinkRecordsMatchModel } from './state/matches/match.model';
import { SkyLinkRecordsItemModel } from './link-records-item.model';
import {
  SkyLinkRecordsState,
  SkyLinkRecordsStateDispatcher,
  SkyLinkRecordsStateModel }
from './state/';
import { SkyCheckboxModule } from '../checkbox';
import { SkyLinkRecordsApi } from './link-records-api';
import {
  SkyLinkRecordsItemComponent,
  SkyLinkRecordsRendererComponent,
  SkyLinkRecordsItemDiffComponent
} from './';
import { SkyResourcesModule } from '../resources';
import { SKY_LINK_RECORDS_STATUSES } from './link-records-statuses';

describe('Component: SkyLinkRecordsItemComponent ', () => {
  let fixture: ComponentFixture<SkyLinkRecordsItemComponent>,
    component: SkyLinkRecordsItemComponent,
    dispatcher: SkyLinkRecordsStateDispatcher,
    state: SkyLinkRecordsState;

  beforeEach(async(() => {
    dispatcher = new SkyLinkRecordsStateDispatcher();
    state = new SkyLinkRecordsState(new SkyLinkRecordsStateModel(), dispatcher);

    TestBed.configureTestingModule({
      declarations: [
        SkyLinkRecordsItemComponent,
        SkyLinkRecordsRendererComponent,
        SkyLinkRecordsItemDiffComponent
      ],
      imports: [
        SkyCheckboxModule,
        SkyResourcesModule
      ],
      providers: [
        { provide: SkyLinkRecordsState, useValue: state },
        { provide: SkyLinkRecordsStateDispatcher, useValue: dispatcher },
        { provide: SkyLinkRecordsApi }
      ]
    });

    fixture = TestBed.createComponent(SkyLinkRecordsItemComponent);
    component = fixture.componentInstance;

  }));

  it('match state is updated to linked if status is edit and matchFields is falsey', async(() => {
     let linkRecordMatch = new SkyLinkRecordsMatchModel({
      key: '1',
      status: SKY_LINK_RECORDS_STATUSES.NoMatch,
      item: { id: '11', name: 'Kevin' }
    });

    let linkRecordItem = new SkyLinkRecordsItemModel({
      key: '1',
      status: SKY_LINK_RECORDS_STATUSES.Edit,
      item: { id: '111', name: 'David' },
      match: linkRecordMatch,
      matchFields: []
    });

    dispatcher.next(new SkyLinkRecordsMatchesLoadAction([linkRecordMatch]));
    component.record = linkRecordItem;

    fixture.detectChanges();

    state.map(s => s.matches.items).take(1)
      .subscribe(m => {
        let match = m[0];
        expect(match.status).toEqual(SKY_LINK_RECORDS_STATUSES.Linked);
      });
  }));

  it('link updated match state to linked', async(() => {
    let linkRecordMatch = new SkyLinkRecordsMatchModel({
      key: '1',
      status: SKY_LINK_RECORDS_STATUSES.NoMatch,
      item: { id: 1, name: 'Kevin'}
    });

    let linkRecordItem = new SkyLinkRecordsItemModel({
      key: '1',
      status: SKY_LINK_RECORDS_STATUSES.Created,
      item: {},
      match: {}
    });

    dispatcher.next(new SkyLinkRecordsMatchesLoadAction([linkRecordMatch]));
    component.record = linkRecordItem;

    fixture.detectChanges();

    component.link();

    state.map(s => s.matches.items).take(1)
      .subscribe(m => {
        let match = m[0];
        expect(match.status).toEqual(SKY_LINK_RECORDS_STATUSES.Linked);
      });
  }));

  it('updatedFieldsTotal returns total of field objects in selected state', async(() => {
     let linkRecordItem = new SkyLinkRecordsItemModel({
      key: '1',
      status: SKY_LINK_RECORDS_STATUSES.Created,
      item: { id: 1, name: 'Kevin', description: 'desc' },
      matchFields: [{ key: 'name' }]
    });

    dispatcher.next(new SkyLinkRecordsSelectedSetSelectedAction('1', 'name', true));
    component.record = linkRecordItem;

    fixture.detectChanges();

    component.updatedFieldsTotal.take(1)
      .subscribe(l => {
        let length = l;
        expect(length).toEqual(1);
      });
  }));

  it('unlink sets match status to no match, set item to undefined, clear selection', async(() => {
    let linkRecordMatch = new SkyLinkRecordsMatchModel({
      key: '1',
      status: SKY_LINK_RECORDS_STATUSES.NoMatch,
      item: {}
    });

    let linkRecordItem = new SkyLinkRecordsItemModel({
      key: '1',
      status: SKY_LINK_RECORDS_STATUSES.Created,
      item: { id: 1, name: 'Kevin'},
      match: {}
    });

    let fieldModel = new SkyLinkRecordsFieldModel({
      key: '1',
      currentValue: 'Apples',
      newValue: 'Banana'
    });

    dispatcher.next(new SkyLinkRecordsMatchesLoadAction([linkRecordMatch]));
    dispatcher.next(new SkyLinkRecordsSelectedSetSelectedAction('1', 'testField', true));
    dispatcher.next(new SkyLinkRecordsFieldsSetFieldsAction('1', [fieldModel]));

    component.record = linkRecordItem;

    fixture.detectChanges();

    component.unlink();

    state.map(s => s.matches.items).take(1)
      .subscribe(m => {
        let match = m[0];
        expect(match.status).toEqual(SKY_LINK_RECORDS_STATUSES.NoMatch);
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
    let linkRecordItem = new SkyLinkRecordsItemModel({
      key: '1',
      status: SKY_LINK_RECORDS_STATUSES.Created,
      item: { id: 1, name: 'Kevin'},
      match: {}
    });

    let linkRecordMatch = new SkyLinkRecordsMatchModel({
      key: '1',
      status: SKY_LINK_RECORDS_STATUSES.NoMatch,
      item: {}
    });

    dispatcher.next(new SkyLinkRecordsMatchesLoadAction([linkRecordMatch]));

    component.record = linkRecordItem;

    fixture.detectChanges();

    component.create();

    state.map(s => s.matches.items).take(1)
      .subscribe(m => {
        let match = m[0];
        expect(match.status).toEqual(SKY_LINK_RECORDS_STATUSES.Created);
        expect(match.key).toEqual(component.record.key);
        expect(match.item).toEqual(component.record.item);
      });
  }));

  it('edit sets match status of linked if match field is defined but no fields need an edit', async(() => {
    let linkRecordItem = new SkyLinkRecordsItemModel({
      key: '1',
      status: SKY_LINK_RECORDS_STATUSES.Created,
      item: { id: 1, name: 'Kevin'},
      match: {},
      matchFields: [{ key: 'name'}]
    });

    let linkRecordMatch = new SkyLinkRecordsMatchModel({
      key: '1',
      status: SKY_LINK_RECORDS_STATUSES.NoMatch,
      item: {}
    });

    dispatcher.next(new SkyLinkRecordsMatchesLoadAction([linkRecordMatch]));

    component.record = linkRecordItem;

    fixture.detectChanges();

    component.edit();

    state.map(s => s.matches.items).take(1)
      .subscribe(m => {
        let match = m[0];
        expect(match.status).toEqual(SKY_LINK_RECORDS_STATUSES.Linked);
      });
  }));

  it('edit sets match state to linked and field state empty if matchField length zero', async(() => {
    let linkRecordItem = new SkyLinkRecordsItemModel({
      key: '1',
      item: { id: 1, name: 'Kevin', address: '123'},
      matchFields: [{ key: 'none' }]
    });

    component.record = linkRecordItem;

    let linkRecordMatch = new SkyLinkRecordsMatchModel({
      key: '1',
      status: SKY_LINK_RECORDS_STATUSES.NoMatch,
      item: linkRecordItem.item
    });

    component.record.match = linkRecordMatch;

    dispatcher.next(new SkyLinkRecordsMatchesLoadAction([linkRecordMatch]));

    fixture.detectChanges();

    component.edit();

    state.map((s: any) => s.fields.item).take(1)
      .subscribe((f: any) => {
        let field = f['1'];
        expect(field).toEqual([]);
      });

    state.map((s: any) => s.matches.items).take(1)
      .subscribe((m: any) => {
        let match = m[0];
        expect(match.status).toEqual(SKY_LINK_RECORDS_STATUSES.Linked);
      });
  }));

  it('edit sets status to edit and populates field state if there are match fields', async(() => {
      let linkRecordItem = new SkyLinkRecordsItemModel({
        key: '1',
        item: {
          id: '1',
          address: 101,
          name: 'Apple',
          description: 'Anne eats apples'
        },
        matchFields: [{
          key: 'description',
          label: 'label '
        }]
      });

      component.record = linkRecordItem;
      component.selectedByDefault = true;

      let linkRecordMatch = new SkyLinkRecordsMatchModel({
        key: '1',
        status: SKY_LINK_RECORDS_STATUSES.Edit,
        item: { id: '11', address: 111, name: 'Big Apple', description: 'George and his apples' }
      });

      component.record.match = linkRecordMatch;

      dispatcher.next(new SkyLinkRecordsSelectedSetSelectedAction(
        '1',
        'description',
        true
      ));
      dispatcher.next(new SkyLinkRecordsMatchesLoadAction([linkRecordMatch]));

      fixture.detectChanges();

      component.edit();

      state.map((s: any) => s.fields.item).take(1)
        .subscribe((f: any) => {
          let field = f['1'][0];
          expect(field.currentValue).toEqual(linkRecordMatch.item.description);
          expect(field.newValue).toEqual(linkRecordItem.item.description);
        });
  }));

  it('edit sets status to linked if match has no value and showNewFieldValues is false',
    async(() => {
      let linkRecordItem = new SkyLinkRecordsItemModel({
        key: '1',
        item: {
          id: '1',
          address: 101,
          name: 'Apple',
          description: 'Anne eats apples'
        },
        matchFields: [{ key: 'name' }, { key: 'description' }],
        showNewFieldValues: false
      });

      component.record = linkRecordItem;

      let linkRecordMatch = new SkyLinkRecordsMatchModel({
        key: '1',
        status: SKY_LINK_RECORDS_STATUSES.Edit,
        item: { id: '11', address: 111, name: '', description: '' }
      });

      component.record.match = linkRecordMatch;

      fixture.detectChanges();

      component.edit();

      state.map((s: any) => s.fields.item).take(1)
        .subscribe((f: any) => {
          let field = f['1'][0];
          expect(field.currentValue).toEqual(linkRecordMatch.item[field.key]);
          expect(field.newValue).toEqual(linkRecordItem.item[field.key]);
        });
    }));

  it('edit will set selectedByDefault string "true" converts to boolean true', () => {
    let linkRecordItem = new SkyLinkRecordsItemModel({
      key: '1',
      item: {
        id: '1',
        address: 101,
        name: 'Apple',
        description: 'Anne eats apples'
      },
      matchFields: [{ key: 'name' }, { key: 'description' }]
    });

    component.record = linkRecordItem;

    // cast to any to  not get TS type assignment error
    let selectedByDefault: any = 'true';
    component.selectedByDefault = selectedByDefault;

    let linkRecordMatch = new SkyLinkRecordsMatchModel({
      key: '1',
      status: SKY_LINK_RECORDS_STATUSES.Edit,
      item: { id: '11', address: 111, name: '', description: '' }
    });

    component.record.match = linkRecordMatch;

    fixture.detectChanges();

    component.edit();

    expect(component.selectedByDefault).toBe(true);
  });

  it('cancelEdit sets match status to suggested and selected and fields are cleared', async(() => {
     let linkRecordItem = new SkyLinkRecordsItemModel({
      key: '1',
      status: SKY_LINK_RECORDS_STATUSES.Created,
      item: {},
      match: { id: 1, name: 'David' }
    });

    let linkRecordMatch = new SkyLinkRecordsMatchModel({
      key: '1',
      status: SKY_LINK_RECORDS_STATUSES.NoMatch,
      item: {}
    });

    dispatcher.next(new SkyLinkRecordsMatchesLoadAction([linkRecordMatch]));

    component.record = linkRecordItem;

    fixture.detectChanges();

    component.cancelEdit();

    state.map(s => s.matches.items).take(1)
      .subscribe(m => {
        let match = m[0];
        expect(match.status).toEqual(SKY_LINK_RECORDS_STATUSES.Suggested);
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
