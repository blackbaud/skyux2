import {
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

import {
  DebugElement
} from '@angular/core';

import { BrowserModule, By } from '@angular/platform-browser';

import {
  SkyActionButtonComponent,
  SkyActionButtonModule

} from '.';
import {
  SkyMediaQueryService,
  SkyMediaBreakpoints
} from '../media-queries';

import { ActionButtonTestComponent } from './fixtures/action-button.component.fixture';

import {
  MockSkyMediaQueryService
} from '../testing/mocks';

describe('Action button component', () => {
  let fixture: ComponentFixture<ActionButtonTestComponent>;
  let cmp: ActionButtonTestComponent;
  let el: HTMLElement;
  let debugElement: DebugElement;
  let mockMediaQueryService: MockSkyMediaQueryService;

  beforeEach(() => {

    mockMediaQueryService = new MockSkyMediaQueryService();
    TestBed.configureTestingModule({
      declarations: [
        ActionButtonTestComponent
      ],
      imports: [
        BrowserModule,
        SkyActionButtonModule
      ]
    });

    fixture = TestBed.overrideComponent(SkyActionButtonComponent, {
      add: {
        providers: [
          {
            provide: SkyMediaQueryService,
            useValue: mockMediaQueryService
          }
        ]
      }
    })
    .createComponent(ActionButtonTestComponent);

    fixture = TestBed.createComponent(ActionButtonTestComponent);
    cmp = fixture.componentInstance as ActionButtonTestComponent;
    el = fixture.nativeElement as HTMLElement;
    debugElement = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should transclude icon, header, and detail sections', () => {
    let iconContainer
      = '.sky-action-button-icon-header-container .sky-action-button-icon-container';
    let headerContainer = '.sky-action-button-icon-header-container .sky-action-button-header';
    let detailsContainer = '.sky-action-button sky-action-button-details';

    expect(el.querySelector(iconContainer)).not.toBeNull();

    expect(el.querySelector(headerContainer)).not.toBeNull();

    expect(el.querySelector(detailsContainer)).not.toBeNull();
  });

  it('should emit a click event on button click', () => {
    debugElement.query(By.css('.sky-action-button')).triggerEventHandler('click', undefined);
    fixture.detectChanges();
    expect(cmp.buttonIsClicked).toBe(true);
  });

  it('should emit a click event on enter press', () => {

    debugElement.query(By.css('.sky-action-button')).triggerEventHandler('keyup', { which: 15});
    fixture.detectChanges();
    expect(cmp.buttonIsClicked).toBe(false);
    debugElement.query(By.css('.sky-action-button')).triggerEventHandler('keyup', { which: 13});
    fixture.detectChanges();
    expect(cmp.buttonIsClicked).toBe(true);
  });

  it('should have a role of button and tabindex on the clickable area', () => {
    expect(debugElement.query(By.css('.sky-action-button')).attributes['role']).toBe('button');
    expect(debugElement.query(By.css('.sky-action-button')).attributes['tabindex']).toBe('0');
  });

  it('should display an icon based on iconType', () => {
    let iconSelector =
      '.sky-action-button-icon-header-container .sky-action-button-icon-container i.fa-filter';
    expect(debugElement.query(By.css(iconSelector))).not.toBeNull();
  });

  it('should change icon size based on media breakpoints query', () => {
    let smallIconSelector =
      '.sky-action-button-icon-header-container .sky-action-button-icon-container i.fa-2x';
    let largeIconSelector =
      '.sky-action-button-icon-header-container .sky-action-button-icon-container i.fa-3x';
    mockMediaQueryService.fire(SkyMediaBreakpoints.xs);
    fixture.detectChanges();
    expect(debugElement.query(By.css(smallIconSelector))).not.toBeNull();
    mockMediaQueryService.fire(SkyMediaBreakpoints.sm);
    fixture.detectChanges();
    expect(debugElement.query(By.css(largeIconSelector))).not.toBeNull();
  });

});
