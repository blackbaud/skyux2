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

  it('creates a sort dropdown that respects active input', () => {
    let dropdownButtonQuery = '.sky-sort .sky-dropdown .sky-dropdown-button .fa-sort';
    expect(nativeElement.querySelector(dropdownButtonQuery)).not.toBeNull();
    let menuHeaderQuery = '.sky-sort .sky-sort-menu-header';
    expect(nativeElement.querySelector(menuHeaderQuery)).toHaveText('Sort by');
    let itemQuery = '.sky-sort .sky-dropdown-menu .sky-sort-item';
    let itemsEl = nativeElement.querySelectorAll(itemQuery);

    expect(itemsEl.length).toBe(6);
    expect(itemsEl.item(2)).toHaveCssClass('sky-sort-item-selected');

  });

  it('changes active item on click and emits proper event', () => {

  });

  it('can set active input programmatically', () => {

  });
});
