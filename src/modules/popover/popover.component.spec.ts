import {
  ElementRef
} from '@angular/core';

import {
  ComponentFixture,
  // fakeAsync,
  TestBed
  // tick
} from '@angular/core/testing';

import {
  NoopAnimationsModule
} from '@angular/platform-browser/animations';

import { SkyWindowRefService } from '../window';
import { TestUtility } from '../testing/testutility';
import { expect } from '../testing';

import {
  SkyPopoverModule,
  SkyPopoverComponent,
  SkyPopoverAdapterService
} from './index';

class MockWindowService {
  public getWindow(): any {
    return {
      setTimeout(callback: Function) {
        callback();
      }
    };
  }
}

describe('SkyPopoverComponent', () => {
  let fixture: ComponentFixture<SkyPopoverComponent>;
  let component: SkyPopoverComponent;
  let positionChangeSubscribe: Function;

  function dispatchKeyboardEvent(element: Element, eventName: string, key: string) {
    const event: any = document.createEvent('CustomEvent');
    event.key = key;
    event.initEvent(eventName, true, true);
    element.dispatchEvent(event);
  }

  beforeEach(() => {
    let mockWindowService = new MockWindowService();
    let mockAdapterService = {
      setPopoverPosition() {},
      hidePopover() {},
      showPopover() {},
      positionChange: {
        takeUntil() {
          return {
            subscribe(callback: Function) {
              positionChangeSubscribe = callback;
            }
          };
        }
      }
    };

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        SkyPopoverModule
      ],
      providers: [
        { provide: SkyWindowRefService, useValue: mockWindowService }
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
    const spy = spyOn(component['adapterService'], 'setPopoverPosition');
    component.positionNextTo(caller, 'above');
    expect(spy).toHaveBeenCalled();
  });

  it('should call the adapter service with a default position', () => {
    const caller = new ElementRef({});
    const spy = spyOn(component['adapterService'], 'setPopoverPosition');
    (component as any).alignment = undefined;
    (component as any).placement = undefined;
    component.positionNextTo(caller, undefined, undefined);
    expect(spy).toHaveBeenCalled();
    expect(component.placement).toEqual('above');
    expect(component.alignment).toEqual('center');
  });

  it('should update classnames if the adapter changes the placement', () => {
    expect(component.classNames[1]).toEqual('sky-popover-placement-above');
    positionChangeSubscribe({ placement: 'below' });
    fixture.detectChanges();
    expect(component.classNames[1]).toEqual('sky-popover-placement-below');
  });

  it('should handle undefind placement/alignment values after adapter position changes', () => {
    expect(component.classNames[1]).toEqual('sky-popover-placement-above');
    positionChangeSubscribe({ placement: undefined, alignment: undefined });
    fixture.detectChanges();
    expect(component.classNames[0]).toEqual('sky-popover-alignment-center');
    expect(component.classNames[1]).toEqual('sky-popover-placement-above');
  });

  it('should not call the adapter service if a caller is not defined', () => {
    const spy = spyOn(component['adapterService'], 'setPopoverPosition');
    component.positionNextTo(undefined, 'above');
    expect(spy).not.toHaveBeenCalled();
  });

  it('should close a popover', () => {
    component.close();
    expect(component.isOpen).toEqual(false);
  });

  it('should remove a CSS classname before the animation starts', () => {
    const spy = spyOn(component['adapterService'], 'showPopover').and.returnValue(0);

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
    const spy = spyOn(component['adapterService'], 'hidePopover').and.returnValue(0);

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

  it('should get the animation state', () => {
    let state = component.getAnimationState();
    expect(state).toEqual('hidden');
    component.isOpen = true;
    fixture.detectChanges();
    state = component.getAnimationState();
    expect(state).toEqual('visible');
  });

  it('should capture mouse enter and mouse leave events', () => {
    expect(component['isMouseEnter']).toEqual(false);
    TestUtility.fireDomEvent(fixture.nativeElement, 'mouseenter');
    expect(component['isMouseEnter']).toEqual(true);
    TestUtility.fireDomEvent(fixture.nativeElement, 'mouseleave');
    expect(component['isMouseEnter']).toEqual(false);
  });

  it('should prevent bubbling of click events', () => {
    const event: any = document.createEvent('CustomEvent');
    const spy = spyOn(event, 'stopPropagation');
    event.initEvent('click', true, true);
    fixture.nativeElement.dispatchEvent(event);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
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

  it('should close the popover when the escape key is pressed', () => {
    const spy = spyOn(component, 'close');

    component.isOpen = true;
    dispatchKeyboardEvent(component.elementRef.nativeElement, 'keyup', 'Escape');
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();

    // Disregard other key presses:
    spy.calls.reset();
    dispatchKeyboardEvent(component.elementRef.nativeElement, 'keyup', 'Shift');
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
