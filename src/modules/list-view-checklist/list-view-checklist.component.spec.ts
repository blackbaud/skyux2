import {
  TestBed,
  async
} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  ListState,
  ListStateDispatcher
} from '../list/state';
import * as moment from 'moment';
import { ListViewsLoadAction } from '../list/state/views/actions';
import { ListViewModel } from '../list/state/views/view.model';
import { ListItemModel } from '../list/state/items/item.model';
import { ListItemsLoadAction } from '../list/state/items/actions';
import { ListDisplayedItemsLoadAction } from '../list/state/displayed-items/actions';
import {
  ListViewChecklistTestComponent
} from './fixtures/list-view-checklist.component.fixture';
import {
  ListViewChecklistEmptyTestComponent
} from './fixtures/list-view-checklist-empty.component.fixture';
import { SkyListViewChecklistModule } from './';
import { ListViewChecklistItemsLoadAction } from './state/items/actions';
import { ListViewChecklistItemModel } from './state/items/item.model';
import { ChecklistState, ChecklistStateDispatcher, ChecklistStateModel } from './state';

describe('List View Checklist Component', () => {
  describe('Basic Fixture', () => {
    let state: ListState,
        dispatcher: ListStateDispatcher,
        component: ListViewChecklistTestComponent,
        fixture: any,
        nativeElement: HTMLElement,
        element: DebugElement,
        items: Array<any>;

    beforeEach(async(() => {
      dispatcher = new ListStateDispatcher();
      state = new ListState(dispatcher);

      TestBed.configureTestingModule({
        declarations: [
          ListViewChecklistTestComponent
        ],
        imports: [
          SkyListViewChecklistModule
        ],
        providers: [
          { provide: ListState, useValue: state },
          { provide: ListStateDispatcher, useValue: dispatcher }
        ]
      });

      fixture = TestBed.createComponent(ListViewChecklistTestComponent);
      nativeElement = fixture.nativeElement as HTMLElement;
      element = fixture.debugElement as DebugElement;
      component = fixture.componentInstance;
      fixture.detectChanges();

      items = [
        new ListItemModel('1', { column1: '1', column2: 'Apple',
          column3: 'aa', column4: moment().add(1, 'minute') }),
        new ListItemModel('2', { column1: '01', column2: 'Banana',
          column3: 'bb', column4: moment().add(6, 'minute'), column5: 'test' }),
        new ListItemModel('3', { column1: '11', column2: 'Banana',
          column3: 'cc', column4: moment().add(4, 'minute') }),
        new ListItemModel('4', { column1: '12', column2: 'Daikon',
          column3: 'dd', column4: moment().add(2, 'minute') }),
        new ListItemModel('5', { column1: '13', column2: 'Edamame',
          column3: 'ee', column4: moment().add(5, 'minute') }),
        new ListItemModel('6', { column1: '20', column2: 'Fig',
          column3: 'ff', column4: moment().add(3, 'minute') }),
        new ListItemModel('7', { column1: '21', column2: 'Grape',
          column3: 'gg', column4: moment().add(7, 'minute') })
      ];

      dispatcher.next(new ListItemsLoadAction(items, true));
      dispatcher.next(new ListDisplayedItemsLoadAction(items));
      dispatcher.next(new ListViewsLoadAction([
        new ListViewModel(component.checklist.id, component.checklist.label)
      ]));
      dispatcher.viewsSetActive(component.checklist.id);
      fixture.detectChanges();

      // always skip the first update to ListState, when state is ready
      // run detectChanges once more then begin tests
      state.skip(1).take(1).subscribe(() => fixture.detectChanges());
      fixture.detectChanges();
    }));

    it('should show checklist with proper labels', () => {
      expect(element.queryAll(By.css('sky-list-view-checklist-item')).length).toBe(7);
      expect(element.query(
        By.css('sky-list-view-checklist-item sky-checkbox-label strong')
      ).nativeElement.textContent.trim()).toBe('1');
      expect(element.query(
        By.css('sky-list-view-checklist-item sky-checkbox-label div')
      ).nativeElement.textContent.trim()).toBe('Apple');
    });

    it('should search based on input text', async(() => {
      let searchItems = items.filter(item => component.checklist.search()(item.data, '12'));
      dispatcher.next(new ListDisplayedItemsLoadAction(searchItems));
      fixture.detectChanges();
      expect(element.queryAll(By.css('sky-list-view-checklist-item')).length).toBe(1);

      searchItems = items.filter(item => component.checklist.search()(item.data, 'banana'));
      dispatcher.next(new ListDisplayedItemsLoadAction(searchItems));
      fixture.detectChanges();
      expect(element.queryAll(By.css('sky-list-view-checklist-item')).length).toBe(2);

      searchItems = items.filter(item => component.checklist.search()(item.data, 'bb'));
      dispatcher.next(new ListDisplayedItemsLoadAction(searchItems));
      fixture.detectChanges();
      expect(element.queryAll(By.css('sky-list-view-checklist-item')).length).toBe(1);
    }));
  });

  describe('Empty Fixture', () => {
    let state: ListState,
        dispatcher: ListStateDispatcher,
        component: ListViewChecklistEmptyTestComponent,
        fixture: any,
        nativeElement: HTMLElement,
        items: Array<any>,
        element: DebugElement;

    beforeEach(async(() => {
      dispatcher = new ListStateDispatcher();
      state = new ListState(dispatcher);

      TestBed.configureTestingModule({
        declarations: [
          ListViewChecklistEmptyTestComponent
        ],
        imports: [
          SkyListViewChecklistModule
        ],
        providers: [
          { provide: ListState, useValue: state },
          { provide: ListStateDispatcher, useValue: dispatcher }
        ]
      });

      fixture = TestBed.createComponent(ListViewChecklistEmptyTestComponent);
      nativeElement = fixture.nativeElement as HTMLElement;
      element = fixture.debugElement as DebugElement;
      component = fixture.componentInstance;
      fixture.detectChanges();

      items = [
        new ListItemModel('1', { column1: '1', column2: 'Apple',
          column3: 1, column4: moment().add(1, 'minute') })
      ];

      dispatcher.next(new ListItemsLoadAction(items, true));
      dispatcher.next(new ListDisplayedItemsLoadAction(items));
      dispatcher.next(new ListViewsLoadAction([
        new ListViewModel(component.checklist.id, component.checklist.label)
      ]));
      dispatcher.viewsSetActive(component.checklist.id);
      fixture.detectChanges();

      // always skip the first update to ListState, when state is ready
      // run detectChanges once more then begin tests
      state.skip(1).take(1).subscribe(() => fixture.detectChanges());
      fixture.detectChanges();
    }));

    it('should display 1 empty item', () => {
      expect(element.queryAll(By.css('sky-list-view-checklist-item')).length).toBe(1);
      expect(element.query(
        By.css('sky-list-view-checklist-item sky-checkbox-label')
      ).nativeElement.textContent.trim()).toBe('');
    });

    it('should search based on input text', async(() => {
      let searchItems = items.filter(item => component.checklist.search()(item.data, 'banana'));
      dispatcher.next(new ListDisplayedItemsLoadAction(searchItems));
      fixture.detectChanges();
      expect(element.queryAll(By.css('sky-list-view-checklist-item')).length).toBe(0);
    }));
  });

  describe('Models and State', () => {
    it('should create ListViewChecklistItemModel without data', () => {
      let model = new ListViewChecklistItemModel('123', true);
      expect(model.id).toBe('123');
      expect(model.category).toBeUndefined();
      expect(model.description).toBeUndefined();
      expect(model.label).toBeUndefined();
    });

    it('should run ListViewChecklistItemsLoadAction action without refresh', async(() => {
      let checklistDispatcher = new ChecklistStateDispatcher();
      let checklistState = new ChecklistState(new ChecklistStateModel(), checklistDispatcher);
      let items = [
        new ListViewChecklistItemModel('1', false),
        new ListViewChecklistItemModel('2', false)
      ];

      checklistDispatcher.next(new ListViewChecklistItemsLoadAction());
      checklistDispatcher.next(new ListViewChecklistItemsLoadAction(items));
      checklistDispatcher.next(new ListViewChecklistItemsLoadAction(items, false, false));
      checklistState.subscribe(s => {
        expect(s.items.count).toBe(2);
      });
    }));
  });
});
