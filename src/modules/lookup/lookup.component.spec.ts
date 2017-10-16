import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick
} from '@angular/core/testing';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { expect } from '../testing';
import { SkyLookupModule } from './lookup.module';

import {
  LookupTestComponent
} from './fixtures/lookup.component.fixture';

fdescribe('Lookup component', () => {
  let fixture: ComponentFixture<LookupTestComponent>;
  let nativeElement: HTMLElement;
  let component: LookupTestComponent;
  let element: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LookupTestComponent
      ],
      imports: [
        SkyLookupModule
      ]
    });

    fixture = TestBed.createComponent(LookupTestComponent);
    nativeElement = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    element = fixture.debugElement as DebugElement;
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

  /*function triggerInputKeyUp(key: number) {
    let inputEl = element.query(By.css('input'));
    inputEl.triggerEventHandler('keyup', { which: key});
    fixture.detectChanges();
  }

  function triggerClearButton() {
    let clearEl = element.query(By.css('.sky-search-btn-clear'));
    clearEl.triggerEventHandler('click', undefined);
    fixture.detectChanges();
  }*/

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

  describe('standard lookup', () => {
    beforeEach(() => {
      component.multiple = false;
      component.lastSelectionChange = undefined;
    });

  it('should override default placeholder text when placeholder text is provided', () => {
    fixture.detectChanges();
    component.placeholderText = 'hey ya';
    fixture.detectChanges();
    expect(element.query(By.css('input')).attributes.placeholder).toBe('hey ya');
  });

  it('should apply the correct focus class', () => {
    fixture.detectChanges();
    triggerFocus();
    let css = '.sky-lookup-input-container.sky-input-group'
      + '.sky-dropdown-button.sky-lookup-input-focused';

    let containerEl = element.query(By.css(css));
    expect(containerEl).not.toBeNull();
    triggerBlur();
    containerEl = element.query(By.css(css));
    expect(containerEl).toBeNull();
  });

  it('should not perform a search when focus gained or lost when the search field is empty', () => {
    fixture.detectChanges();
    triggerFocus();
    let inputEl = element.query(By.css('input'));
    expect(inputEl.nativeElement.value).toBe('');
    triggerBlur();
    expect(inputEl.nativeElement.value).toBe('');
  });

  it('should search and clear when focus is lost when the search critera matches no item', () => {
    fixture.detectChanges();
    fakeAsync(() => {
      triggerFocus();
      let inputEl = element.query(By.css('input'));
      setInput('abc');
      expect(inputEl.nativeElement.value).toBe('abc');
      triggerBlur();
      tick();
      expect(inputEl.nativeElement.value).toBe('');
    });
  });

  it('should search and select an item when the search critera matches a data entry', () => {
    component.data = [
      { name: 'Red' }
    ];
    fixture.detectChanges();
    fakeAsync(() => {
      triggerFocus();
      let inputEl = element.query(By.css('input'));
      setInput('red');
      expect(inputEl.nativeElement.value).toBe('red');
      triggerBlur();
      tick();
      expect(inputEl.nativeElement.value).toBe('Red');
    });
  });

  it('should search and select an item when the search critera partially matches a data entry',
  () => {
    component.data = [
      { name: 'Blue' },
      { name: 'Black' }
    ];
    fixture.detectChanges();
    fakeAsync(() => {
      triggerFocus();
      let inputEl = element.query(By.css('input'));
      setInput('b');
      expect(inputEl.nativeElement.value).toBe('b');
      triggerBlur();
      tick();
      expect(inputEl.nativeElement.value).toBe('Blue');

      let lastSelectionChange = component.lastSelectionChange;
      expect(lastSelectionChange.added.length).toBe(1);
      expect(lastSelectionChange.added[0].name).toBe('Blue');
      expect(lastSelectionChange.added[0]).toBe(component.data[0]);
      expect(lastSelectionChange.removed.length).toBe(0);
      expect(lastSelectionChange.result.length).toBe(1);
      expect(lastSelectionChange.result[0].name).toBe('Blue');
      expect(lastSelectionChange.result[0]).toBe(component.data[0]);
      let selectedItems = component.selectedItems;
      expect(selectedItems.length).toBe(1);
      expect(selectedItems[0]).toBe(component.data[0]);
    });
  });

  it('should respect default selection', () => {
    component.data = [
      { name: 'Green' },
      { name: 'Orange' }
    ];
    component.selectedItems = [component.data[1]];
    fixture.detectChanges();
    fakeAsync(() => {
      let inputEl = element.query(By.css('input'));
      expect(inputEl.nativeElement.value).toBe('Orange');
      expect(component.lastSelectionChange).toBe(undefined);
      let selectedItems = component.selectedItems;
      expect(selectedItems.length).toBe(1);
      expect(selectedItems[0]).toBe(component.data[1]);
    });
  });
 });

 describe('multi-select lookup', () => {
  beforeEach(() => {
    component.multiple = true;
    fixture.detectChanges();
  });

 });

});
