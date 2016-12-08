import {
  TestBed,
  async
} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {
  ListState,
  ListStateDispatcher
} from '../list/state';
import * as moment from 'moment';
import { Observable, BehaviorSubject } from 'rxjs';
import { ListItemModel } from '../list/state/items/item.model';
import {
  ListItemsLoadAction,
  ListItemsSetLoadingAction
} from '../list/state/items/actions';
import {
  ListSelectedSetItemsSelectedAction
} from '../list/state/selected/actions';
import { ListFixturesModule } from './fixtures/list-fixtures.module';
import { ListTestComponent } from './fixtures/list.component.fixture';
import { ListAsyncTestComponent } from './fixtures/list-async.component.fixture';
import { ListDualTestComponent } from './fixtures/list-dual.component.fixture';
import { ListEmptyTestComponent } from './fixtures/list-empty.component.fixture';
import { SkyListComponent, SkyListModule } from './';
import { SkyListToolbarModule } from '../list-toolbar';
import { SkyListViewGridModule, SkyListViewGridComponent } from '../list-view-grid';
import { SkyListFiltersModule } from '../list-filters';
import { SkyListFiltersComponent } from '../list-filters/list-filters.component';
import { ListFilterModel } from './state/filters/filter.model';
import { ListFiltersClearAction, ListFiltersLoadAction } from './state/filters/actions';
import { ListSearchSetFunctionsAction } from './state/search/actions';
import { ListSortFieldSelectorModel } from './state/sort/field-selector.model';
import { ListSortLabelModel } from './state/sort/label.model';
import { ListSortSetFieldSelectorsAction } from './state/sort/actions';
import { ListToolbarItemModel } from './state/toolbar/toolbar-item.model';
import { ListToolbarItemsLoadAction } from './state/toolbar/actions';
import { ListFilterDataModel } from './state/filters/filter-data.model';

describe('List Component', () => {
  describe('List Fixture', () => {
    describe('List Component with Observable', () => {
      let state: ListState,
          dispatcher: ListStateDispatcher,
          component: ListTestComponent,
          fixture: any,
          nativeElement: HTMLElement,
          element: DebugElement,
          items: Observable<any>,
          bs: BehaviorSubject<any>;

      beforeEach(async(() => {
        dispatcher = new ListStateDispatcher();
        state = new ListState(dispatcher);

        /* tslint:disable */
        let itemsArray = [
          { id: '1', column1: '30', column2: 'Apple',
            column3: 1, column4: moment().add(1, 'minute') },
          { id: '2', column1: '01', column2: 'Banana',
            column3: 3, column4: moment().add(6, 'minute') },
          { id: '3', column1: '11', column2: 'Banana',
            column3: 11, column4: moment().add(4, 'minute') },
          { id: '4', column1: '12', column2: 'Carrot',
            column3: 12, column4: moment().add(2, 'minute') },
          { id: '5', column1: '12', column2: 'Edamame',
            column3: 12, column4: moment().add(5, 'minute') },
          { id: '6', column1: null, column2: null,
            column3: 20, column4: moment().add(3, 'minute') },
          { id: '7', column1: '22', column2: 'Grape',
            column3: 21, column4: moment().add(7, 'minute') }
        ];

        bs = new BehaviorSubject<Array<any>>(itemsArray);
        items = bs.asObservable();

        TestBed.configureTestingModule({
          imports: [
            ListFixturesModule,
            SkyListModule,
            SkyListFiltersModule,
            SkyListToolbarModule,
            SkyListViewGridModule,
            FormsModule
          ],
          providers: [
            { provide: 'items', useValue: items }
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

        fixture = TestBed.createComponent(ListTestComponent);
        nativeElement = fixture.nativeElement as HTMLElement;
        element = fixture.debugElement as DebugElement;
        component = fixture.componentInstance;
        fixture.detectChanges();

        // always skip the first update to ListState, when state is ready
        // run detectChanges once more then begin tests
        state.skip(1).take(1).subscribe(() => fixture.detectChanges());
        fixture.detectChanges();
      }));

      function setSearchInput(text: string) {
        let searchInputElement = element.query(
          By.css('.toolbar-item-container input[type="text"]')
        ).nativeElement;
        searchInputElement.value = text;
        var event = document.createEvent('Event');
        event.initEvent('input', true, true);
        searchInputElement.dispatchEvent(event);
        fixture.detectChanges();
        return fixture.whenStable();
      }

      function setFilterSelect(text: string, modal: boolean = false) {
        let filterSelect = modal ?
          document.querySelector('.sky-list-filters-modal-bar select') :
          element.query(By.css('.sky-list-filters-inline-bar select')).nativeElement;
        filterSelect.value = text;
        var event = document.createEvent('Event');
        event.initEvent('change', true, true);
        filterSelect.dispatchEvent(event);
        fixture.detectChanges();
        return fixture.whenStable();
      }

      it('should load data', () => {
        expect(element.queryAll(By.css('tr.sky-list-view-grid-row')).length).toBe(7);
      });

      it('should load new data', () => {
        expect(element.queryAll(By.css('tr.sky-list-view-grid-row')).length).toBe(7);
        fixture.detectChanges();
        bs.next([
          { id: '1', column1: '1', column2: 'Large',
            column3: 2, column4: moment().add(15, 'minute') },
          { id: '2', column1: '22', column2: 'Small',
            column3: 3, column4: moment().add(60, 'minute') },
          { id: '3', column1: '33', column2: 'Medium',
            column3: 4, column4: moment().add(45, 'minute') }
        ]);
        fixture.detectChanges();
        expect(element.queryAll(By.css('tr.sky-list-view-grid-row')).length).toBe(3);
      });

      it('should update displayed items when data is updated', () => {
        let newItems = [
          { id: '11', column1: '11', column2: 'Coffee',
            column3: 11, column4: moment().add(11, 'minute') },
          { id: '12', column1: '12', column2: 'Tea',
            column3: 12, column4: moment().add(12, 'minute') }
        ];

        bs.next(newItems);
        fixture.detectChanges();

        expect(element.queryAll(By.css('tr.sky-list-view-grid-row')).length).toBe(2);
      });

      it('should search based on input text', async(() => {
        setSearchInput('banana')
        .then(() => {
          fixture.detectChanges();
          element.query(
            By.css('button[cmp-id="search"] i')
          ).nativeElement.click();
          fixture.detectChanges();
          expect(element.queryAll(By.css('tr.sky-list-view-grid-row')).length).toBe(2);
        });
      }));

      it('should sort', () => {
        expect(element.queryAll(By.css('tr.sky-list-view-grid-row')).length).toBe(7);
        element.query(By.css('th.heading')).triggerEventHandler('click', undefined);
        fixture.detectChanges();
        expect(element.query(
          By.css('sky-list-view-grid-cell[cmp-id="column1"]')
        ).nativeElement.textContent.trim()).toBe('');
        fixture.detectChanges();
        element.query(By.css('th.heading')).triggerEventHandler('click', undefined);
        fixture.detectChanges();
        expect(element.query(
          By.css('sky-list-view-grid-cell[cmp-id="column1"]')
        ).nativeElement.textContent.trim()).toBe('01');
        fixture.detectChanges();
        element.queryAll(By.css('th.heading'))[2].triggerEventHandler('click', undefined);
        fixture.detectChanges();
        expect(element.query(
          By.css('sky-list-view-grid-cell[cmp-id=".column3"]')
        ).nativeElement.textContent.trim()).toBe('21');
      });

      it('should sort based on column using cached search', async(() => {
        setSearchInput('banana')
        .then(() => {
          fixture.detectChanges();
          element.query(
            By.css('button[cmp-id="search"] i')
          ).triggerEventHandler('click', undefined);
          fixture.detectChanges();
          expect(element.queryAll(By.css('tr.sky-list-view-grid-row')).length).toBe(2);
          expect(element.query(
            By.css('sky-list-view-grid-cell[cmp-id="column1"]')
          ).nativeElement.textContent.trim()).toBe('01');

          element.query(By.css('th.heading')).triggerEventHandler('click', undefined);
          fixture.detectChanges();
          expect(element.query(
            By.css('sky-list-view-grid-cell[cmp-id="column1"]')
          ).nativeElement.textContent.trim()).toBe('11');
        });
      }));

      it('should sort based on sort state', () => {
        dispatcher.next(new ListSortSetFieldSelectorsAction(['column1']));
        fixture.detectChanges();
        element.query(By.css('th.heading')).triggerEventHandler('click', undefined);
        fixture.detectChanges();
        expect(element.query(
          By.css('sky-list-view-grid-cell[cmp-id="column1"]')
        ).nativeElement.textContent.trim()).toBe('');
      });

      it('should filter based on defined filter', async(() => {
        fixture.detectChanges();
        element.query(By.css('button[cmp-id="filter"]')).triggerEventHandler('click', undefined);
        fixture.detectChanges();
        setFilterSelect('banana').then(() => {
          expect(element.queryAll(By.css('tr.sky-list-view-grid-row')).length).toBe(2);
          fixture.detectChanges();
          setFilterSelect('apple').then(() => {
            expect(element.queryAll(By.css('tr.sky-list-view-grid-row')).length).toBe(1);
          });
        });
      }));

      it('should filter using cached filter', async(() => {
        fixture.detectChanges();
        element.query(By.css('button[cmp-id="filter"]')).triggerEventHandler('click', undefined);
        fixture.detectChanges();
        setFilterSelect('banana').then(() => {
          expect(element.query(
            By.css('sky-list-view-grid-cell[cmp-id="column1"]')
          ).nativeElement.textContent.trim()).toBe('01');

          element.query(By.css('th.heading')).triggerEventHandler('click', undefined);
          fixture.detectChanges();
          expect(element.query(
            By.css('sky-list-view-grid-cell[cmp-id="column1"]')
          ).nativeElement.textContent.trim()).toBe('11');
        });
      }));

      it('should filter using modal then clear active filter', async(() => {
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          element.query(By.css('button[cmp-id="filter"]')).triggerEventHandler('click', undefined);
          fixture.detectChanges();
          element.query(
            By.css('.sky-list-filters-inline-bar button[cmp-id="filter-show-more"]')
          ).nativeElement.click();
          fixture.detectChanges();
          (<HTMLButtonElement><any>document
            .querySelector('sky-modal-footer button[cmp-id="clear-filters"]')).click();
          fixture.detectChanges();

          return fixture.whenStable();
        })
        .then(() => setFilterSelect('banana', true))
        .then(() => {
            (<HTMLButtonElement><any>document
              .querySelector('sky-modal-footer button[cmp-id="apply-filters"]')).click();
            fixture.detectChanges();

            expect(element.queryAll(By.css('tr.sky-list-view-grid-row')).length).toBe(2);
            expect(element.query(
              By.css('.sky-list-filters-modal-active span.filter-button')
            ).nativeElement.textContent.trim()).toBe('banana');
            expect(element.query(
              By.css('sky-list-view-grid-cell[cmp-id="column1"]')
            ).nativeElement.textContent.trim()).toBe('01');
            expect(element.query(
              By.css('sky-list-view-grid-cell[cmp-id="column2"]')
            ).nativeElement.textContent.trim()).toBe('Banana');

            (<HTMLButtonElement><any>document
              .querySelector('.sky-list-filters-modal-active span.filter-button i')).click();
            fixture.detectChanges();

            expect(element.queryAll(By.css('tr.sky-list-view-grid-row')).length).toBe(7);
            expect(element.queryAll(By.css('.sky-list-filters-modal-active')).length).toBe(0);
        });
      }));

      describe('itemCount', () => {
        it('should return count', async(() => {
          component.list.itemCount.subscribe(c => {
            expect(c).toBe(7);
          });
        }));
      });

      describe('lastUpdate', () => {
        it('should return last updated date', async(() => {
          component.list.lastUpdate.take(1).subscribe(u => {
            state.take(1).subscribe((s) => {
              expect(moment(u).isSame(s.items.lastUpdate)).toBeTruthy();
            });
          });
        }));

        it('should return undefined if not defined', async(() => {
          state.map((s) => s.items.lastUpdate = undefined).take(1).subscribe();
          component.list.lastUpdate.take(1).subscribe((u) => {
            expect(u).toBeUndefined();
          });
        }));
      });
    });

    describe('List Component with Array', () => {
      let state: ListState,
          dispatcher: ListStateDispatcher,
          component: ListTestComponent,
          fixture: any,
          nativeElement: HTMLElement,
          element: DebugElement;

      beforeEach(async(() => {
        dispatcher = new ListStateDispatcher();
        state = new ListState(dispatcher);

        let items = [
          { id: '1', column1: '1', column2: 'Apple',
            column3: 1, column4: moment().add(1, 'minute') },
          { id: '2', column1: '01', column2: 'Banana',
            column3: 1, column4: moment().add(6, 'minute') },
          { id: '3', column1: '11', column2: 'Carrot',
            column3: 11, column4: moment().add(4, 'minute') },
          { id: '4', column1: '12', column2: 'Daikon',
            column3: 12, column4: moment().add(2, 'minute') },
          { id: '5', column1: '13', column2: 'Edamame',
            column3: 13, column4: moment().add(5, 'minute') },
          { id: '6', column1: '20', column2: 'Fig',
            column3: 20, column4: moment().add(3, 'minute') },
          { id: '7', column1: '21', column2: 'Grape',
            column3: 21, column4: moment().add(7, 'minute') }
        ];

        TestBed.configureTestingModule({
          imports: [
            ListFixturesModule,
            SkyListModule,
            SkyListToolbarModule,
            SkyListViewGridModule,
            SkyListFiltersModule,
            FormsModule
          ],
          providers: [
            { provide: 'items', useValue: items }
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

        fixture = TestBed.createComponent(ListTestComponent);
        nativeElement = fixture.nativeElement as HTMLElement;
        element = fixture.debugElement as DebugElement;
        component = fixture.componentInstance;
        fixture.detectChanges();

        // always skip the first update to ListState, when state is ready
        // run detectChanges once more then begin tests
        state.skip(1).take(1).subscribe(() => fixture.detectChanges());
        fixture.detectChanges();
      }));

      it('should load data', () => {
        expect(element.queryAll(By.css('tr.sky-list-view-grid-row')).length).toBe(7);
      });
    });
  });

  describe('Async List Fixture', () => {
    describe('List Component with Observable', () => {
      let state: ListState,
          dispatcher: ListStateDispatcher,
          component: ListTestComponent,
          fixture: any,
          nativeElement: HTMLElement,
          element: DebugElement,
          items: Observable<any>,
          bs: BehaviorSubject<any>;

      beforeEach(async(() => {
        dispatcher = new ListStateDispatcher();
        state = new ListState(dispatcher);

        let itemsArray = [
          { id: '1', column1: '1', column2: 'Apple',
            column3: 1, column4: moment().add(1, 'minute') },
          { id: '2', column1: '01', column2: 'Banana',
            column3: 1, column4: moment().add(6, 'minute') }
        ];

        bs = new BehaviorSubject<Array<any>>(itemsArray);
        items = bs.asObservable();

        TestBed.configureTestingModule({
          imports: [
            ListFixturesModule,
            SkyListModule,
            SkyListToolbarModule,
            SkyListViewGridModule,
            SkyListFiltersModule,
            FormsModule
          ],
          providers: [
            { provide: 'items', useValue: items }
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

        fixture = TestBed.createComponent(ListAsyncTestComponent);
        nativeElement = fixture.nativeElement as HTMLElement;
        element = fixture.debugElement as DebugElement;
        component = fixture.componentInstance;
        fixture.detectChanges();

        // always skip the first update to ListState, when state is ready
        // run detectChanges once more then begin tests
        state.skip(1).take(1).subscribe(() => fixture.detectChanges());
        fixture.detectChanges();
      }));

      function setSearchInput(text: string) {
        let searchInputElement = element.query(
          By.css('.toolbar-item-container input[type="text"]')
        ).nativeElement;
        searchInputElement.value = text;
        var event = document.createEvent('Event');
        event.initEvent('input', true, true);
        searchInputElement.dispatchEvent(event);
        fixture.detectChanges();
        return fixture.whenStable();
      }

      it('should load array data', () => {
        expect(element.queryAll(By.css('tr.sky-list-view-grid-row')).length).toBe(2);
      });

      it('should search based on input text', async(() => {
        setSearchInput('banana')
        .then(() => {
          fixture.detectChanges();
          element.query(By.css('button[cmp-id="search"] i'))
            .triggerEventHandler('click', undefined);
          fixture.detectChanges();
          expect(element.queryAll(By.css('tr.sky-list-view-grid-row')).length).toBe(3);
        });
      }));

      it('should sort search results', async(() => {
        setSearchInput('banana')
        .then(() => {
          fixture.detectChanges();
          element.query(By.css('button[cmp-id="search"] i'))
            .triggerEventHandler('click', undefined);
          fixture.detectChanges();
          expect(element.queryAll(By.css('tr.sky-list-view-grid-row')).length).toBe(3);

          element.query(By.css('th.heading')).triggerEventHandler('click', undefined);
          fixture.detectChanges();
          expect(element.query(
            By.css('sky-list-view-grid-cell[cmp-id="column1"]')).nativeElement.textContent.trim()
          ).toBe('301');
        });
      }));

      it('should return last results based on same search', async(() => {
        setSearchInput('banana')
        .then(() => {
          fixture.detectChanges();
          element.query(By.css('button[cmp-id="search"] i'))
            .triggerEventHandler('click', undefined);
          fixture.detectChanges();
          expect(element.queryAll(By.css('tr.sky-list-view-grid-row')).length).toBe(3);

          setSearchInput('banana')
          .then(() => {
            fixture.detectChanges();
            element.query(By.css('button[cmp-id="search"] i'))
              .triggerEventHandler('click', undefined);
            fixture.detectChanges();
            expect(element.queryAll(By.css('tr.sky-list-view-grid-row')).length).toBe(3);
          });
        });
      }));

      it('should open filter modal when filter button clicked', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          element.query(By.css('button[cmp-id="filter"]')).nativeElement.click();
          fixture.detectChanges();
          fixture.whenStable().then(() => {
              expect(element.queryAll(By.css('.sky-list-filters-inline-bar')).length).toBe(0);
              expect(document.querySelectorAll('.sky-modal').length).toBe(1);

              (<HTMLButtonElement><any>document.querySelector('button.sky-modal-btn-close'))
                .click();
          });
        });
      }));

    });
  });

  describe('Empty List Fixture', () => {
    describe('List Component with Observable', () => {
      let state: ListState,
          dispatcher: ListStateDispatcher,
          component: ListTestComponent,
          fixture: any,
          nativeElement: HTMLElement,
          element: DebugElement,
          items: Observable<any>,
          bs: BehaviorSubject<any>;

      beforeEach(async(() => {
        dispatcher = new ListStateDispatcher();
        state = new ListState(dispatcher);

        let itemsArray = [
          { id: '1', column1: '1', column2: 'Apple',
            column3: 1, column4: moment().add(1, 'minute') },
          { id: '2', column1: '01', column2: 'Banana',
            column3: 1, column4: moment().add(6, 'minute') }
        ];

        bs = new BehaviorSubject<Array<any>>(itemsArray);
        items = bs.asObservable();

        TestBed.configureTestingModule({
          imports: [
            ListFixturesModule,
            SkyListModule,
            SkyListToolbarModule,
            SkyListViewGridModule,
            SkyListFiltersModule,
            FormsModule
          ],
          providers: [
            { provide: 'items', useValue: items }
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

        fixture = TestBed.createComponent(ListEmptyTestComponent);
        nativeElement = fixture.nativeElement as HTMLElement;
        element = fixture.debugElement as DebugElement;
        component = fixture.componentInstance;
        fixture.detectChanges();

        // always skip the first update to ListState, when state is ready
        // run detectChanges once more then begin tests
        state.skip(1).take(1).subscribe(() => fixture.detectChanges());
        fixture.detectChanges();
      }));

      it('should be empty', () => {
        expect(element.queryAll(By.css('tr.sky-list-view-grid-row')).length).toBe(0);
      });
    });
  });

  describe('Dual view Fixture', () => {
    describe('List Component with Observable', () => {
      let state: ListState,
          dispatcher: ListStateDispatcher,
          component: ListTestComponent,
          fixture: any,
          nativeElement: HTMLElement,
          element: DebugElement,
          items: Observable<any>,
          bs: BehaviorSubject<any>;

      beforeEach(async(() => {
        dispatcher = new ListStateDispatcher();
        state = new ListState(dispatcher);

        /* tslint:disable */
        let itemsArray = [
          { id: '1', column1: '30', column2: 'Apple',
            column3: 1, column4: moment().add(1, 'minute') },
          { id: '2', column1: '01', column2: 'Banana',
            column3: 3, column4: moment().add(6, 'minute') },
          { id: '3', column1: '11', column2: 'Banana',
            column3: 11, column4: moment().add(4, 'minute') },
          { id: '4', column1: '12', column2: 'Carrot',
            column3: 12, column4: moment().add(2, 'minute') },
          { id: '5', column1: '12', column2: 'Edamame',
            column3: 12, column4: moment().add(5, 'minute') },
          { id: '6', column1: null, column2: null,
            column3: 20, column4: moment().add(3, 'minute') },
          { id: '7', column1: '22', column2: 'Grape',
            column3: 21, column4: moment().add(7, 'minute') }
        ];

        bs = new BehaviorSubject<Array<any>>(itemsArray);
        items = bs.asObservable();

        TestBed.configureTestingModule({
          imports: [
            ListFixturesModule,
            SkyListModule,
            SkyListFiltersModule,
            SkyListToolbarModule,
            SkyListViewGridModule,
            FormsModule
          ],
          providers: [
            { provide: 'items', useValue: items }
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

        fixture = TestBed.createComponent(ListDualTestComponent);
        nativeElement = fixture.nativeElement as HTMLElement;
        element = fixture.debugElement as DebugElement;
        component = fixture.componentInstance;
        fixture.detectChanges();

        // always skip the first update to ListState, when state is ready
        // run detectChanges once more then begin tests
        state.skip(1).take(1).subscribe(() => fixture.detectChanges());
        fixture.detectChanges();
      }));

      it('should switch views when clicking view selector', () => {
        fixture.detectChanges();
        expect(element.queryAll(
          By.css('sky-list-view-grid[ng-reflect-name="First"] th.heading')
        ).length).toBe(2);
        element.query(
          By.css('sky-list-toolbar-item-renderer[cmp-id="view-selector"] button')
        ).triggerEventHandler('click', undefined);
        fixture.detectChanges();
        element.query(
          By.css('sky-dropdown-item[cmp-id="' + component.list.views[1].id + '"] button')
        ).triggerEventHandler('click', undefined);
        fixture.detectChanges();
        expect(element.queryAll(
          By.css('sky-list-view-grid[ng-reflect-name="Second"] th.heading')
        ).length).toBe(1);
        element.query(
          By.css('sky-dropdown-item[cmp-id="' + component.list.views[0].id + '"] button')
        ).triggerEventHandler('click', undefined);
        fixture.detectChanges();
      });

      it('should return list of views', () => {
        expect(component.list.views.length).toBe(2);
        expect(component.list.views[0] instanceof SkyListViewGridComponent).toBeTruthy();
        expect(component.list.views[0].label).toBe('First');
        expect(component.list.views[1] instanceof SkyListViewGridComponent).toBeTruthy();
        expect(component.list.views[1].label).toBe('Second');
      });
    });
  });

  describe('Models and State', () => {
    it('should construct ListFilterModel without data', () => {
      let model = new ListFilterModel();
      expect(model.label).toBeUndefined();
      expect(model.type).toBeUndefined();
      expect(model.view).toBeUndefined();
    });

    it('should construct ListFiltersClearAction', () => {
      let action = new ListFiltersClearAction();
      expect(action).not.toBeUndefined();
    });

    it('should construct ListItemModel without data', () => {
      let model = new ListItemModel('1');
      expect(model.id).toBe('1');
      expect(model.data).toBeUndefined();
    });

    it('should construct ListItemModel and throw error if id is undefined', () => {
      expect(() => { new ListItemModel(undefined, false); })
        .toThrow(new Error('All list item models require an ID'));
    });

    it('should construct ListItemsSetLoadingAction', () => {
      let action = new ListItemsSetLoadingAction(true);
      expect(action).not.toBeUndefined();
    });

    it('should run ListItemsLoadAction action without refresh', async(() => {
      let listDispatcher = new ListStateDispatcher();
      let listState = new ListState(listDispatcher);
      let items = [
        new ListItemModel('1', false),
        new ListItemModel('2', false)
      ];

      listDispatcher.next(new ListItemsLoadAction(items));
      listState.take(1).subscribe(s => {
        expect(s.items.count).toBe(2);
      });
      listDispatcher.next(new ListItemsLoadAction(items, false, false, 50));
      listState.take(1).subscribe(s => {
        expect(s.items.count).toBe(50);
      });
    }));

    it('should construct ListSelectedSetItemsSelectedAction', () => {
      let action = new ListSelectedSetItemsSelectedAction(['1']);
      expect(action).not.toBeUndefined();
    });

    it('should construct ListSearchSetFunctionsAction', () => {
      let action = new ListSearchSetFunctionsAction();
      expect(action).not.toBeUndefined();
    });

    it('should construct ListSortFieldSelectorModel without data', () => {
      let model = new ListSortFieldSelectorModel();
      expect(model.descending).toBeFalsy();
      expect(model.fieldSelector).toBeUndefined();
    });

    it('should construct ListSortLabelModel without data', () => {
      let model = new ListSortLabelModel();
      expect(model.global).toBeFalsy();
      expect(model.text).toBeUndefined();
      expect(model.fieldSelector).toBeUndefined();
      expect(model.fieldType).toBeUndefined();
    });

    it('should construct ListToolbarItemModel without data', () => {
      let model = new ListToolbarItemModel();
      expect(model.template).toBeUndefined();
      expect(model.location).toBeUndefined();
      expect(model.view).toBeUndefined();
      expect(model.id).toBeUndefined();
    });

    it('filter should be able to call clearFilter with invalid id', () => {
      let dispatcher = new ListStateDispatcher();
      let state = new ListState(dispatcher);
      dispatcher.next(new ListFiltersLoadAction([new ListFilterModel()]));

      let filter = new SkyListFiltersComponent(state, dispatcher, null);
      filter.clearFilter('test');
      expect(filter).not.toBeUndefined();
    });

    it('create ListFilterDataModel without passing in an id', () => {
      let filterDataModel = new ListFilterDataModel({
        id: null,
        value: 'value',
        onChange: null
      });

      expect(filterDataModel.id).not.toBeNull();
    });

    it('should construct ListToolbarItemsLoadAction action', async(() => {
      let action = new ListToolbarItemsLoadAction([new ListToolbarItemModel()]);
      expect(action).not.toBeUndefined();
    }));
  });
});
