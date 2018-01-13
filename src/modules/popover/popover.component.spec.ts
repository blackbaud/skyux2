import {
  By
} from '@angular/platform-browser';

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
  let placementChangesSubscribe: Function;

  beforeEach(() => {
    let mockWindowService = new MockWindowService();
    let mockAdapterService = {
      setPopoverPosition() {},
      hidePopover() {},
      showPopover() {},
      placementChanges: {
        takeUntil() {
          return {
            subscribe(callback: Function) {
              placementChangesSubscribe = callback;
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
    placementChangesSubscribe({ placement: 'below' });
    // fixture.detectChanges();
    expect(component.classNames[1]).toEqual('sky-popover-placement-below');

    // It shouldn't change the class names if the placement hasn't changed.
    placementChangesSubscribe({ foo: 'below' });
    expect(component.classNames[1]).toEqual('sky-popover-placement-below');
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

  it('should close the popover when the escape key is pressed', () => {
    spyOn(component, 'close');

    component.isOpen = true;

    const escapeEvent: any = document.createEvent('CustomEvent');
    escapeEvent.which = 27;
    escapeEvent.initEvent('keyup', true, true);
    document.dispatchEvent(escapeEvent);

    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('.sky-popover-container'));

    expect(component.close).toHaveBeenCalled();
    expect(element.nativeElement).toBeDefined();
  });

  it('should only close the popover (when escape pressed) if it is open', () => {
    spyOn(component, 'close');

    component.isOpen = false;

    const escapeEvent: any = document.createEvent('CustomEvent');
    escapeEvent.which = 27;
    escapeEvent.initEvent('keyup', true, true);
    document.dispatchEvent(escapeEvent);

    fixture.detectChanges();
    expect(component.close).not.toHaveBeenCalled();
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
