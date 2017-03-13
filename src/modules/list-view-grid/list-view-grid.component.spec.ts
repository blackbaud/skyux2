import {
  TestBed,
  async,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  ListState,
  ListStateDispatcher
} from '../list/state';
let moment = require('moment');

import {
  ListViewsLoadAction
} from '../list/state/views/actions';
import { ListViewModel } from '../list/state/views/view.model';
import { ListItemModel } from '../list/state/items/item.model';
import { ListItemsLoadAction } from '../list/state/items/actions';
import { ListViewGridFixturesModule } from './fixtures/list-view-grid-fixtures.module';
import { ListViewGridTestComponent } from './fixtures/list-view-grid.component.fixture';
import {
  ListViewGridDynamicTestComponent
} from './fixtures/list-view-grid-dynamic.component.fixture';
import {
  ListViewGridDisplayTestComponent
} from './fixtures/list-view-grid-display.component.fixture';
import {
  ListViewGridEmptyTestComponent
} from './fixtures/list-view-grid-empty.component.fixture';
import { SkyListViewGridModule } from './';

import { SkyGridColumnModel } from '../grid';
import {
  ListViewGridColumnsLoadAction
} from './state/columns/actions';
import {
  ListViewDisplayedGridColumnsLoadAction
} from './state/displayed-columns/actions';
import { GridState, GridStateDispatcher, GridStateModel } from './state';

import { SkyListComponent } from '../list';
import {
  expect
} from '../testing';

describe('List View Grid Component', () => {
  describe('Basic Fixture', () => {
    let state: ListState,
        dispatcher: ListStateDispatcher,
        component: ListViewGridTestComponent,
        fixture: any,
        nativeElement: HTMLElement,
        element: DebugElement;

    beforeEach(async(() => {
      dispatcher = new ListStateDispatcher();
      state = new ListState(dispatcher);

      TestBed.configureTestingModule({
        imports: [
          ListViewGridFixturesModule,
          SkyListViewGridModule
        ],
        providers: [
          { provide: ListState, useValue: state },
          { provide: ListStateDispatcher, useValue: dispatcher }
        ]
      });

      fixture = TestBed.createComponent(ListViewGridTestComponent);
      nativeElement = fixture.nativeElement as HTMLElement;
      element = fixture.debugElement as DebugElement;
      component = fixture.componentInstance;

    }));

    function setupTest() {
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
      dispatcher.next(new ListViewsLoadAction([
        new ListViewModel(component.grid.id, component.grid.label)
      ]));
      dispatcher.viewsSetActive(component.grid.id);
      fixture.detectChanges();

      // always skip the first update to ListState, when state is ready
      // run detectChanges once more then begin tests
      state.skip(1).take(1).subscribe(() => fixture.detectChanges());
      fixture.detectChanges();
    }

    describe('standard setup', () => {
      beforeEach(() => {
        setupTest();
      });

      it('should show 6 columns', () => {
        expect(element.queryAll(By.css('th.sky-grid-heading')).length).toBe(5);
        expect(element.query(
          By.css('th[sky-cmp-id="column1"]')
        ).nativeElement.textContent.trim()).toBe('Column1');
        expect(element.query(
          By.css('th[sky-cmp-id="column2"]')
        ).nativeElement.textContent.trim()).toBe('Column2');
        expect(element.query(
          By.css('th[sky-cmp-id="column3"]')
        ).nativeElement.textContent.trim()).toBe('Column3');
        expect(element.query(
          By.css('th[sky-cmp-id="column4"]')
        ).nativeElement.textContent.trim()).toBe('Column4');
        expect(element.query(
          By.css('th[sky-cmp-id="column5"]')
        ).nativeElement.textContent.trim()).toBe('Column5');
      });

       it('should listen for the selectedColumnIdsChanged event and update the columns accordingly',
      () => {
        component.grid.gridComponent.selectedColumnIdsChange.emit(['column1', 'column2']);
        fixture.detectChanges();
        expect(element.queryAll(By.css('th.sky-grid-heading')).length).toBe(2);
        expect(element.query(
          By.css('th[sky-cmp-id="column1"]')
        ).nativeElement.textContent.trim()).toBe('Column1');
        expect(element.query(
          By.css('th[sky-cmp-id="column2"]')
        ).nativeElement.textContent.trim()).toBe('Column2');
      });

      it('should listen for the sortFieldChange event', fakeAsync(() => {
        let headerEl = nativeElement.querySelectorAll('th').item(0) as HTMLElement;
        headerEl.click();
        fixture.detectChanges();

        tick();

        state.take(1).subscribe((s) => {
          expect(s.sort.fieldSelectors[0].fieldSelector).toBe('column1');
          expect(s.sort.fieldSelectors[0].descending).toBe(true);
        });
        tick();
      }));

      it('should update grid header sort on state change', fakeAsync(() => {
        dispatcher.sortSetFieldSelectors([{ fieldSelector: 'column1', descending: false }]);
        fixture.detectChanges();
        tick();

        let headerIconEl = nativeElement.querySelectorAll('th i').item(0) as HTMLElement;
        expect(headerIconEl).toHaveCssClass('fa-caret-up');
      }));

      describe('Models and State', () => {
        it('should run ListViewGridColumnsLoadAction action', async(() => {
          let gridDispatcher = new GridStateDispatcher();
          let gridState = new GridState(new GridStateModel(), gridDispatcher);

          let columns = [
            new SkyGridColumnModel(component.viewtemplates.first),
            new SkyGridColumnModel(component.viewtemplates.first)
          ];
          gridDispatcher.next(new ListViewGridColumnsLoadAction(columns));
          gridState.take(1).subscribe(s => {
            expect(s.columns.count).toBe(2);
          });
        }));

         it('should run ListViewDisplayedGridColumnsLoadAction action with no refresh',
          async(() => {
          let gridDispatcher = new GridStateDispatcher();
          let gridState = new GridState(new GridStateModel(), gridDispatcher);

          let columns = [
            new SkyGridColumnModel(component.viewtemplates.first),
            new SkyGridColumnModel(component.viewtemplates.first)
          ];
          gridDispatcher.next(new ListViewGridColumnsLoadAction(columns));
          gridState.take(1).subscribe(s => {
            expect(s.columns.count).toBe(2);
          });

          gridDispatcher.next(new ListViewDisplayedGridColumnsLoadAction([
            new SkyGridColumnModel(component.viewtemplates.first)
          ]));

          gridState.take(1).subscribe(s => {
            expect(s.displayedColumns.count).toBe(1);
          });

          gridDispatcher.next(new ListViewDisplayedGridColumnsLoadAction([
            new SkyGridColumnModel(component.viewtemplates.first)
          ]));

          gridState.take(1).subscribe(s => {
            expect(s.displayedColumns.count).toBe(2);
          });
        }));
      });
    });

    describe('nonstandard setup', () => {
      it('should respect the hidden property when not hidden columns and displayed columns', () => {
        component.hiddenColumns = undefined;
        setupTest();

        expect(element.queryAll(By.css('th.sky-grid-heading')).length).toBe(5);
        expect(element.query(
          By.css('th[sky-cmp-id="column1"]')
        ).nativeElement.textContent.trim()).toBe('Column1');
        expect(element.query(
          By.css('th[sky-cmp-id="column2"]')
        ).nativeElement.textContent.trim()).toBe('Column2');
        expect(element.query(
          By.css('th[sky-cmp-id="column3"]')
        ).nativeElement.textContent.trim()).toBe('Column3');
        expect(element.query(
          By.css('th[sky-cmp-id="hiddenCol1"]')
        ).nativeElement.textContent.trim()).toBe('Column6');
        expect(element.query(
          By.css('th[sky-cmp-id="hiddenCol2"]')
        ).nativeElement.textContent.trim()).toBe('Column7');
      });

      it('should handle setting a searchFunction', fakeAsync(() => {
        let appliedData: any;
        let appliedSearch: string;
        component.searchFn = (data: any, searchText: string) => {
          appliedData = data;
          appliedSearch = searchText;
          return true;
        };

        setupTest();

        tick();

        state.take(1).subscribe((current) => {
          current.search.functions[0]('something', 'searchText');
          expect(appliedData).toBe('something');
          expect(appliedSearch).toBe('searchText');
        });

        tick();
      }));
    });

  });

  describe('Display Fixture', () => {
    let state: ListState,
        dispatcher: ListStateDispatcher,
        component: ListViewGridTestComponent,
        fixture: any,
        nativeElement: HTMLElement,
        element: DebugElement;

    beforeEach(async(() => {
      dispatcher = new ListStateDispatcher();
      state = new ListState(dispatcher);

      TestBed.configureTestingModule({
        imports: [
          ListViewGridFixturesModule,
          SkyListViewGridModule
        ],
        providers: [
          { provide: ListState, useValue: state },
          { provide: ListStateDispatcher, useValue: dispatcher }
        ]
      });

      fixture = TestBed.createComponent(ListViewGridDisplayTestComponent);
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
      dispatcher.next(new ListViewsLoadAction([
        new ListViewModel(component.grid.id, component.grid.label)
      ]));
      dispatcher.viewsSetActive(component.grid.id);
      fixture.detectChanges();

      // always skip the first update to ListState, when state is ready
      // run detectChanges once more then begin tests
      state.skip(1).take(1).subscribe(() => fixture.detectChanges());
      fixture.detectChanges();
    }));

    it('should show 2 columns', () => {
      expect(element.queryAll(By.css('th.sky-grid-heading')).length).toBe(2);
      expect(element.query(
        By.css('th[sky-cmp-id="column3"]')).nativeElement.textContent.trim()
      ).toBe('Column3');
      expect(element.query(
        By.css('th[sky-cmp-id="column4"]')
      ).nativeElement.textContent.trim()).toBe('Column4');
    });
  });

  describe('Empty Fixture', () => {
    let state: ListState,
        dispatcher: ListStateDispatcher,
        component: ListViewGridTestComponent,
        fixture: any,
        nativeElement: HTMLElement,
        element: DebugElement;

    beforeEach(async(() => {
      dispatcher = new ListStateDispatcher();
      state = new ListState(dispatcher);

      TestBed.configureTestingModule({
        imports: [
          ListViewGridFixturesModule,
          SkyListViewGridModule
        ],
        providers: [
          { provide: ListState, useValue: state },
          { provide: ListStateDispatcher, useValue: dispatcher }
        ]
      });

      fixture = TestBed.createComponent(ListViewGridEmptyTestComponent);
      nativeElement = fixture.nativeElement as HTMLElement;
      element = fixture.debugElement as DebugElement;
      component = fixture.componentInstance;
    }));

    it('should throw columns require error', () => {
      expect(() => { fixture.detectChanges(); })
        .toThrowError(/Grid view requires at least one sky-grid-column to render./);
    });
  });

  describe('Grid view with dynamic columns', () => {
     let state: ListState,
        dispatcher: ListStateDispatcher,
        component: ListViewGridDynamicTestComponent,
        fixture: any,
        nativeElement: HTMLElement,
        element: DebugElement;

    beforeEach(async(() => {
      dispatcher = new ListStateDispatcher();
      state = new ListState(dispatcher);

      TestBed.configureTestingModule({
        imports: [
          ListViewGridFixturesModule,
          SkyListViewGridModule
        ]
      })
      .overrideComponent(SkyListComponent, {
          set: {
            providers: [
              { provide: ListState, useValue: state },
              { provide: ListStateDispatcher, useValue: dispatcher }
            ]
          }
        });

      fixture = TestBed.createComponent(ListViewGridDynamicTestComponent);
      nativeElement = fixture.nativeElement as HTMLElement;
      element = fixture.debugElement as DebugElement;
      component = fixture.componentInstance;
      fixture.detectChanges();

      // always skip the first update to ListState, when state is ready
      // run detectChanges once more then begin tests
      state.skip(1).take(1).subscribe(() => fixture.detectChanges());
      fixture.detectChanges();
    }));

    it('should handle grid columns changing', () => {
      expect(element.queryAll(By.css('th.sky-grid-heading')).length).toBe(2);
      expect(element.query(
        By.css('th[sky-cmp-id="name"]')).nativeElement.textContent.trim()
      ).toBe('Name Initial');
      expect(element.query(
        By.css('th[sky-cmp-id="email"]')
      ).nativeElement.textContent.trim()).toBe('Email Initial');

      component.changeColumns();
      fixture.detectChanges();
      expect(element.queryAll(By.css('th.sky-grid-heading')).length).toBe(2);
      expect(element.query(
        By.css('th[sky-cmp-id="name"]')).nativeElement.textContent.trim()
      ).toBe('Name');
      expect(element.query(
        By.css('th[sky-cmp-id="email"]')
      ).nativeElement.textContent.trim()).toBe('Email');

    });

    it('should handle grid columns changing to completely different ids', () => {
      expect(element.queryAll(By.css('th.sky-grid-heading')).length).toBe(2);
      expect(element.query(
        By.css('th[sky-cmp-id="name"]')).nativeElement.textContent.trim()
      ).toBe('Name Initial');
      expect(element.query(
        By.css('th[sky-cmp-id="email"]')
      ).nativeElement.textContent.trim()).toBe('Email Initial');

      component.changeColumnsDifferent();
      fixture.detectChanges();
      expect(element.queryAll(By.css('th.sky-grid-heading')).length).toBe(1);
      expect(element.query(
        By.css('th[sky-cmp-id="other"]')).nativeElement.textContent.trim()
      ).toBe('Other');

    });
  });

});
