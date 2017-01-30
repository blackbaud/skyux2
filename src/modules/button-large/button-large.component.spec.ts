import {
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

import {
  DebugElement
} from '@angular/core';

import { BrowserModule, By } from '@angular/platform-browser';

import { SkyButtonLargeComponent } from '.';
import {
  SkyMediaQueryService,
  SkyMediaBreakpoints
} from '../media-queries';

import { ButtonLargeTestComponent } from './fixtures/button-large.component.fixture';
import { SkyButtonLargeModule } from './button-large.module';

import {
  MockSkyMediaQueryService
} from '../testing/mocks';

describe('Button large component', () => {
  let fixture: ComponentFixture<ButtonLargeTestComponent>;
  let cmp: ButtonLargeTestComponent;
  let el: HTMLElement;
  let debugElement: DebugElement;
  let mockMediaQueryService: MockSkyMediaQueryService;

  beforeEach(() => {

    mockMediaQueryService = new MockSkyMediaQueryService();
    TestBed.configureTestingModule({
      declarations: [
        ButtonLargeTestComponent
      ],
      imports: [
        BrowserModule,
        SkyButtonLargeModule
      ]
    });

    fixture = TestBed.overrideComponent(SkyButtonLargeComponent, {
      add: {
        providers: [
          {
            provide: SkyMediaQueryService,
            useValue: mockMediaQueryService
          }
        ]
      }
    })
    .createComponent(ButtonLargeTestComponent);

    fixture = TestBed.createComponent(ButtonLargeTestComponent);
    cmp = fixture.componentInstance as ButtonLargeTestComponent;
    el = fixture.nativeElement as HTMLElement;
    debugElement = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should transclude icon, header, and detail sections', () => {

    expect(
      el.querySelector('.sky-button-large-icon-header-container .sky-button-large-icon-container'))
      .not.toBeNull();

    expect(
      el.querySelector('.sky-button-large-icon-header-container .sky-button-large-header'))
      .not.toBeNull();

    expect(
      el.querySelector('.sky-button-large sky-button-large-details')).not.toBeNull();
  });

  it('should emit a click event on button click', () => {
    debugElement.query(By.css('.sky-button-large')).triggerEventHandler('click', undefined);
    fixture.detectChanges();
    expect(cmp.buttonIsClicked).toBe(true);
  });

  it('should have a role of button on the clickable area', () => {
    expect(debugElement.query(By.css('.sky-button-large')).attributes['role']).toBe('button');
  });

  it('should display an icon based on iconType', () => {
    let iconSelector =
      '.sky-button-large-icon-header-container .sky-button-large-icon-container i.fa-filter';
    expect(debugElement.query(By.css(iconSelector))).not.toBeNull();
  });

  it('should change icon size based on media breakpoints query', () => {
    let smallIconSelector =
      '.sky-button-large-icon-header-container .sky-button-large-icon-container i.fa-2x';
    let largeIconSelector =
      '.sky-button-large-icon-header-container .sky-button-large-icon-container i.fa-3x';
    mockMediaQueryService.fire(SkyMediaBreakpoints.xs);
    fixture.detectChanges();
    expect(debugElement.query(By.css(smallIconSelector))).not.toBeNull();
    mockMediaQueryService.fire(SkyMediaBreakpoints.sm);
    fixture.detectChanges();
    expect(debugElement.query(By.css(largeIconSelector))).not.toBeNull();
  });

});
