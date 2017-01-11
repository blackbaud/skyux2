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

  function setInput(text: string) {
    let inputEl = element.query(By.css('input'));
    inputEl.nativeElement.value = 'my search text';
    inputEl.nativeElement.dispatchEvent(new Event('change'));
    inputEl.nativeElement.dispatchEvent(new Event('input'));
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

  });

  it('should override default placeholder text when placeholder text is provided', () => {

  });

  it('should show the clear button when search is applied', () => {

  });

  it('should emit the apply event when clear button is clicked', () => {

  });

  it('should show applied indication when search is applied and open button is shown', () => {

  });

  it('should apply the correct focus class', () => {

  });

  describe('animations', () => {
     it('should animate the mobile search input closed and show a button when screen is xsmall', () => {

    });

    it('should animate the mobile search input open when the open button is pressed', () => {

    });

    it('should animate the mobile search input closed when the dismiss button is pressed', () => {

    });

    it('should animate the search input open when the screen changes from xsmall to large and the input is hidden', () => {

    });

    it('should animate the search input open when the screen changes from xsmall to large and the input is shown', () => {

    });

    it('should animate the search input open when searchtext binding is changed and screen is xsmall', () => {

    });
  });
});
