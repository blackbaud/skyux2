import {
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

import {
  SortTestComponent
} from './fixtures/sort.component.fixture';

import {
  SkySortModule
} from '.';

import {
  expect
} from '../testing';

describe('Sort component', () => {

  let fixture: ComponentFixture<SortTestComponent>;
  let nativeElement: HTMLElement;
  let component: SortTestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SortTestComponent
      ],
      imports: [
        SkySortModule
      ]
    });

    fixture = TestBed.createComponent(SortTestComponent);
    nativeElement = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function getDropdownButtonEl() {
    let dropdownButtonQuery = '.sky-sort .sky-dropdown .sky-dropdown-button .fa-sort';
    return nativeElement.querySelector(dropdownButtonQuery) as HTMLElement;
  }

  function getSortItems() {
    let itemQuery = '.sky-sort .sky-dropdown-menu .sky-sort-item';
    return nativeElement.querySelectorAll(itemQuery);
  }

  it('creates a sort dropdown that respects active input', () => {
    let dropdownButtonEl = getDropdownButtonEl();
    expect(dropdownButtonEl).not.toBeNull();
    dropdownButtonEl.click();
    fixture.detectChanges();
    let menuHeaderQuery = '.sky-sort .sky-sort-menu-heading';
    expect(nativeElement.querySelector(menuHeaderQuery)).toHaveText('Sort by');

    let itemsEl = getSortItems();
    expect(itemsEl.length).toBe(6);
    expect(itemsEl.item(2)).toHaveCssClass('sky-sort-item-selected');
    expect(itemsEl.item(2)).toHaveText('Date created (newest first)');

  });

  it('changes active item on click and emits proper event', () => {
    let dropdownButtonEl = getDropdownButtonEl();
    dropdownButtonEl.click();
    fixture.detectChanges();

    let itemsEl = getSortItems();
    let clickItem = itemsEl.item(1).querySelector('button') as HTMLElement;
    clickItem.click();
    fixture.detectChanges();

    expect(component.sortedItem).toEqual( {
      id: 2,
      label: 'Assigned to (Z - A)',
      name: 'assignee',
      descending: true
    });

    itemsEl = getSortItems();
    expect(itemsEl.item(1)).toHaveCssClass('sky-sort-item-selected');
  });

  it('can set active input programmatically', () => {
    component.initialState = 4;
    fixture.detectChanges();
    let itemsEl = getSortItems();
    expect(itemsEl.item(3)).toHaveCssClass('sky-sort-item-selected');
  });
});
