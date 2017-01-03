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
import { SkyListPagingModule } from './';
import {
  ListPagingTestComponent
} from './fixtures/list-paging.component.fixture';
import { ListItemsLoadAction } from '../list/state/items/actions';
import {
  ListPagingSetItemsPerPageAction,
  ListPagingSetMaxPagesAction,
  ListPagingSetPageNumberAction
} from '../list/state/paging/actions';
import { ListItemModel } from '../list/state/items/item.model';

describe('List Paging Component', () => {
  let state: ListState,
      dispatcher: ListStateDispatcher,
      component: ListPagingTestComponent,
      fixture: any,
      nativeElement: HTMLElement,
      element: DebugElement;

  beforeEach(async(() => {
    dispatcher = new ListStateDispatcher();
    state = new ListState(dispatcher);

    TestBed.configureTestingModule({
      declarations: [
        ListPagingTestComponent
      ],
      imports: [
        SkyListPagingModule
      ],
      providers: [
        { provide: ListState, useValue: state },
        { provide: ListStateDispatcher, useValue: dispatcher }
      ]
    });

    fixture = TestBed.createComponent(ListPagingTestComponent);
    nativeElement = fixture.nativeElement as HTMLElement;
    element = fixture.debugElement as DebugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();

    // always skip the first update to ListState, when state is ready
    // run detectChanges once more then begin tests
    state.skip(1).take(1).subscribe(() => fixture.detectChanges());
  }));

  describe('with 8 items', () => {
    beforeEach(async(() => {
      // add some base items to be paged
      dispatcher.next(new ListItemsLoadAction([
        new ListItemModel('1', {}),
        new ListItemModel('2', {}),
        new ListItemModel('3', {}),
        new ListItemModel('4', {}),
        new ListItemModel('5', {}),
        new ListItemModel('6', {}),
        new ListItemModel('7', {})
      ], true));

      fixture.detectChanges();
    }));

    describe('state changes', () => {
      it('responds to page size changes from state', () => {
        dispatcher.next( new ListPagingSetItemsPerPageAction(Number(4)));
        fixture.detectChanges();

        expect(element.query(
          By.css('.sky-list-paging-link[cmp-id="2"]')
        )).not.toBeNull();

        expect(element.query(
          By.css('.sky-list-paging-link[cmp-id="3"]')
        )).toBeNull();
      });

      it('responds to max pages changes from state', () => {
        dispatcher.next( new ListPagingSetMaxPagesAction(Number(4)));
        fixture.detectChanges();

         expect(element.query(
          By.css('.sky-list-paging-link[cmp-id="4"]')
        )).not.toBeNull();
      });

      it('responds to page number changes from state', () => {
        dispatcher.next( new ListPagingSetPageNumberAction(Number(2)));
        fixture.detectChanges();

         expect(element.query(
          By.css('.sky-list-paging-link[cmp-id="2"] a')
        ).nativeElement.classList.contains('sky-paging-current')).toBe(true);

        expect(element.query(
          By.css('.sky-paging-caret[cmp-id="previous"]')
        ).nativeElement.classList.contains('sky-paging-disabled')).toBe(false);

        expect(element.query(
          By.css('.sky-paging-caret[cmp-id="next"]')
        ).nativeElement.classList.contains('sky-paging-disabled')).toBe(false);
      });
    });

    describe('component changes', () => {
      it('dispatches set page number action when page changes from component', () => {
        element.query(
          By.css('.sky-list-paging-link[cmp-id="3"] a')
        ).triggerEventHandler('click', undefined);
        fixture.detectChanges();

        state.take(1).subscribe(stateModel => {
          expect(stateModel.paging.pageNumber).toBe(3);
        });

        fixture.detectChanges();
      });
    });
  });

});
