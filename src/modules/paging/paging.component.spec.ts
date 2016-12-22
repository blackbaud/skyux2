import {
  TestBed,
  async
} from '@angular/core/testing';

import {
  DebugElement
} from '@angular/core';

import {
  By
} from '@angular/platform-browser';

import {
  PagingTestComponent
} from './fixtures/paging.component.fixture';

import {
  SkyPagingModule
} from './paging.module';

describe('Paging component', () => {
  let component: PagingTestComponent,
      fixture: any,
      nativeElement: HTMLElement,
      element: DebugElement;
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        PagingTestComponent
      ],
      imports: [
        SkyPagingModule
      ]
    });

    fixture = TestBed.createComponent(PagingTestComponent);
    nativeElement = fixture.nativeElement as HTMLElement;
    element = fixture.debugElement as DebugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();

  }));

  describe('with 8 items', () => {

    it('should show 3 pages', () => {
      expect(element.queryAll(By.css('.sky-list-paging-link')).length).toBe(3);
    });

    it('should have a disabled previous button', () => {
      expect(element.query(
        By.css('.sky-paging-caret[cmp-id="previous"]')
      ).nativeElement.classList.contains('sky-paging-disabled')).toBe(true);
    });

    it('should have an enabled next button', () => {
      expect(element.query(
        By.css('.sky-paging-caret[cmp-id="next"]')
      ).nativeElement.classList.contains('sky-paging-disabled')).toBe(false);
    });

    it('should show selected page 1 with special style', () => {
      expect(element.query(
        By.css('.sky-list-paging-link[cmp-id="1"] a')
      ).nativeElement.classList.contains('sky-paging-current')).toBe(true);
    });

    it('should not let you change page number to 5', () => {
      component.pagingComponent.setPage(5);
      fixture.detectChanges();

      expect(element.query(
        By.css('.sky-list-paging-link[cmp-id="1"] a')
      ).nativeElement.classList.contains('sky-paging-current')).toBe(true);
    });

    it('should not let you set page number to 0', () => {
      component.pagingComponent.setPage(0);
      fixture.detectChanges();

      expect(element.query(
        By.css('.sky-list-paging-link[cmp-id="1"] a')
      ).nativeElement.classList.contains('sky-paging-current')).toBe(true);
    });

    describe('after clicking page 3', () => {
      beforeEach(async(() => {
        element.query(
          By.css('.sky-list-paging-link[cmp-id="3"] a')
        ).triggerEventHandler('click', undefined);
        fixture.detectChanges();
      }));

      it('should have an enabled previous button', () => {
        expect(element.query(
          By.css('.sky-paging-caret[cmp-id="previous"]')
        ).nativeElement.classList.contains('sky-paging-disabled')).toBe(false);
      });

      it('should have an enabled next button', () => {
        expect(element.query(
          By.css('.sky-paging-caret[cmp-id="next"]')
        ).nativeElement.classList.contains('sky-paging-disabled')).toBe(false);
      });

      it('should show selected page 3 with special style', () => {
        expect(element.query(
          By.css('.sky-list-paging-link[cmp-id="3"] a')
        ).nativeElement.classList.contains('sky-paging-current')).toBe(true);
      });

      it('should not show page 1', () => {
        expect(element.query(
          By.css('.sky-list-paging-link[cmp-id="1"]')
        )).toBeNull();
      });

      it('should show page 4', () => {
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

        it('should have enabled previous button', () => {
          expect(element.query(
            By.css('.sky-paging-caret[cmp-id="previous"]')
          ).nativeElement.classList.contains('sky-paging-disabled')).toBe(false);
        });

        it('should have disabled next button', () => {
          expect(element.query(
            By.css('.sky-paging-caret[cmp-id="next"]')
          ).nativeElement.classList.contains('sky-paging-disabled')).toBe(true);
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

        it('should have disabled previous button', () => {
           expect(element.query(
            By.css('.sky-paging-caret[cmp-id="previous"]')
          ).nativeElement.classList.contains('sky-pages-disabled')).toBe(true);
        });

        it('should have enabled next button', () => {
          expect(element.query(
            By.css('.sky-paging-caret[cmp-id="next"]')
          ).nativeElement.classList.contains('sky-paging-disabled')).toBe(false);
        });

        it('should show selected page 1 with special style', () => {
           expect(element.query(
            By.css('.sky-list-paging-link[cmp-id="1"] a')
          ).nativeElement.classList.contains('sky-paging-current')).toBe(true);
        });
      });
    });

    it('should default to last page if pageNumber set over', () => {
      component.currentPage = 12;
      fixture.detectChanges();

      expect(element.queryAll(By.css('.sky-list-paging-link')).length).toBe(3);
    });

    describe('binding changes', () => {
      it('should react properly when page size is changed', () => {

      });

      it('should react properly when maxPages is changed', () => {

      });

      it('should react properly when currentPage is changed', () => {

      });

      it('should react properly when itemCount is changed', () => {

      });
    });

    describe('accessibility', () => {
      it('should have a nav role on the parent element with a configurable aria-label', () => {

      });

      it('should have aria-label on each of the pagination numbers and next and previous buttons',
      () => {

      })
    });
  });
});
