import {
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

import {
  expect,
  SkyAppTestUtility
} from '@blackbaud/skyux-builder/runtime/testing/browser';

import {
  FilterSummaryTestComponent
} from './fixtures/filter-summary.component.fixture';

import {
  SkyFilterModule
} from '.';

describe('Filter summary', () => {

  let fixture: ComponentFixture<FilterSummaryTestComponent>;
  let nativeElement: HTMLElement;
  let component: FilterSummaryTestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FilterSummaryTestComponent
      ],
      imports: [
        SkyFilterModule
      ]
    });

    fixture = TestBed.createComponent(FilterSummaryTestComponent);
    nativeElement = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a filter summary with label and child items', () => {
    expect(nativeElement.querySelector('.sky-filter-summary-header')).toHaveText('Filter:');
    expect(nativeElement
      .querySelectorAll('.sky-filter-summary-items .sky-filter-summary-item').length).toBe(2);
  });

  it('should allow filter summary items to be dismissible', () => {
    let items = nativeElement
      .querySelectorAll('.sky-filter-summary-items .sky-filter-summary-item');

    expect(items.item(0).querySelector('.sky-token-btn-close')).toBeNull();
    expect(items.item(1).querySelector('.sky-token-btn-close')).not.toBeNull();
  });

  it('should emit an event on item click', () => {
    let items = nativeElement
      .querySelectorAll('.sky-filter-summary-items .sky-filter-summary-item');

    SkyAppTestUtility.fireDomEvent(items.item(0), 'click');

    fixture.detectChanges();

    expect(component.summaryClicked).toBe(true);
  });

  it('should emit an event on item keypress', () => {
    let items = nativeElement
      .querySelectorAll('.sky-filter-summary-items .sky-filter-summary-item');

    SkyAppTestUtility.fireDomEvent(items[0], 'keypress.space');

    fixture.detectChanges();

    expect(component.summaryClicked).toBe(false);

    SkyAppTestUtility.fireDomEvent(items[0], 'keypress.enter');

    fixture.detectChanges();

    expect(component.summaryClicked).toBe(true);
  });

  it('should emit an event on dismiss click', () => {
    let items = nativeElement
      .querySelectorAll('.sky-filter-summary-items .sky-filter-summary-item .sky-token-btn-close');

    SkyAppTestUtility.fireDomEvent(items.item(0), 'click');

    fixture.detectChanges();

    expect(component.dismissed).toBe(true);
  });
});
