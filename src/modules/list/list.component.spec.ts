import {
  TestBed,
  async,
  fakeAsync,
  tick
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

import { ListFixturesModule } from './fixtures/list-fixtures.module';
import { ListTestComponent } from './fixtures/list.component.fixture';
import { ListDualTestComponent } from './fixtures/list-dual.component.fixture';
import { ListEmptyTestComponent } from './fixtures/list-empty.component.fixture';
import { SkyListComponent, SkyListModule, ListDataRequestModel, ListDataResponseModel } from './';
import { SkyListViewGridModule, SkyListViewGridComponent } from '../list-view-grid';
import { SkyListToolbarModule } from '../list-toolbar';
import {
  ListSearchModel,
  ListSearchSetFunctionsAction,
  ListSearchSetFieldSelectorsAction,
  ListToolbarItemModel,
  ListToolbarItemsLoadAction
} from './state';

import { SkyListInMemoryDataProvider } from '../list-data-provider-in-memory';

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
            SkyListViewGridModule,
            SkyListToolbarModule,
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

      function applySearch(value: string) {
        component.toolbar.searchComponent.applySearchText(value);
        fixture.detectChanges();
        return fixture.whenStable();
      }

      it('should load data', () => {
        expect(element.queryAll(By.css('tr.sky-grid-row')).length).toBe(7);
      });

      it('should load new data', () => {
        expect(element.queryAll(By.css('tr.sky-grid-row')).length).toBe(7);
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
        expect(element.queryAll(By.css('tr.sky-grid-row')).length).toBe(3);
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

        expect(element.queryAll(By.css('tr.sky-grid-row')).length).toBe(2);
      });

      it('should search based on input text', async(() => {
        applySearch('banana').then(() => {

          fixture.detectChanges();
          expect(element.queryAll(By.css('tr.sky-grid-row')).length).toBe(2);

          applySearch('banana').then(() => {
            fixture.detectChanges();
            expect(element.queryAll(By.css('tr.sky-grid-row')).length).toBe(2);
          });
        });
      }));

      describe('refreshDisplayedItems', () => {
        it('should refresh items', async(() => {
          component.list.refreshDisplayedItems();
          fixture.detectChanges();
          expect(element.queryAll(By.css('tr.sky-grid-row')).length).toBe(7);
        }));
      });

      describe('itemCount', () => {
        it('should return item count', () => {
          component.list.itemCount.take(1).subscribe(u => {
            state.take(1).subscribe((s) => {
              expect(u).toBe(s.items.count);
            });
          });
        });
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
            SkyListViewGridModule,
            SkyListToolbarModule,
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
        expect(element.queryAll(By.css('tr.sky-grid-row')).length).toBe(7);
      });
    });
  });

  describe('Empty List Fixture', () => {
    describe('List Component with Observable', () => {
      let state: ListState,
          dispatcher: ListStateDispatcher,
          component: ListTestComponent,
          fixture: any,
          dataProvider: SkyListInMemoryDataProvider,
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
        dataProvider = new SkyListInMemoryDataProvider(items);

        TestBed.configureTestingModule({
          imports: [
            ListFixturesModule,
            SkyListModule,
            SkyListViewGridModule,
            SkyListToolbarModule,
            FormsModule
          ],
          providers: [
            { provide: 'items', useValue: items },
            { provide: SkyListInMemoryDataProvider, useValue: dataProvider }
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
        expect(element.queryAll(By.css('tr.sky-grid-row')).length).toBe(0);
      });

      it('displayed items returns without error', async(() => {
        let list = fixture.componentInstance.list;

        list.displayedItems.subscribe((d: any) => {
          expect(d.count).toBe(2);
          expect(d.items.length).toBe(2);
        });

        expect(list.displayedItems).not.toBe(null);
      }));

      it('displayed items returns with generated ids', async(() => {
        let list = fixture.componentInstance.list;

        bs.next([
          { column1: '1', column2: 'Apple',
            column3: 1, column4: moment().add(1, 'minute') },
          { column1: '01', column2: 'Banana',
            column3: 1, column4: moment().add(6, 'minute') }
        ]);
        fixture.detectChanges();

        list.displayedItems.subscribe((d: any) => {
          expect(d.count).toBe(2);
          expect(d.items.length).toBe(2);
          expect(d.items[0].id).not.toBe(1);
           expect(d.items[1].id).not.toBe(2);
        });

        expect(list.displayedItems).not.toBe(null);
      }));

      it('data provider filteredItems with no search function', () => {
        let provider = fixture.componentInstance.list.dataProvider;
        let request = new ListDataRequestModel({
          pageSize: 10,
          pageNumber: 1,
          search: new ListSearchModel(),

        });

        let response = provider.get(request);
        response.take(1).subscribe();
        response.take(1).subscribe((r: any) => expect(r.count).toBe(2));

      });

      it('data provider filteredItems with defined search function', () => {
        let provider = fixture.componentInstance.list.dataProvider;
        provider.searchFunction = (data: any, searchText: string) => { return 'search'; }

        let request = new ListDataRequestModel({
          pageSize: 10,
         pageNumber: 1,
         search: new ListSearchModel({ searchText: 'search', functions: [() => {}] }),
        });

        let response = provider.get(request);
        response.take(1).subscribe((r: any) => expect(r.count).toBe(2));

      });
    });

    describe('List Component with no data', () => {
      let state: ListState,
          dispatcher: ListStateDispatcher,
          component: ListTestComponent,
          fixture: any,
          dataProvider: SkyListInMemoryDataProvider,
          nativeElement: HTMLElement,
          element: DebugElement,
          bs: BehaviorSubject<any>;

      beforeEach(async(() => {
        dispatcher = new ListStateDispatcher();
        state = new ListState(dispatcher);
        dataProvider = new SkyListInMemoryDataProvider();

        TestBed.configureTestingModule({
          imports: [
            ListFixturesModule,
            SkyListModule,
            SkyListViewGridModule,
            SkyListToolbarModule,
            FormsModule
          ],
          providers: [
            { provide: 'items', useValue: null },
            { provide: SkyListInMemoryDataProvider, useValue: dataProvider }
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

      it('data provider should not be null even with no data', () => {
        let list = fixture.componentInstance.list;

        expect(list.data).toBe(null);
        expect(list.dataProvider).not.toBe(null);

        list.dataProvider.count()
          .take(1)
          .subscribe((count: any) => {
            expect(count).toBe(0);
        });
      });
    });

    describe('List Component with no data and no data provider', () => {
      let state: ListState,
          dispatcher: ListStateDispatcher,
          component: ListTestComponent,
          fixture: any,
          nativeElement: HTMLElement,
          element: DebugElement,
          bs: BehaviorSubject<any>;

      beforeEach(async(() => {
        dispatcher = new ListStateDispatcher();
        state = new ListState(dispatcher);

        TestBed.configureTestingModule({
          imports: [
            ListFixturesModule,
            SkyListModule,
            SkyListViewGridModule,
            SkyListToolbarModule,
            FormsModule
          ],
          providers: [
            { provide: 'items', useValue: null },
            { provide: SkyListInMemoryDataProvider, useValue: null }
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

      it('displayed items should throw error', () => {
        let list = fixture.componentInstance.list;
        try {
          list.displayedItems;
        } catch (error) {
          expect(error.message).toBe('List requires data or dataProvider to be set.');
        }
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
            SkyListViewGridModule,
            SkyListToolbarModule,
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

      it('should switch views when setting view active', () => {
        fixture.detectChanges();
        expect(element.queryAll(
          By.css('sky-list-view-grid[ng-reflect-name="First"] th.sky-grid-heading')
        ).length).toBe(2);
        dispatcher.viewsSetActive(component.list.views[1].id);

        fixture.detectChanges();

        expect(element.queryAll(
          By.css('sky-list-view-grid[ng-reflect-name="Second"] th.sky-grid-heading')
        ).length).toBe(1);

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

  describe('models', () => {
    it('should handle undefined data for request model', () => {
      let model = new ListDataRequestModel();
      expect(model.pageNumber).toBe(1);
      expect(model.pageSize).toBe(10);
    });

    it('should handle undefined data for response model', () => {
      let model = new ListDataResponseModel();
      expect(model.count).toBe(undefined);
      expect(model.items).toBe(undefined);
    });

     it('should construct ListSearchSetFunctionsAction', () => {
      let action = new ListSearchSetFunctionsAction();
      expect(action).not.toBeUndefined();
    });

    it('should construct ListSearchSetFieldSelectorsAction', () => {
      let action = new ListSearchSetFieldSelectorsAction();
      expect(action).not.toBeUndefined();
    });

    it('should construct ListToolbarItemModel without data', () => {
      let model = new ListToolbarItemModel();
      expect(model.template).toBeUndefined();
      expect(model.location).toBeUndefined();
      expect(model.view).toBeUndefined();
      expect(model.id).toBeUndefined();
    });

    it('should construct ListToolbarItemsLoadAction action', async(() => {
      let action = new ListToolbarItemsLoadAction([new ListToolbarItemModel()]);
      expect(action).not.toBeUndefined();
    }));

    describe('toolbar load action', () => {
      it('should handle index of -1 or greater than current length', fakeAsync(() => {
        let dispatcher = new ListStateDispatcher();
        let state = new ListState(dispatcher);

        state.skip(1).take(1).subscribe(() => tick());
        tick();

        let newItems: ListToolbarItemModel[] = [
          new ListToolbarItemModel({
            id: '0'
          }),
          new ListToolbarItemModel({
            id: '2'
          })
        ];
        dispatcher.toolbarAddItems(newItems, -1);

        tick();

        state.take(1).subscribe((current) => {
          expect(current.toolbar.items.length).toBe(2);
        });

        tick();

        newItems = [
          new ListToolbarItemModel({
            id: 'blue'
          })
        ];

        dispatcher.toolbarAddItems(newItems, 6);

        tick();

        state.take(1).subscribe((current) => {
          expect(current.toolbar.items[2].id).toBe('blue');
        });

        tick();

      }));

      it('should handle index of 0', fakeAsync(() => {
        let dispatcher = new ListStateDispatcher();
        let state = new ListState(dispatcher);

        state.skip(1).take(1).subscribe(() => tick());
        tick();

        let newItems: ListToolbarItemModel[] = [
          new ListToolbarItemModel({
            id: '0'
          }),
          new ListToolbarItemModel({
            id: '2'
          })
        ];
        dispatcher.toolbarAddItems(newItems, -1);

        tick();

        newItems = [
          new ListToolbarItemModel({
            id: 'blue'
          })
        ];

        dispatcher.toolbarAddItems(newItems, 0);

        tick();

        state.take(1).subscribe((current) => {
          expect(current.toolbar.items[0].id).toBe('blue');
        });

        tick();
      }));

      it('should handle index of less than current length', fakeAsync(() => {
         let dispatcher = new ListStateDispatcher();
        let state = new ListState(dispatcher);

        state.skip(1).take(1).subscribe(() => tick());
        tick();

        let newItems: ListToolbarItemModel[] = [
          new ListToolbarItemModel({
            id: '0'
          }),
          new ListToolbarItemModel({
            id: '2'
          })
        ];
        dispatcher.toolbarAddItems(newItems, -1);

        tick();

        newItems = [
          new ListToolbarItemModel({
            id: 'blue'
          })
        ];

        dispatcher.toolbarAddItems(newItems, 1);

        tick();

        state.take(1).subscribe((current) => {
          expect(current.toolbar.items[1].id).toBe('blue');
        });

        tick();
      }));
    });
  });

});
