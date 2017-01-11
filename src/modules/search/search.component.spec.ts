import {
  TestBed,
  ComponentFixture
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
  SearchTestComponent
} from './fixtures/search.component.fixture';

describe('Search component', () => {
  let fixture: ComponentFixture<SearchTestComponent>;
  let nativeElement: HTMLElement;
  let component: SearchTestComponent;
  let element: DebugElement;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [
        SearchTestComponent
      ],
      imports: [
        SkySearchModule
      ]
    });

    fixture = TestBed.createComponent(SearchTestComponent);
    nativeElement = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    element = fixture.debugElement as DebugElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  function setInput(text: string) {
    let inputEl = element.query(By.css('input'));
    inputEl.nativeElement.value = text;

    inputEl.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    inputEl.nativeElement.dispatchEvent(new Event('change'));
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
    setInput('applied text');
    triggerApplyButton();

    expect(element.query(By.css('.sky-search-btn-clear')).nativeElement).toBeVisible();
  });

  it('should emit the apply event when clear button is clicked', () => {

  });

  it('should show applied indication when search is applied and open button is shown', () => {

  });

  it('should apply the correct focus class', () => {

  });

  it('should update search text when applySearchText is called with new search text', () => {

  });

  describe('animations', () => {

    describe('should animate the mobile search input open', () => {
      it('when the open button is pressed', () => {

      });

      it('when the screen changes from xsmall to large and the input is hidden', () => {

      });

      it('when the screen changes from xsmall to large and the input is shown', () => {

      });

      it('when searchtext binding is changed and screen is xsmall', () => {

      });
    });

    describe('should animate the mobile search input closed', () => {
      it('and show a button when screen is xsmall', () => {

      });

      it('when the dismiss button is pressed', () => {

      });
    });
  });
});
