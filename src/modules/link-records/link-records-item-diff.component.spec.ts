import {
  TestBed,
  async,
  ComponentFixture
} from '@angular/core/testing';
import {
  SkyLinkRecordsState,
  SkyLinkRecordsStateDispatcher,
  SkyLinkRecordsStateModel
} from './state/';
import { SkyLinkRecordsMatchesLoadAction } from './state/matches/actions';
import { SkyLinkRecordsSelectedSetSelectedAction } from './state/selected/actions';
import { SkyLinkRecordsMatchModel } from './state/matches/match.model';
import { SkyCheckboxModule } from '../checkbox';
import { SkyLinkRecordsItemDiffComponent } from './link-records-item-diff.component';
import { SkyResourcesModule } from '../resources';
import { SKY_LINK_RECORDS_STATUSES } from './link-records-statuses';

describe('Component: SkyLinkRecordsItemDiffComponent', () => {
  let fixture: ComponentFixture<SkyLinkRecordsItemDiffComponent>,
    component: SkyLinkRecordsItemDiffComponent,
    dispatcher: SkyLinkRecordsStateDispatcher,
    state: SkyLinkRecordsState;

  beforeEach(async(() => {
    dispatcher = new SkyLinkRecordsStateDispatcher();
    state = new SkyLinkRecordsState(new SkyLinkRecordsStateModel(), dispatcher);

    TestBed.configureTestingModule({
      declarations: [
        SkyLinkRecordsItemDiffComponent
      ],
      imports: [
        SkyCheckboxModule,
        SkyResourcesModule
      ],
      providers: [
        { provide: SkyLinkRecordsState, useValue: state },
        { provide: SkyLinkRecordsStateDispatcher, useValue: dispatcher }
      ]
    });

    fixture = TestBed.createComponent(SkyLinkRecordsItemDiffComponent);
    component = fixture.componentInstance;
  }));

  it('error should be thrown on init if key is undefined', () => {
    component.key = undefined;
    try {
      fixture.detectChanges();
    } catch (error) {
      expect(error.message).toEqual("'key' is required.");
    }
  });

  it('match state is linked and field state empty ngOnInit if matchField length zero', async(() => {
    let item = {
      id: '1',
      address: '123',
      name: 'Kevin'
    };

    let linkRecordMatch = new SkyLinkRecordsMatchModel({
      key: '1',
      status: SKY_LINK_RECORDS_STATUSES.NoMatch,
      item: item
    });

    let fields = [{ key: 'none' }];

    dispatcher.next(new SkyLinkRecordsMatchesLoadAction([linkRecordMatch]));

    component.key = '1';
    component.item = item;
    component.match = linkRecordMatch;
    component.fields = fields;

    fixture.detectChanges();

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

  it('field state is populated on ngOnInit if matchField length is not zero', async(() => {
    let item = {
      id: '1',
      address: 101,
      name: 'Apple',
      description: 'Anne eats apples'
    };

    let linkRecordMatch = new SkyLinkRecordsMatchModel({
      key: '1',
      status: SKY_LINK_RECORDS_STATUSES.Edit,
      item: { id: '11', address: 111, name: 'Big Apple', description: 'George and his apples' }
    });

    let fields = [{
      key: 'description',
      label: 'label '
    }];

    dispatcher.next(new SkyLinkRecordsMatchesLoadAction([linkRecordMatch]));

    component.key = '1';
    component.item = item;
    component.match = linkRecordMatch;
    component.fields = fields;

    fixture.detectChanges();

    state.map((s: any) => s.fields.item).take(1)
      .subscribe((f: any) => {
        let field = f['1'][0];
        expect(field.currentValue).toEqual(linkRecordMatch.item.description);
        expect(field.newValue).toEqual(item.description);
      });
  }));

  it('selected state set on ngOnInit if match defined and selectedByDefault is true', async(() => {
    let item = {
      id: '1',
      address: 101,
      name: 'Apple',
      description: 'Anne eats apples'
    };

    let linkRecordMatch = new SkyLinkRecordsMatchModel({
      key: '1',
      status: SKY_LINK_RECORDS_STATUSES.Edit,
      item: { id: '11', address: 111, name: 'Big Apple', description: 'George and his apples' }
    });

    let fields = [{
      key: 'description'
    }];

    dispatcher.next(new SkyLinkRecordsMatchesLoadAction([linkRecordMatch]));

    component.key = '1';
    component.item = item;
    component.match = linkRecordMatch;
    component.fields = fields;
    component.selectedByDefault = true;

    fixture.detectChanges();

    state.map((s: any) => s.selected.item).take(1)
      .subscribe((s: any) => {
        let selected = s['1'];
        expect(selected.description).toBe(true);
      });
  }));

  it('selected state is not set on ngOnInit if match is already selected', async(() => {
    let item = {
      id: '1',
      address: 101,
      name: 'Apple',
      description: 'Anne eats apples'
    };

    let linkRecordMatch = new SkyLinkRecordsMatchModel({
      key: '1',
      status: SKY_LINK_RECORDS_STATUSES.Edit,
      item: { id: '11', address: 111, name: 'Big Apple', description: 'George and his apples' }
    });

    let fields = [{
      key: 'description'
    }];

    let action = new SkyLinkRecordsSelectedSetSelectedAction(
      '1',
      'description',
      true
    );

    dispatcher.next(action);
    dispatcher.next(new SkyLinkRecordsMatchesLoadAction([linkRecordMatch]));

    component.key = '1';
    component.item = item;
    component.match = linkRecordMatch;
    component.fields = fields;
    component.selectedByDefault = true;

    fixture.detectChanges();

    spyOn(dispatcher, 'next');
    expect(dispatcher.next).not.toHaveBeenCalledWith(action);
  }));

  it('linked state set ngOnInit if fields cur val is falsey and new val is truthy', async(() => {
    let item = {
      id: '1',
      address: 101,
      name: 'Apple',
      description: 'Anne eats apples'
    };

    let linkRecordMatch = new SkyLinkRecordsMatchModel({
      key: '1',
      status: SKY_LINK_RECORDS_STATUSES.Edit,
      item: { id: '11', address: 111, name: 'Big Apple', description: '' }
    });

    let fields = [{
      key: 'description'
    }];

    dispatcher.next(new SkyLinkRecordsMatchesLoadAction([linkRecordMatch]));

    component.key = '1';
    component.item = item;
    component.match = linkRecordMatch;
    component.fields = fields;
    component.selectedByDefault = true;

    fixture.detectChanges();

    state.map((s: any) => s.matches.items).take(1)
      .subscribe((m: any) => {
        let match = m[0];
        expect(match.status).toEqual(SKY_LINK_RECORDS_STATUSES.Linked);
      });
  }));

  it('setFieldSelected sets selected state when checked is true', async(() => {
    let item = {
      id: '1',
      address: '123',
      name: 'Kevin'
    };

    let linkRecordMatch = new SkyLinkRecordsMatchModel({
      key: '1',
      status: SKY_LINK_RECORDS_STATUSES.NoMatch,
      item: item
    });

    let fields = [{ key: 'none' }];

    component.key = '1';
    component.item = item;
    component.match = linkRecordMatch;
    component.fields = fields;

    fixture.detectChanges();

    let fieldKey = 'testKey';
    component.setFieldSelected(fieldKey, {checked: true});

    state.map((s: any) => s.selected.item).take(1)
      .subscribe((s: any) => {
        let selected = s['1']['testKey'];
        expect(selected).toBe(true);
      });

  }));

  it('setFieldSelected sets selected state when checked is false', async(() => {
    let item = {
      id: '1',
      address: '123',
      name: 'Kevin'
    };

    let linkRecordMatch = new SkyLinkRecordsMatchModel({
      key: '1',
      status: SKY_LINK_RECORDS_STATUSES.NoMatch,
      item: item
    });

    let fields = [{ key: 'none' }];

    component.key = '1';
    component.item = item;
    component.match = linkRecordMatch;
    component.fields = fields;

    fixture.detectChanges();

    let fieldKey = 'testKey';
    component.setFieldSelected(fieldKey, {checked: false});

    state.map((s: any) => s.selected.item).take(1)
      .subscribe((s: any) => {
        let selected = s['1']['testKey'];
        expect(selected).toBe(false);
      });
  }));

  it('selecteByDefault string "true" converts to boolean true', () => {
    let selectedByDefault: any = 'true';
    let item = {
      id: '1',
      address: 101,
      name: 'Apple',
      description: 'Anne eats apples'
    };

    let linkRecordMatch = new SkyLinkRecordsMatchModel({
      key: '1',
      status: SKY_LINK_RECORDS_STATUSES.Edit,
      item: { id: '11', address: 111, name: 'Big Apple', description: 'George and his apples' }
    });

    let fields = [{
      key: 'description'
    }];

    dispatcher.next(new SkyLinkRecordsMatchesLoadAction([linkRecordMatch]));

    component.key = '1';
    component.item = item;
    component.match = linkRecordMatch;
    component.fields = fields;
    component.selectedByDefault = selectedByDefault;

    fixture.detectChanges();

    expect(component.selectedByDefault).toBe(true);
  });

  it('field value returns empty array if component key does not exist in field state', async(() => {
    let item = {
      id: '1',
      address: 101,
      name: 'Apple',
      description: 'Anne eats apples'
    };

    let linkRecordMatch = new SkyLinkRecordsMatchModel({
      key: '1',
      status: SKY_LINK_RECORDS_STATUSES.Edit,
      item: { id: '11', address: 111, name: 'Big Apple', description: 'George and his apples' }
    });

    let fields = [{ key: 'none' }];

    component.item = item;
    component.key = 'testKey';
    component.match = linkRecordMatch;
    component.fields = fields;

    fixture.detectChanges();

    component.key = 'undefinedKey';

    fixture.detectChanges();

    component.fieldValues.take(1)
      .subscribe(f => {
        let field = f;
        expect(field).toEqual([]);
      });
  }));

  it('record state goes straight to linked if match has no value and showNewFieldValues is false',
  async(() => {
    let item = {
      id: '1',
      address: 101,
      name: 'Apple',
      description: 'Anne eats apples'
    };

    let linkRecordMatch = new SkyLinkRecordsMatchModel({
      key: '1',
      status: SKY_LINK_RECORDS_STATUSES.Edit,
      item: { id: '11', address: 111, name: '', description: '' }
    });

    let fields = [{ key: 'name' }, { key: 'description' }];

    component.item = item;
    component.key = '1';
    component.match = linkRecordMatch;
    component.fields = fields;
    component.showNewFieldValues = false;

    fixture.detectChanges();

    component.fieldValues.take(1)
      .subscribe(f => {
        let field = f;
        expect(field.length).toEqual(2);
      });
  }));

  it('record state shows edits of matched fields with no value',
  async(() => {
    let item = {
      id: '1',
      address: 101,
      name: 'Apple',
      description: 'Anne eats apples'
    };

    let linkRecordMatch = new SkyLinkRecordsMatchModel({
      key: '1',
      status: SKY_LINK_RECORDS_STATUSES.Edit,
      item: { id: '11', address: 111, name: '', description: '' }
    });

    let fields = [{ key: 'name' }, { key: 'description' }];

    component.item = item;
    component.key = '1';
    component.match = linkRecordMatch;
    component.fields = fields;
    component.showNewFieldValues = true;

    fixture.detectChanges();

    component.fieldValues.take(1)
      .subscribe(f => {
        let field = f;
        expect(field.length).toEqual(2);
      });
  }));
});
