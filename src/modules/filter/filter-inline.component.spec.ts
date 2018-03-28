import {
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

import {
  expect
} from '../testing';

import { SkyFilterModule } from './filter.module';
import { FilterInlineTestComponent } from './fixtures/filter-inline.component.fixture';

describe('Filter button', () => {
  let fixture: ComponentFixture<FilterInlineTestComponent>;
  let nativeElement: HTMLElement;

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
    fixture.detectChanges();
  });

  it('should allow inline container and items', () => {
    expect(nativeElement.querySelector('.sky-filter-inline')).not.toBeNull();
    expect(nativeElement.querySelectorAll('.sky-filter-inline-item').length).toBe(2);
  });
});
