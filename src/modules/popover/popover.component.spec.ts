import {
  ElementRef
} from '@angular/core';

import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  NoopAnimationsModule
} from '@angular/platform-browser/animations';

import { TestUtility } from '../testing/testutility';
import { expect } from '../testing';

import {
  SkyPopoverModule,
  SkyPopoverComponent,
  SkyPopoverAdapterService
} from './index';

class MockPopoverAdapterService {
  public getPopoverPosition() {}
  public hidePopover() {}
  public showPopover() {}
}

describe('SkyPopoverComponent', () => {
  let fixture: ComponentFixture<SkyPopoverComponent>;
  let component: SkyPopoverComponent;
  let mockAdapterService: MockPopoverAdapterService;

  beforeEach(() => {
    mockAdapterService = new MockPopoverAdapterService();

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        SkyPopoverModule
      ]
    })
    .compileComponents();

    TestBed.overrideComponent(SkyPopoverComponent, {
      set: {
        providers: [
          { provide: SkyPopoverAdapterService, useValue: mockAdapterService }
        ]
      }
    });

    fixture = TestBed.createComponent(SkyPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call the adapter service to position the popover', () => {
    const caller = new ElementRef({});
    const spy = spyOn(mockAdapterService, 'getPopoverPosition').and.returnValue({
      top: 0,
      left: 0,
      arrowLeft: 0,
      arrowRight: 0,
      placement: 'above',
      alignment: undefined
    });
    component.positionNextTo(caller, 'above');
    expect(spy).toHaveBeenCalled();
  });

  it('should call the adapter service with a default position', () => {
    const caller = new ElementRef({});
    const spy = spyOn(mockAdapterService, 'getPopoverPosition').and.returnValue({
      top: 0,
      left: 0,
      arrowLeft: 0,
      arrowRight: 0,
      placement: undefined,
      alignment: undefined
    });
    component.alignment = undefined;
    component.placement = undefined;
    component.positionNextTo(caller, undefined, undefined);
    expect(spy.calls.argsFor(0)[1]).toEqual('above');
    expect(spy.calls.argsFor(0)[2]).toEqual('center');
  });

  it('should not call the adapter service if a caller is not defined', () => {
    const spy = spyOn(mockAdapterService, 'getPopoverPosition');
    component.positionNextTo(undefined, 'above');
    expect(spy).not.toHaveBeenCalled();
  });

  it('should close a popover', () => {
    component.isOpen = true;
    component.animationState = undefined;
    component.close();
    expect(component.animationState).toEqual('hidden');

    // Else branch:
    component.isOpen = false;
    component.animationState = undefined;
    component.close();
    expect(component.animationState).toBeUndefined();
  });

  it('should remove a CSS classname before the animation starts', () => {
    const spy = spyOn(mockAdapterService, 'showPopover').and.returnValue(undefined);

    component.onAnimationStart({
      fromState: 'hidden',
      toState: 'visible',
      totalTime: 0,
      phaseName: '',
      element: {},
      triggerName: ''
    });

    expect(spy).toHaveBeenCalledWith(component.popoverContainer);

    // Handle 'else' path:
    spy.calls.reset();
    component.onAnimationStart({
      fromState: 'visible',
      toState: 'hidden',
      totalTime: 0,
      phaseName: '',
      element: {},
      triggerName: ''
    });

    expect(spy).not.toHaveBeenCalled();
  });

  it('should add a CSS classname when the animation stops', () => {
    const spy = spyOn(mockAdapterService, 'hidePopover').and.returnValue(undefined);

    component.onAnimationDone({
      fromState: 'visible',
      toState: 'hidden',
      totalTime: 0,
      phaseName: '',
      element: {},
      triggerName: ''
    });

    expect(spy).toHaveBeenCalledWith(component.popoverContainer);
  });

  it('should emit an event when the popover is opened', () => {
    const spy = spyOn(component.popoverOpened, 'emit').and.returnValue(0);

    component.onAnimationDone({
      fromState: 'hidden',
      toState: 'visible',
      totalTime: 0,
      phaseName: '',
      element: {},
      triggerName: ''
    });

    expect(spy).toHaveBeenCalledWith(component);
  });

  it('should emit an event when the popover is closed', () => {
    const spy = spyOn(component.popoverClosed, 'emit').and.returnValue(0);

    component.onAnimationDone({
      fromState: 'visible',
      toState: 'hidden',
      totalTime: 0,
      phaseName: '',
      element: {},
      triggerName: ''
    });

    expect(spy).toHaveBeenCalledWith(component);
  });

  it('should capture mouse enter and mouse leave events', () => {
    expect(component['isMouseEnter']).toEqual(false);
    TestUtility.fireDomEvent(fixture.nativeElement, 'mouseenter');
    expect(component['isMouseEnter']).toEqual(true);
    TestUtility.fireDomEvent(fixture.nativeElement, 'mouseleave');
    expect(component['isMouseEnter']).toEqual(false);
  });

  it('should close the popover when the escape key is pressed', () => {
    const spy = spyOn(fixture.componentInstance, 'close');

    fixture.componentInstance.isOpen = true;

    TestUtility.fireKeyboardEvent(fixture.nativeElement, 'keyup', { key: 'Escape' });
    expect(spy).toHaveBeenCalledWith();

    spy.calls.reset();

    // Should ignore other key events.
    TestUtility.fireKeyboardEvent(fixture.nativeElement, 'keyup', { key: 'Backspace' });
    expect(spy).not.toHaveBeenCalled();
  });

  it('should reposition the popover on window scroll', () => {
    const spy = spyOn(fixture.componentInstance, 'positionNextTo');
    const event = document.createEvent('CustomEvent');
    event.initEvent('scroll', false, false);

    component.isOpen = true;
    window.dispatchEvent(event);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();

    // Test the else condition.
    spy.calls.reset();
    component.isOpen = false;
    window.dispatchEvent(event);
    fixture.detectChanges();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should close the popover when the document is clicked', () => {
    spyOn(component, 'close');

    component.isOpen = true;
    TestUtility.fireDomEvent(document, 'click');

    fixture.detectChanges();
    expect(component.close).toHaveBeenCalled();
  });

  it('should allow disabling of closing the popover when the document is clicked', () => {
    spyOn(component, 'close');

    component.isOpen = true;
    component.dismissOnBlur = false;
    TestUtility.fireDomEvent(document, 'click');

    fixture.detectChanges();
    expect(component.close).not.toHaveBeenCalled();
  });

  it('should not close the popover if the popover is clicked', () => {
    spyOn(component, 'close');

    component.isOpen = true;
    component['isMouseEnter'] = true;
    TestUtility.fireDomEvent(document, 'click');

    fixture.detectChanges();
    expect(component.close).not.toHaveBeenCalled();
  });

  it('should close the popover on mouseleave if it has been marked for close', () => {
    const spy = spyOn(component, 'close');
    component.markForCloseOnMouseLeave();
    TestUtility.fireDomEvent(fixture.nativeElement, 'mouseleave');
    expect(spy).toHaveBeenCalledWith();
    expect(component['isMarkedForCloseOnMouseLeave']).toEqual(false);
  });
});
