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
import { ListViewRepeaterTestComponent } from './fixtures/list-view-repeater.component.fixture';
import {
  ListViewRepeaterTestEmptyComponent
} from './fixtures/list-view-repeater-empty.component.fixture';
import {
  ListViewRepeaterTestTemplateComponent
} from './fixtures/list-view-repeater-template.component.fixture';
import { SkyListViewRepeaterModule } from './';
import { RepeaterState, RepeaterStateDispatcher, RepeaterStateModel } from './state';
import { ListViewRepeaterSetExpandedAction } from './state/expanded/actions';

describe('List View Repeater Component', () => {

  describe('Populated Fixture', () => {
    let state: ListState,
        dispatcher: ListStateDispatcher,
        component: ListViewRepeaterTestComponent,
        fixture: any,
        nativeElement: HTMLElement,
        element: DebugElement;

    beforeEach(async(() => {
      dispatcher = new ListStateDispatcher();
      state = new ListState(dispatcher);

      TestBed.configureTestingModule({
        declarations: [
          ListViewRepeaterTestComponent
        ],
        imports: [
          SkyListViewRepeaterModule
        ],
        providers: [
          { provide: ListState, useValue: state },
          { provide: ListStateDispatcher, useValue: dispatcher }
        ]
      });

      fixture = TestBed.createComponent(ListViewRepeaterTestComponent);
      nativeElement = fixture.nativeElement as HTMLElement;
      element = fixture.debugElement as DebugElement;
      component = fixture.componentInstance;
      fixture.detectChanges();

      let items = [
        new ListItemModel('1', { column1: '1', column2: 'Apple',
          column3: 1, column4: moment().add(1, 'minute') }),
        new ListItemModel('2', { column1: '01', column2: 'Banana',
          column3: 1, column4: moment().add(6, 'minute'), column5: 'test' }),
        new ListItemModel('3', { column1: '11', column2: 'Carrot',
          column3: 11, column4: moment().add(4, 'minute') }),
        new ListItemModel('4', { column1: '12', column2: 'Daikon',
          column3: 12, column4: moment().add(2, 'minute') }),
        new ListItemModel('5', { column1: '13', column2: 'Edamame',
          column3: 13, column4: moment().add(5, 'minute') }),
        new ListItemModel('6', { column1: '20', column2: 'Fig',
          column3: 20, column4: moment().add(3, 'minute') }),
        new ListItemModel('7', { column1: '21', column2: 'Grape',
          column3: 21, column4: moment().add(7, 'minute') })
      ];

      dispatcher.next(new ListItemsLoadAction(items, true));
      dispatcher.next(new ListDisplayedItemsLoadAction(items));
      dispatcher.next(new ListViewsLoadAction([
        new ListViewModel(component.repeater.id, component.repeater.label)
      ]));
      dispatcher.viewsSetActive(component.repeater.id);
      fixture.detectChanges();

      // always skip the first update to ListState, when state is ready
      // run detectChanges once more then begin tests
      state.skip(1).take(1).subscribe(() => fixture.detectChanges());
      fixture.detectChanges();
    }));

    it('should show title and description for rows', () => {
      expect(element.queryAll(By.css('.sky-list-view-repeater-title')).length).toBe(7);
      expect(element.queryAll(By.css('.sky-list-view-repeater-description')).length).toBe(7);
      expect(element.query(
        By.css('.sky-list-view-repeater-title')).nativeElement.textContent.trim()
      ).toBe('Apple');
      expect(element.query(
        By.css('.sky-list-view-repeater-description')
      ).nativeElement.textContent.trim()).toBe('1');
    });

    it('should show left and right content for rows', () => {
      expect(element.queryAll(By.css('.sky-list-view-repeater-left')).length).toBe(7);
      expect(element.queryAll(By.css('.sky-list-view-repeater-right')).length).toBe(7);
      expect(element.query(
        By.css('.sky-list-view-repeater-left')
      ).nativeElement.textContent.trim()).toBe('left');
      expect(element.query(
        By.css('.sky-list-view-repeater-right')
      ).nativeElement.textContent.trim()).toBe('right');
    });

    it('should return proper label', () => {
      expect(component.repeater.label).toBe('TestRepeater');
    });

    it('should define a search function', () => {
      expect(component.repeater.searchFunction).not.toBeNull();
    });

    it('should toggle content on click', () => {
      expect(element.queryAll(By.css('.sky-list-view-repeater-content')).length).toBe(0);

      let repeaterItem = element.query(By.css('.sky-repeater-item'));
      repeaterItem.query(By.css('button.sky-chevron')).nativeElement.click();
      fixture.detectChanges();

      expect(element.queryAll(By.css('.sky-list-view-repeater-content')).length).toBe(1);
      expect(element.query(
        By.css('.sky-list-view-repeater-content')).nativeElement.textContent.trim()
      ).toBe('content');

      repeaterItem.query(By.css('button.sky-chevron')).nativeElement.click();
      fixture.detectChanges();

      expect(element.queryAll(By.css('.sky-list-view-repeater-content')).length).toBe(0);
    });
  });

  describe('Empty Fixture', () => {
    let state: ListState,
        dispatcher: ListStateDispatcher,
        component: ListViewRepeaterTestEmptyComponent,
        fixture: any,
        nativeElement: HTMLElement,
        element: DebugElement;

    beforeEach(async(() => {
      dispatcher = new ListStateDispatcher();
      state = new ListState(dispatcher);

      TestBed.configureTestingModule({
        declarations: [
          ListViewRepeaterTestEmptyComponent
        ],
        imports: [
          SkyListViewRepeaterModule
        ],
        providers: [
          { provide: ListState, useValue: state },
          { provide: ListStateDispatcher, useValue: dispatcher }
        ]
      });

      fixture = TestBed.createComponent(ListViewRepeaterTestEmptyComponent);
      nativeElement = fixture.nativeElement as HTMLElement;
      element = fixture.debugElement as DebugElement;
      component = fixture.componentInstance;
      fixture.detectChanges();

      let items = [
        new ListItemModel('1', { column1: '1', column2: 'Apple',
          column3: 1, column4: moment().add(1, 'minute') }),
        new ListItemModel('2', { column1: '01', column2: 'Banana',
          column3: 1, column4: moment().add(6, 'minute'), column5: 'test' }),
        new ListItemModel('3', { column1: '11', column2: 'Carrot',
          column3: 11, column4: moment().add(4, 'minute') }),
        new ListItemModel('4', { column1: '12', column2: 'Daikon',
          column3: 12, column4: moment().add(2, 'minute') }),
        new ListItemModel('5', { column1: '13', column2: 'Edamame',
          column3: 13, column4: moment().add(5, 'minute') }),
        new ListItemModel('6', { column1: '20', column2: 'Fig',
          column3: 20, column4: moment().add(3, 'minute') }),
        new ListItemModel('7', { column1: '21', column2: 'Grape',
          column3: 21, column4: moment().add(7, 'minute') })
      ];

      dispatcher.next(new ListItemsLoadAction(items, true));
      dispatcher.next(new ListDisplayedItemsLoadAction(items));
      dispatcher.next(new ListViewsLoadAction([
        new ListViewModel(component.repeater.id, component.repeater.label)
      ]));
      dispatcher.viewsSetActive(component.repeater.id);
      fixture.detectChanges();

      // always skip the first update to ListState, when state is ready
      // run detectChanges once more then begin tests
      state.skip(1).take(1).subscribe(() => fixture.detectChanges());
      fixture.detectChanges();
    }));

    it('should show empty rows', () => {
      expect(element.queryAll(By.css('.sky-repeater-item')).length).toBe(7);
      expect(element.query(
        By.css('.sky-list-view-repeater-title')
      ).nativeElement.textContent.trim()).toBe('');
      expect(element.query(
        By.css('.sky-list-view-repeater-description')
      ).nativeElement.textContent.trim()).toBe('');

      let repeaterItem = element.query(By.css('.sky-repeater-item'));
      repeaterItem.query(By.css('button.sky-chevron')).nativeElement.click();
      fixture.detectChanges();

      expect(element.queryAll(By.css('.sky-list-view-repeater-content')).length).toBe(1);
      expect(element.query(
        By.css('.sky-list-view-repeater-content')
      ).nativeElement.textContent.trim()).toBe('');
    });

    it('should return proper label', () => {
      expect(component.repeater.label).toBe('TestRepeaterEmpty');
    });
  });

  describe('Template Fixture', () => {
    let state: ListState,
        dispatcher: ListStateDispatcher,
        component: ListViewRepeaterTestTemplateComponent,
        fixture: any,
        nativeElement: HTMLElement,
        element: DebugElement;

    beforeEach(async(() => {
      dispatcher = new ListStateDispatcher();
      state = new ListState(dispatcher);

      TestBed.configureTestingModule({
        declarations: [
          ListViewRepeaterTestTemplateComponent
        ],
        imports: [
          SkyListViewRepeaterModule
        ],
        providers: [
          { provide: ListState, useValue: state },
          { provide: ListStateDispatcher, useValue: dispatcher }
        ]
      });

      fixture = TestBed.createComponent(ListViewRepeaterTestTemplateComponent);
      nativeElement = fixture.nativeElement as HTMLElement;
      element = fixture.debugElement as DebugElement;
      component = fixture.componentInstance;
      fixture.detectChanges();

      let items = [
        new ListItemModel('1', { column1: '1', column2: 'Apple',
          column3: 1, column4: moment().add(1, 'minute') }),
        new ListItemModel('2', { column1: '01', column2: 'Banana',
          column3: 1, column4: moment().add(6, 'minute'), column5: 'test' }),
        new ListItemModel('3', { column1: '11', column2: 'Carrot',
          column3: 11, column4: moment().add(4, 'minute') }),
        new ListItemModel('4', { column1: '12', column2: 'Daikon',
          column3: 12, column4: moment().add(2, 'minute') }),
        new ListItemModel('5', { column1: '13', column2: 'Edamame',
          column3: 13, column4: moment().add(5, 'minute') }),
        new ListItemModel('6', { column1: '20', column2: 'Fig',
          column3: 20, column4: moment().add(3, 'minute') }),
        new ListItemModel('7', { column1: '21', column2: 'Grape',
          column3: 21, column4: moment().add(7, 'minute') })
      ];

      dispatcher.next(new ListItemsLoadAction(items, true));
      dispatcher.next(new ListDisplayedItemsLoadAction(items));
      dispatcher.next(new ListViewsLoadAction([
        new ListViewModel(component.repeater.id, component.repeater.label)
      ]));
      dispatcher.viewsSetActive(component.repeater.id);
      fixture.detectChanges();

      // always skip the first update to ListState, when state is ready
      // run detectChanges once more then begin tests
      state.skip(1).take(1).subscribe(() => fixture.detectChanges());
      fixture.detectChanges();
    }));

    it('should use custom templates', () => {
      expect(element.queryAll(By.css('.sky-list-view-repeater-title')).length).toBe(7);
      expect(element.queryAll(By.css('.sky-list-view-repeater-description')).length).toBe(7);
      expect(element.queryAll(By.css('.sky-list-view-repeater-left')).length).toBe(7);
      expect(element.queryAll(By.css('.sky-list-view-repeater-right')).length).toBe(7);
      expect(element.query(
        By.css('.sky-list-view-repeater-title')).nativeElement.textContent.trim()
      ).toBe('temp Apple');
      expect(element.query(
        By.css('.sky-list-view-repeater-description')).nativeElement.textContent.trim()
      ).toBe('temp 1');
      expect(element.query(
        By.css('.sky-list-view-repeater-left')).nativeElement.textContent.trim()
      ).toBe('temp left');
      expect(element.query(
        By.css('.sky-list-view-repeater-right')).nativeElement.textContent.trim()
      ).toBe('temp right');

      let repeaterItem = element.query(By.css('.sky-repeater-item'));
      repeaterItem.query(By.css('button.sky-chevron')).nativeElement.click();
      fixture.detectChanges();

      expect(element.queryAll(By.css('.sky-list-view-repeater-content')).length).toBe(1);
      expect(element.query(
        By.css('.sky-list-view-repeater-content')
      ).nativeElement.textContent.trim()).toBe('temp content');
    });

    it('should return proper label', () => {
      expect(component.repeater.label).toBe('TestRepeaterTemplate');
    });
  });

  describe('Models and State', () => {
    it('should run ListViewRepeaterSetExpandedAction action without expanded', async(() => {
      let repeaterDispatcher = new RepeaterStateDispatcher();
      let repeaterState = new RepeaterState(new RepeaterStateModel(), repeaterDispatcher);

      repeaterDispatcher.next(new ListViewRepeaterSetExpandedAction('test'));
      repeaterState.subscribe(s => {
        expect(s.expanded['test']).toBeFalsy();
      });
    }));
  });
});
