import { DebugElement } from '@angular/core';
import {
  TestBed,
  async
} from '@angular/core/testing';
import {
  SkyLinkRecordsComponent,
  SkyLinkRecordsItemComponent,
  SkyLinkRecordsRendererComponent,
  SkyLinkRecordsItemDiffComponent
} from './';
import { LinkRecordsItemModel } from './link-records-item.model';
import { LinkRecordsMatchModel } from './state/matches/match.model';
import { LinkRecordsFieldModel } from './state/fields/field.model';
import { LinkRecordsResultModel } from './state/results/result.model';
import { LinkRecordsResultsLoadAction } from './state/results/actions';
import { LinkRecordsSelectedSetSelectedAction } from './state/selected/actions';
import { LinkRecordsFieldsSetFieldsAction } from './state/fields/actions';
import { LinkRecordsMatchesLoadAction } from './state/matches/actions';
import {
  LinkRecordsState,
  LinkRecordsStateDispatcher,
  LinkRecordsStateModel
} from './state/';
import { Observable } from 'rxjs/Observable';
import { SkyCheckboxModule } from '@blackbaud/skyux/dist/core';
import { STATUSES } from './link-records-statuses';

describe('Component: SkyLinkRecordsComponent', () => {
  let fixture: any,
    element: DebugElement,
    component: any,
    dispatcher: LinkRecordsStateDispatcher,
    state: LinkRecordsState;

  beforeEach(async(() => {
    dispatcher = new LinkRecordsStateDispatcher();
    state = new LinkRecordsState(new LinkRecordsStateModel(), dispatcher);

    TestBed.configureTestingModule({
      declarations: [
        SkyLinkRecordsComponent,
        SkyLinkRecordsItemComponent,
        SkyLinkRecordsRendererComponent,
        SkyLinkRecordsItemDiffComponent
      ],
      imports: [
        SkyCheckboxModule
      ],
      providers: [
        { provide: LinkRecordsState, useValue: state },
        { provide: LinkRecordsStateDispatcher, useValue: dispatcher }
      ]
    });

    fixture = TestBed.createComponent(SkyLinkRecordsComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    state = component.state as LinkRecordsState;
    dispatcher = component.dispatcher as LinkRecordsStateDispatcher;
  }));

  it('items are converted to observable on ngOnInit', () => {
    component.items = [{ id: '1' }];

    fixture.detectChanges();
    expect(component.items instanceof Observable).toBe(true);
  });

  it('matches are converted to observable on ngOnInit', () => {
    component.matches = [{ id: '1' }];

    fixture.detectChanges();
    expect(component.matches instanceof Observable).toBe(true);
  });

  it('matchFields are converted to observable on ngOnInit', () => {
    component.matchFields = [{ key: 'name' }];

    fixture.detectChanges();
    expect(component.matches instanceof Observable).toBe(true);
  });

  it('unlinked matches loaded into state and result item is undefined on ngOnInit', async(() => {
    let linkRecordMatch = new LinkRecordsMatchModel({
      key: '1',
      status: STATUSES.Created,
      item: { id: '11' }
    });
    component.matches = Observable.of([linkRecordMatch]);

    fixture.detectChanges();

    state.map(s => s.matches.items).take(1)
      .subscribe(m => {
        let match = m[0];
        expect(match.key).toEqual(linkRecordMatch.key);
        expect(match.status).toEqual(linkRecordMatch.status);
        expect(match.item).toEqual(linkRecordMatch.item);
      });

    state.map(s => s.results.items).take(1)
      .subscribe(r => {
        let result = r[0];
        expect(result.key).toEqual(linkRecordMatch.key);
        expect(result.status).toEqual(linkRecordMatch.status);
        expect(result.item).toBeUndefined();
      });
  }));

  it('error is thrown if fields key does equal keyIdSelector on ngOnInit', async(() => {
    let fields = [{
      key: 'testKey'
    }];
    component.keyIdSelector = 'testKey';
    component.matchFields = Observable.of(fields);

    try {
      fixture.detectChanges();
    } catch (error) {
      expect(error.message).toEqual("'keyIdSelector' cannot be a match field.");
    }
  }));

  it('Linked items are loaded in results state on ngOnInit', async(() => {
    let item = {
      id: '1',
      address: '123',
      name: 'Kevin'
    };

    let linkRecordMatch = new LinkRecordsMatchModel({
      key: '1',
      status: STATUSES.Linked,
      item: item
    });

    component.matches = Observable.of([linkRecordMatch]);

    fixture.detectChanges();

    state.map(s => s.results.items).take(1)
      .subscribe(r => {
        let result = r[0];
        expect(result.status).toEqual(STATUSES.Linked);
      });
  }));

  it('linked items w\ new fields are loaded in results state on ngOnInit', async(() => {
    let item = {
      id: '1',
      address: '123',
      name: 'Kevin'
    };

    let field = new LinkRecordsFieldModel({
      key: 'name',
      label: 'name',
      currentValue: 'Kevin',
      newValue: 'Brian'
    });

    let linkRecordMatch = new LinkRecordsMatchModel({
      key: '1',
      status: STATUSES.Linked,
      item: item
    });

    component.matches = Observable.of([linkRecordMatch]);

    dispatcher.next(new LinkRecordsSelectedSetSelectedAction('1', 'name', true));
    dispatcher.next(new LinkRecordsFieldsSetFieldsAction('1', [field]));

    fixture.detectChanges();

    state.map(s => s.results.items).take(1)
      .subscribe(r => {
        let result = r[0];
        expect(result.status).toEqual(STATUSES.Linked);
        expect(result.item.name).toEqual(field.newValue);
      });
  }));

  it('linked item w\ new fields not in results if not in selection on ngOnInit', async(() => {
    let item = {
      id: '1',
      address: '123',
      name: 'Kevin'
    };

    let field = new LinkRecordsFieldModel({
      key: 'name',
      label: 'name',
      currentValue: 'Kevin',
      newValue: 'Brian'
    });

    let linkRecordMatch = new LinkRecordsMatchModel({
      key: '1',
      status: STATUSES.Linked,
      item: item
    });

    component.matches = Observable.of([linkRecordMatch]);
    dispatcher.next(new LinkRecordsFieldsSetFieldsAction('1', [field]));

    fixture.detectChanges();

    state.map(s => s.results.items).take(1)
      .subscribe(r => {
        let result = r[0];
        expect(result.status).toEqual(STATUSES.Linked);
        expect(result.item.name).not.toEqual(field.newValue);
      });
  }));

  it('records returns item match if match key equals keyIdSelector', async(() => {
    let item = {
      id: '1',
      address: '123',
      name: 'Kevin'
    };

    let linkRecordMatch = new LinkRecordsMatchModel({
      key: '1',
      status: STATUSES.Created,
      item: { id: '22' }
    });

    component.items = Observable.of([item]);
    component.matches = Observable.of([linkRecordMatch]);

    fixture.detectChanges();

    component.records.take(1)
      .subscribe((r: LinkRecordsItemModel[]) => {
        let record = r[0];
        expect(record.key).toEqual(linkRecordMatch.key);
        expect(record.status).toEqual(linkRecordMatch.status);
      });
  }));

  it('records returns undefined match if status is no match', async(() => {
     let item = {
      id: '1',
      address: '123',
      name: 'Kevin'
    };

    component.items = Observable.of([item]);

    fixture.detectChanges();

    component.records.take(1).subscribe((r: LinkRecordsItemModel[]) => {
      let record = r[0];
      expect(record.status).toEqual(STATUSES.NoMatch);
    });
  }));

  it('records returns no match instance if matches is empty', async(() => {
     let item = {
      id: '1',
      address: '123',
      name: 'Kevin'
    };

    let linkRecordMatch = new LinkRecordsMatchModel({
      key: '1',
      status: STATUSES.NoMatch,
      item: { id: '22' }
    });

    component.items = Observable.of([item]);
    component.matches = Observable.of([linkRecordMatch]);

    fixture.detectChanges();

    component.records.take(1)
      .subscribe((r: LinkRecordsItemModel[]) => {
        let record = r[0];
        expect(record.match).toBeUndefined();
      });
  }));

  it('results are returned from state', async(() => {
    let linkRecordResult = new LinkRecordsResultModel({
      key: '1',
      status: STATUSES.Created,
      item: {}
    });

    dispatcher.next(new LinkRecordsResultsLoadAction([linkRecordResult]));

    component.results.take(1)
      .subscribe((r: LinkRecordsResultModel[]) => {
        let result = r;
        expect(result.length > 0).toBe(true);
      });
  }));

  it('recordMatches are returned from state', async(() => {
    let linkRecordMatch = new LinkRecordsMatchModel({
      key: '1',
      status: STATUSES.Created,
      item: { id: '11' }
    });

    dispatcher.next(new LinkRecordsMatchesLoadAction([linkRecordMatch]));

    component.recordMatches.take(1)
      .subscribe((m: LinkRecordsMatchModel[]) => {
        let matches = m;
        expect(matches.length > 0).toBe(true);
      });
  }));

  it('LinkRecordsItemModel undefined constructor data init defaults fields', () => {
    let linkRecordItem = new LinkRecordsItemModel();

    expect(linkRecordItem.key).toBeUndefined();
    expect(linkRecordItem.status).toBeUndefined();
    expect(linkRecordItem.item).toBeUndefined();
    expect(linkRecordItem.match).toBeDefined();
    expect(linkRecordItem.matchFields).toBeDefined();
  });
});
