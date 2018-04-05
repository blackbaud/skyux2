import {
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

import {
  expect
} from '@blackbaud/skyux-builder/runtime/testing/browser';

import {
  FilterInlineTestComponent
} from './fixtures/filter-inline.component.fixture';

import {
  SkyFilterModule
} from '.';

describe('Filter button', () => {

  let fixture: ComponentFixture<FilterInlineTestComponent>;
  let nativeElement: HTMLElement;
  let component: FilterInlineTestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FilterInlineTestComponent
      ],
      imports: [
        SkyFilterModule
      ]
    });

    fixture = TestBed.createComponent(FilterInlineTestComponent);
    nativeElement = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should allow inline container and items', () => {

    expect(nativeElement.querySelector('.sky-filter-inline')).not.toBeNull();
    expect(nativeElement.querySelectorAll('.sky-filter-inline-item').length).toBe(2);
  });

});
