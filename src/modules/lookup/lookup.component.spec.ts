import {
  TestBed,
  ComponentFixture,
  async
} from '@angular/core/testing';

import { DebugElement } from '@angular/core';

import { By } from '@angular/platform-browser';

import { expect } from '../testing';

import { SkyLookupModule } from './lookup.module';
import { SkyLookupComponent } from './lookup.component';

import {
  LookupTestComponent
} from './fixtures/lookup.component.fixture';

import {
  MockSkyMediaQueryService
} from '../testing/mocks';

import {
  SkyMediaQueryService,
  SkyMediaBreakpoints
} from '../media-queries';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

fdescribe('Lookup component', () => {
  let fixture: ComponentFixture<LookupTestComponent>;
  let nativeElement: HTMLElement;
  let component: LookupTestComponent;
  let element: DebugElement;
  let mockMediaQueryService: MockSkyMediaQueryService;

  beforeEach(() => {

    mockMediaQueryService = new MockSkyMediaQueryService();

    TestBed.configureTestingModule({
      declarations: [
        LookupTestComponent
      ],
      imports: [
        SkyLookupModule,
        NoopAnimationsModule
      ],
      providers: [
        {provide: SkyMediaQueryService, useValue: mockMediaQueryService}
      ]
    });

    fixture = TestBed.overrideComponent(SkyLookupComponent, {
      add: {
        providers: [
          {
            provide: SkyMediaQueryService,
            useValue: mockMediaQueryService
          }
        ]
      }
    })
    .createComponent(LookupTestComponent);
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

  describe('standard lookup', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

  it('should override default placeholder text when placeholder text is provided', () => {
    component.placeholderText = 'hey ya';
    fixture.detectChanges();
    /*tslint:disable */
    expect(element.query(By.css('input')).attributes['placeholder']).toBe('hey ya');
    /*tslint:enable */
  });

 });

});
