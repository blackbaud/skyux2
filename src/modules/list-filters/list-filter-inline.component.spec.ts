import {
  ListState,
  ListStateDispatcher
} from '../list/state';

import {
  TestBed,
  fakeAsync,
  async,
  tick,
  ComponentFixture
} from '@angular/core/testing';

import {
  expect,
  SkyAppTestUtility
} from '@blackbaud/skyux-builder/runtime/testing/browser';

import {
  ListFilterInlineTestComponent
} from './fixtures/list-filter-inline.component.fixture';

import {
  SkyListToolbarModule
} from '../list-toolbar';

import {
  SkyListFiltersModule
} from '.';

import { FormsModule } from '@angular/forms';

import {
  SkyCheckboxModule
} from '../checkbox';

import {
  SkyListFilterInlineModel
} from './list-filter-inline.model';

describe('List inline filters', () => {

  let state: ListState,
    dispatcher: ListStateDispatcher,
    fixture: ComponentFixture<ListFilterInlineTestComponent>,
    nativeElement: HTMLElement,
    component: ListFilterInlineTestComponent;

  beforeEach(async(() => {
    dispatcher = new ListStateDispatcher();
    state = new ListState(dispatcher);

    TestBed.configureTestingModule({
      declarations: [
        ListFilterInlineTestComponent
      ],
      imports: [
        SkyListToolbarModule,
        SkyListFiltersModule,
        FormsModule,
        SkyCheckboxModule
      ],
      providers: [
        { provide: ListState, useValue: state },
        { provide: ListStateDispatcher, useValue: dispatcher }
      ]
    });

    fixture = TestBed.createComponent(ListFilterInlineTestComponent);
    nativeElement = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

  }));

  function getFilterButton() {
    return nativeElement.querySelector('.sky-list-toolbar-container .sky-filter-btn');
  }

  function getInlineFilters() {
    return nativeElement.querySelectorAll('.sky-list-toolbar-container .sky-filter-inline-item');
  }

  describe('standard setup', () => {

    beforeEach(async(() => {
      fixture.detectChanges();
      state.skip(1).take(1).subscribe(() => fixture.detectChanges());

    }));
    it('should add a filter button and inline filters when provided', fakeAsync(() => {
      fixture.detectChanges();
      tick();

      let filterButton = getFilterButton() as HTMLButtonElement;

      expect(filterButton).not.toBeNull();

      expect(getInlineFilters().length).toBe(0);

      filterButton.click();
      fixture.detectChanges();
      tick();
      expect(getInlineFilters().length).toBe(2);
    }));

    it('should filter appropriately when change function is called', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      state.take(1).subscribe((current) => {
        expect(current.filters.length).toBe(2);
        expect(current.filters[0].value).toBe('any');
        expect(current.filters[0].defaultValue).toBe('any');
      });
      let filterButton = getFilterButton() as HTMLButtonElement;

      expect(filterButton).not.toHaveCssClass('sky-filter-btn-active');
      tick();
      filterButton.click();
      tick();
      fixture.detectChanges();
      let selectEl = nativeElement.querySelector('#sky-demo-select-type') as HTMLSelectElement;
      selectEl.value = 'berry';
      SkyAppTestUtility.fireDomEvent(selectEl, 'change');
      tick();
      fixture.detectChanges();
      tick();
      state.take(1).subscribe((current) => {
        expect(current.filters.length).toBe(2);
        expect(current.filters[0].value).toBe('berry');
        expect(current.filters[0].defaultValue).toBe('any');
      });

      filterButton = getFilterButton() as HTMLButtonElement;

      expect(filterButton).toHaveCssClass('sky-filter-btn-active');
    }));

    it('should handle a model without data properly', () => {
      let inlineFilter = new SkyListFilterInlineModel();
      expect(inlineFilter).not.toBeNull();
    });

  });

  it('should throw an error if inline filter does not have a name', () => {
    component.hideOrangeName = '';
    expect(() => { fixture.detectChanges(); }).toThrowError();

  });

});
