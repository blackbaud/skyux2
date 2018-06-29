import {
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

import {
  expect
} from '@blackbaud/skyux-builder/runtime/testing/browser';

import {
  FilterButtonTestComponent
} from './fixtures/filter-button.component.fixture';

import {
  SkyFilterModule
} from '.';

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

  function getButtonEl() {
    return nativeElement.querySelector('.sky-btn') as HTMLButtonElement;
  }

  function verifyTextPresent() {
    expect(getButtonEl().innerText.trim()).toBe('Filter');
  }

  function verifyTextNotPresent() {
    expect(getButtonEl().innerText.trim()).not.toBe('Filter');
  }

  it('should allow setting active state', () => {
    component.filtersActive = true;
    fixture.detectChanges();
    expect(nativeElement.querySelector('.sky-btn')).toHaveCssClass('sky-filter-btn-active');
  });

  it('should emit event on click', () => {
    let buttonEl = getButtonEl();
    buttonEl.click();
    fixture.detectChanges();
    expect(component.buttonClicked).toBe(true);
  });

  it('should show button text', () => {
    fixture.detectChanges();
    verifyTextNotPresent();
    component.showButtonText = true;
    fixture.detectChanges();
    verifyTextPresent();
  });
});
