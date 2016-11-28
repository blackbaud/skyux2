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
import { ListItemModel } from '../list/state/items/item.model';
import { ListItemsLoadAction } from '../list/state/items/actions';
import { SkyListPagingDefaultModule } from './';
import {
  ListPagingDefaultTestComponent
} from './fixtures/list-paging-default.component.fixture';
import { PagingStateDispatcher, PagingState, PagingStateModel } from './state';
import { SkyListPagingComponent } from './list-paging.component';
import { ListPagingCurrentSetPageNumberAction } from './state/current/actions';

describe('List Paging Component', () => {
  let state: ListState,
      dispatcher: ListStateDispatcher,
      pagingState: PagingState,
      pagingDispatcher: PagingStateDispatcher,
      component: ListPagingDefaultTestComponent,
      fixture: any,
      nativeElement: HTMLElement,
      element: DebugElement;

  beforeEach(async(() => {
    dispatcher = new ListStateDispatcher();
    state = new ListState(dispatcher);

    pagingDispatcher = new PagingStateDispatcher();
    pagingState = new PagingState(new PagingStateModel(), pagingDispatcher);

    TestBed.configureTestingModule({
      declarations: [
        ListPagingDefaultTestComponent
      ],
      imports: [
        SkyListPagingDefaultModule
      ],
      providers: [
        { provide: ListState, useValue: state },
        { provide: ListStateDispatcher, useValue: dispatcher }
      ]
    })
    .overrideComponent(SkyListPagingComponent, {
      set: {
        providers: [
          { provide: PagingState, useValue: pagingState },
          { provide: PagingStateDispatcher, useValue: pagingDispatcher }
        ]
      }
    });

    fixture = TestBed.createComponent(ListPagingDefaultTestComponent);
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

    it('should show 3 pages', () => {
      expect(element.queryAll(By.css('.sky-list-paging-link')).length).toBe(3);
    });

    it('should have a disabled previous button', () => {
      expect(element.query(
        By.css('.sky-paging-caret[cmp-id="previous"]')
      ).nativeElement.classList.contains('disabled')).toBe(true);
    });

    it('should have an enabled next button', () => {
      expect(element.query(
        By.css('.sky-paging-caret[cmp-id="next"]')
      ).nativeElement.classList.contains('disabled')).toBe(false);
    });

    it('should show selected page (1) with a special style', () => {
      expect(element.query(
        By.css('.sky-list-paging-link[cmp-id="1"] a')
      ).nativeElement.classList.contains('current')).toBe(true);
    });

    it('should not let you set page number to (5)', () => {
      component.pagingComponent.setPage(5);
      fixture.detectChanges();

      expect(element.query(
        By.css('.sky-list-paging-link[cmp-id="1"] a')
      ).nativeElement.classList.contains('current')).toBe(true);
    });

    it('should not let you set page number to (0)', () => {
      component.pagingComponent.setPage(0);
      fixture.detectChanges();

      expect(element.query(
        By.css('.sky-list-paging-link[cmp-id="1"] a')
      ).nativeElement.classList.contains('current')).toBe(true);
    });

    describe('after clicking page 3', () => {
      beforeEach(async(() => {
        element.query(
          By.css('.sky-list-paging-link[cmp-id="3"] a')
        ).triggerEventHandler('click', undefined);
        fixture.detectChanges();
      }));

      it('should have a enabled previous button', () => {
        expect(element.query(
          By.css('.sky-paging-caret[cmp-id="previous"]')
        ).nativeElement.classList.contains('disabled')).toBe(false);
      });

      it('should have an enabled next button', () => {
        expect(element.query(
          By.css('.sky-paging-caret[cmp-id="next"]')
        ).nativeElement.classList.contains('disabled')).toBe(false);
      });

      it('should show selected page (3) with a special style', () => {
        expect(element.query(
          By.css('.sky-list-paging-link[cmp-id="3"] a')
        ).nativeElement.classList.contains('current')).toBe(true);
      });

      it('should not show page (1)', () => {
        expect(element.query(
          By.css('.sky-list-paging-link[cmp-id="1"]')
        )).toBeNull();
      });

      it('should show page (4)', () => {
        expect(element.query(
          By.css('.sky-list-paging-link[cmp-id="4"]')
        )).not.toBeNull();
      });

      describe('and clicking next', () => {
        beforeEach(async(() => {
          element.query(By.css('.sky-paging-caret[cmp-id="next"]'))
            .triggerEventHandler('click', undefined);
          fixture.detectChanges();
        }));

        it('should have a enabled previous button', () => {
          expect(element.query(
            By.css('.sky-paging-caret[cmp-id="previous"]')
          ).nativeElement.classList.contains('disabled')).toBe(false);
        });

        it('should have a disabled next button', () => {
          expect(element.query(
            By.css('.sky-paging-caret[cmp-id="next"]')
          ).nativeElement.classList.contains('disabled')).toBe(true);
        });
      });

      describe('and clicking previous twice', () => {
        beforeEach(async(() => {
          element.query(
            By.css('.sky-paging-caret[cmp-id="previous"]')
          ).triggerEventHandler('click', undefined);
          element.query(
            By.css('.sky-paging-caret[cmp-id="previous"]')
          ).triggerEventHandler('click', undefined);
          fixture.detectChanges();
        }));

        it('should have a disabled previous button', () => {
          expect(element.query(
            By.css('.sky-paging-caret[cmp-id="previous"]')
          ).nativeElement.classList.contains('disabled')).toBe(true);
        });

        it('should have an enabled next button', () => {
          expect(element.query(
            By.css('.sky-paging-caret[cmp-id="next"]')
          ).nativeElement.classList.contains('disabled')).toBe(false);
        });

        it('should show selected page (1) with a special style', () => {
          expect(element.query(
            By.css('.sky-list-paging-link[cmp-id="1"] a')
          ).nativeElement.classList.contains('current')).toBe(true);
        });
      });
    });

    it('should reset to item length of count is wrong', () => {
      dispatcher.next(new ListItemsLoadAction([
        new ListItemModel('1', {}),
        new ListItemModel('2', {}),
        new ListItemModel('3', {}),
        new ListItemModel('4', {}),
        new ListItemModel('5', {})
      ], false, false, 2));
      fixture.detectChanges();

      expect(element.queryAll(By.css('.sky-list-paging-link')).length).toBe(3);
    });

    it('should default to last page if pageNumber set over', () => {
      pagingDispatcher.next(new ListPagingCurrentSetPageNumberAction(12));
      fixture.detectChanges();

      expect(element.queryAll(By.css('.sky-list-paging-link')).length).toBe(3);
    });

  });
});
