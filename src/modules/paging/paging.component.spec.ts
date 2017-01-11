import {
  TestBed
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
  beforeEach(() => {

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

  });

  function getPagingSelector(type: string) {
    if (type === 'next' || type === 'previous') {
      return '.sky-paging-caret[sky-cmp-id="' + type + '"]';
    } else {
      return '.sky-list-paging-link a[sky-cmp-id="' + type + '"]';
    }
  }

  describe('with 8 items', () => {

    it('should show 3 pages', () => {
      expect(element.queryAll(By.css('.sky-list-paging-link')).length).toBe(3);
    });

    it('should have a disabled previous button', () => {
      expect(element.query(
        By.css(getPagingSelector('previous'))
      ).nativeElement.classList.contains('sky-paging-disabled')).toBe(true);
    });

    it('should have an enabled next button', () => {
      expect(element.query(
        By.css(getPagingSelector('next'))
      ).nativeElement.classList.contains('sky-paging-disabled')).toBe(false);
    });

    it('should show selected page 1 with special style', () => {
      expect(element.query(
        By.css(getPagingSelector('1'))
      ).nativeElement.classList.contains('sky-paging-current')).toBe(true);
    });

    it('should not let you change page number to 5', () => {
      component.pagingComponent.setPage(5);
      fixture.detectChanges();

      expect(element.query(
        By.css(getPagingSelector('1'))
      ).nativeElement.classList.contains('sky-paging-current')).toBe(true);
    });

    it('should not let you set page number to 0', () => {
      component.pagingComponent.setPage(0);
      fixture.detectChanges();

      expect(element.query(
        By.css(getPagingSelector('1'))
      ).nativeElement.classList.contains('sky-paging-current')).toBe(true);
    });

    describe('after clicking page 3', () => {
      beforeEach(() => {
        element.query(
          By.css(getPagingSelector('3'))
        ).triggerEventHandler('click', undefined);
        fixture.detectChanges();
      });

      it('should have an enabled previous button', () => {
        expect(element.query(
          By.css(getPagingSelector('previous'))
        ).nativeElement.classList.contains('sky-paging-disabled')).toBe(false);
      });

      it('should have an enabled next button', () => {
        expect(element.query(
          By.css(getPagingSelector('next'))
        ).nativeElement.classList.contains('sky-paging-disabled')).toBe(false);
      });

      it('should show selected page 3 with special style', () => {
        expect(element.query(
          By.css(getPagingSelector('3'))
        ).nativeElement.classList.contains('sky-paging-current')).toBe(true);
      });

      it('should not show page 1', () => {
        expect(element.query(
          By.css(getPagingSelector('1'))
        )).toBeNull();
      });

      it('should show page 4', () => {
        expect(element.query(
          By.css(getPagingSelector('4'))
        )).not.toBeNull();
      });

      describe('and clicking next', () => {
        beforeEach(() => {
          element.query(By.css(getPagingSelector('next')))
            .triggerEventHandler('click', undefined);
          fixture.detectChanges();
        });

        it('should have enabled previous button', () => {
          expect(element.query(
            By.css(getPagingSelector('previous'))
          ).nativeElement.classList.contains('sky-paging-disabled')).toBe(false);
        });

        it('should have disabled next button', () => {
          expect(element.query(
            By.css(getPagingSelector('next'))
          ).nativeElement.classList.contains('sky-paging-disabled')).toBe(true);
        });
      });

      describe('and clicking previous twice', () => {
        beforeEach(() => {
          element.query(
            By.css(getPagingSelector('previous'))
          ).triggerEventHandler('click', undefined);
          element.query(
            By.css(getPagingSelector('previous'))
          ).triggerEventHandler('click', undefined);
          fixture.detectChanges();
        });

        it('should have disabled previous button', () => {
           expect(element.query(
            By.css(getPagingSelector('previous'))
          ).nativeElement.classList.contains('sky-paging-disabled')).toBe(true);
        });

        it('should have enabled next button', () => {
          expect(element.query(
            By.css(getPagingSelector('next'))
          ).nativeElement.classList.contains('sky-paging-disabled')).toBe(false);
        });

        it('should show selected page 1 with special style', () => {
           expect(element.query(
            By.css(getPagingSelector('1'))
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
      it('should react properly when currentPage is changed', () => {
        component.currentPage = 2;
        fixture.detectChanges();

        expect(element.query(
          By.css(getPagingSelector('2'))
        ).nativeElement.classList.contains('sky-paging-current')).toBe(true);

        expect(element.query(
          By.css(getPagingSelector('previous'))
        ).nativeElement.classList.contains('sky-paging-disabled')).toBe(false);

        expect(element.query(
          By.css(getPagingSelector('next'))
        ).nativeElement.classList.contains('sky-paging-disabled')).toBe(false);

      });

      it('should react properly when itemCount is changed', () => {
        component.itemCount = 3;
        fixture.detectChanges();

        expect(element.query(
          By.css(getPagingSelector('3'))
        )).toBeNull();
      });

      it('should react properly when pageSize is changed', () => {
        component.pageSize = 4;
        fixture.detectChanges();

        expect(element.query(
          By.css(getPagingSelector('3'))
        )).toBeNull();
      });

      it('should react properly when maxPages is changed', () => {
        component.maxPages = 4;
        fixture.detectChanges();

        expect(element.query(
          By.css(getPagingSelector('4'))
        )).not.toBeNull();
      });
    });

    describe('accessibility', () => {
      it('should have a nav role on the parent element with a given aria-label', () => {
        component.label = 'My label';
        fixture.detectChanges();

        let navElement = element.query(
          By.css('ul')
        ).nativeElement;

        expect(navElement.getAttribute('role')).toBe('navigation');

        expect(navElement.getAttribute('aria-label')).toBe('My label');
      });

      it('should have a nav role on the parent element with a default aria-label', () => {

        let navElement = element.query(
          By.css('ul')
        ).nativeElement;

        expect(navElement.getAttribute('aria-label')).toBe('Pagination');
      });

      it('should have aria-label on each of the next and previous buttons',
      () => {
        let prevElement = element.query(
          By.css(getPagingSelector('previous'))
        ).nativeElement;

        expect(prevElement.getAttribute('aria-label')).toBe('Previous');

        let nextElement = element.query(
          By.css(getPagingSelector('next'))
        ).nativeElement;

        expect(nextElement.getAttribute('aria-label')).toBe('Next');
      });
    });
  });
});
