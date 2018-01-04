import {
  TestBed,
  ComponentFixture,
  async
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
import { MockSkyMediaQueryService } from '../testing/mocks';
import { SkyMediaQueryService, SkyMediaBreakpoints } from '../media-queries';

describe('Filter button', () => {

  let fixture: ComponentFixture<FilterButtonTestComponent>;
  let nativeElement: HTMLElement;
  let component: FilterButtonTestComponent;
  let mockMediaQueryService: MockSkyMediaQueryService;

  beforeEach(() => {
    mockMediaQueryService = new MockSkyMediaQueryService();
    TestBed.configureTestingModule({
      declarations: [
        FilterButtonTestComponent
      ],
      imports: [
        SkyFilterModule
      ],
      providers: [{ provide: SkyMediaQueryService, useValue: mockMediaQueryService }]
    });

    fixture = TestBed.createComponent(FilterButtonTestComponent);
    nativeElement = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function getButtonEl() {
    return nativeElement.querySelector('.sky-btn') as HTMLButtonElement;
  }

  function triggerXsBreakpoint() {
    mockMediaQueryService.fire(SkyMediaBreakpoints.xs);
    fixture.detectChanges();
    return fixture.whenStable();
  }

  function triggerSmBreakpoint() {
    mockMediaQueryService.fire(SkyMediaBreakpoints.sm);
    fixture.detectChanges();
    return fixture.whenStable();
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

  describe('text and media queries', () => {

    it('text should not be present if not activated', () => {
      fixture.detectChanges();
      verifyTextNotPresent();
    });

    it('text should be present if activated when not an extra small screen', async(() => {
      component.showButtonText = true;
      fixture.detectChanges();
      verifyTextPresent();
      triggerSmBreakpoint().then(() => {
        fixture.detectChanges();
        verifyTextPresent();
      });
    }));

    it('text should not be present if activated when an extra small screen', async(() => {
      component.showButtonText = true;
      fixture.detectChanges();
      verifyTextPresent();
      triggerXsBreakpoint().then(() => {
        fixture.detectChanges();
        verifyTextNotPresent();
      });
    }));
  });
});
