import {
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

import {
  FilterButtonTestComponent
} from './fixtures/filter-button.component.fixture';

import {
  SkyFilterModule
} from '.';

import {
  expect
} from '../testing';

describe('Filter button', () => {

  let fixture: ComponentFixture<FilterButtonTestComponent>;
  let nativeElement: HTMLElement;
  let component: FilterButtonTestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FilterButtonTestComponent
      ],
      imports: [
        SkyFilterModule
      ]
    });

    fixture = TestBed.createComponent(FilterButtonTestComponent);
    nativeElement = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should allow setting active state', () => {
    component.filtersActive = true;
    fixture.detectChanges();

    expect(nativeElement.querySelector('.sky-btn')).toHaveCssClass('sky-filter-btn-active');
  });

  it('should emit event on click', () => {
    let buttonEl = nativeElement.querySelector('.sky-btn') as HTMLButtonElement;

    buttonEl.click();

    fixture.detectChanges();

    expect(component.buttonClicked).toBe(true);
  });

});
