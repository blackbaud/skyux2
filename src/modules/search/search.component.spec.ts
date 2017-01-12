import {
  TestBed,
  ComponentFixture,
  async
} from '@angular/core/testing';

import {
  DebugElement
} from '@angular/core';

import {
  By
} from '@angular/platform-browser';

import {
  expect
} from '../testing';

import {
  SkySearchModule
} from './search.module';

import {
  SkySearchComponent
} from './search.component';

import {
  SearchTestComponent
} from './fixtures/search.component.fixture';

import {
  MockSkyMediaQueryService
} from '../testing/mocks';

import {
  SkyMediaQueryService,
  SkyMediaBreakpoints
} from '../media-queries';

describe('Search component', () => {
  let fixture: ComponentFixture<SearchTestComponent>;
  let nativeElement: HTMLElement;
  let component: SearchTestComponent;
  let element: DebugElement;
  let mockMediaQueryService: MockSkyMediaQueryService;

  beforeEach(() => {

    mockMediaQueryService = new MockSkyMediaQueryService();

    TestBed.configureTestingModule({
      declarations: [
        SearchTestComponent
      ],
      imports: [
        SkySearchModule
      ],
      providers: [
        {provide: SkyMediaQueryService, useValue: mockMediaQueryService}
      ]
    });

    fixture = TestBed.overrideComponent(SkySearchComponent, {
      add: {
        providers: [
          {
            provide: SkyMediaQueryService,
            useValue: mockMediaQueryService
          }
        ]
      }
    })
    .createComponent(SearchTestComponent);
    nativeElement = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    element = fixture.debugElement as DebugElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  function setInput(text: string) {
    let inputEvent = document.createEvent('Event');
    let params = {
      bubbles: false,
      cancelable: false
    };
    inputEvent.initEvent('input', params.bubbles, params.cancelable);

    let changeEvent = document.createEvent('Event');
    changeEvent.initEvent('change', params.bubbles, params.cancelable);
    let inputEl = element.query(By.css('input'));
    inputEl.nativeElement.value = text;

    inputEl.nativeElement.dispatchEvent(inputEvent);
    fixture.detectChanges();

    inputEl.nativeElement.dispatchEvent(changeEvent);
    fixture.detectChanges();
  }

  function triggerInputEnter() {
    let inputEl = element.query(By.css('input'));
    inputEl.triggerEventHandler('keyup', { which: 13});
    fixture.detectChanges();
  }

  function triggerApplyButton() {
    let applyEl = element.query(By.css('.sky-search-btn-apply'));
    applyEl.triggerEventHandler('click', undefined);
    fixture.detectChanges();
  }

  function triggerClearButton() {
    let clearEl = element.query(By.css('.sky-search-btn-clear'));
    clearEl.triggerEventHandler('click', undefined);
    fixture.detectChanges();
  }

  function triggerFocus() {
    let inputEl = element.query(By.css('input'));
    inputEl.triggerEventHandler('focus', undefined);
    fixture.detectChanges();
  }

  function triggerBlur() {
    let inputEl = element.query(By.css('input'));
    inputEl.triggerEventHandler('blur', undefined);
    fixture.detectChanges();
  }

  function triggerOpenButton() {
    let openEl = element.query(By.css('.sky-search-btn-open'));
    openEl.triggerEventHandler('click', undefined);
    fixture.detectChanges();
    return fixture.whenStable();
  }

  function triggerXsBreakpoint() {
    mockMediaQueryService.fire(SkyMediaBreakpoints.xs);
    fixture.detectChanges();
    return fixture.whenStable();
  }

  function verifySearchOpen() {
    fixture.detectChanges();
    let searchDismissContainer = element.query(By.css('.sky-search-dismiss-container'));
    expect(element.query(By.css('.sky-search-btn-open')).nativeElement).not.toBeVisible();
    expect(searchDismissContainer.nativeElement).toBeVisible();
    expect(searchDismissContainer.nativeElement)
      .toHaveCssClass('sky-search-dismiss-absolute');
    expect(element.query(By.css('.sky-search-btn-dismiss'))).not.toBeNull();
  }

  function verifySearchClosed() {
    fixture.detectChanges();
    let searchDismissContainer = element.query(By.css('.sky-search-dismiss-container'));

    expect(element.query(By.css('.sky-search-btn-open')).nativeElement).toBeVisible();
    expect(searchDismissContainer.nativeElement).not.toBeVisible();
    expect(searchDismissContainer.nativeElement).not
      .toHaveCssClass('sky-search-dismiss-absolute');
    expect(element.query(By.css('.sky-search-input-container')).styles['min-width'])
      .toBe(undefined);
  }

  it('should apply search text on enter press', () => {

    setInput('my search text');
    let inputEl = element.query(By.css('input'));

    inputEl.triggerEventHandler('keyup', { which: 23});
    fixture.detectChanges();
    expect(component.lastSearchTextApplied).not.toBe('my search text');

    triggerInputEnter();

    expect(component.lastSearchTextApplied).toBe('my search text');
  });

  it('should apply search text on apply button press', () => {
    setInput('applied text');
    triggerApplyButton();
    expect(component.lastSearchTextApplied).toBe('applied text');
  });

  it('should emit search change event on input change', () => {
    setInput('change text');
    expect(component.lastSearchTextChanged).toBe('change text');
    expect(component.lastSearchTextApplied).not.toBe('change text');
  });

  it('should set default placeholder text when none is specified', () => {
    fixture.detectChanges();

    expect(element.query(By.css('input')).attributes['placeholder']).toBe('Find in this list');
  });

  it('should override default placeholder text when placeholder text is provided', () => {
    component.placeholderText = '';
    fixture.detectChanges();
    /*tslint:disable */
    expect(element.query(By.css('input')).attributes['placeholder']).toBe(null);
    /*tslint:enable */
  });

  it('should show the clear button when search is applied', () => {
    expect(element.query(By.css('.sky-input-group-clear')).nativeElement).not.toBeVisible();
    setInput('applied text');
    triggerApplyButton();

    expect(element.query(By.css('.sky-input-group-clear')).nativeElement).toBeVisible();
  });

  it('should emit the apply event when clear button is clicked', () => {
    setInput('applied text');
    triggerApplyButton();
    triggerClearButton();

    expect(element.query(By.css('.sky-input-group-clear')).nativeElement).not.toBeVisible();
    expect(component.lastSearchTextApplied).toBe('');
  });

  it('should apply the correct focus class', () => {
    triggerFocus();
    let containerEl = element.query(By.css('.sky-search-input-container.sky-search-input-focused'));
    expect(containerEl).not.toBeNull();
    triggerBlur();
    containerEl = element.query(By.css('.sky-search-input-container.sky-search-input-focused'));
    expect(containerEl).toBeNull();
  });

  it('should update search text when applySearchText is called with new search text', () => {
    component.searchComponent.applySearchText('new search text');
    fixture.detectChanges();
    expect(component.lastSearchTextApplied).toBe('new search text');

    component.searchComponent.applySearchText('');
    fixture.detectChanges();
    expect(component.lastSearchTextApplied).toBe('');
  });

  describe('animations', () => {

    describe('should animate the mobile search input open', () => {
      it('when the open button is pressed', async(() => {
        triggerXsBreakpoint().then(() => {
          fixture.detectChanges();
          triggerOpenButton().then(() => {
            verifySearchOpen();
          });
        });
      }));

      it('when the screen changes from xsmall to large and the input is hidden', () => {

      });

      it('when the screen changes from xsmall to large and the input is shown', () => {

      });

      it('when searchtext binding is changed and screen is xsmall', () => {

      });
    });

    describe('should animate the mobile search input closed', () => {
      it('and show a button when screen is xsmall', async(() => {
        expect(element.query(By.css('.sky-search-btn-dismiss'))).toBeNull();
        triggerXsBreakpoint().then(() => {
          verifySearchClosed();
        });
      }));

      it('when the dismiss button is pressed', () => {

      });

      it('should show applied indication when search is applied', () => {

      });
    });
  });
});
