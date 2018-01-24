import {
  DebugElement
} from '@angular/core';

import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  By
} from '@angular/platform-browser';

import {
  NoopAnimationsModule
} from '@angular/platform-browser/animations';

import {
  TestUtility
} from '../testing';

import {
  SkyWindowRefService
} from '../window';

import {
  SkyPopoverComponent,
  SkyPopoverDirective,
  SkyPopoverAdapterService
} from './index';

import { SkyPopoverTestComponent } from './fixtures/popover.component.fixture';

class MockWindowService {
  public getWindow(): any {
    return {
      setTimeout(callback: Function) {
        callback();
      }
    };
  }
}

describe('SkyPopoverDirective', () => {
  let fixture: ComponentFixture<SkyPopoverTestComponent>;
  let directiveElements: DebugElement[];
  let mockWindowService: MockWindowService;

  function triggerMouseEvent(el: Element, eventName: string) {
    const event: any = document.createEvent('CustomEvent');
    event.initEvent(eventName, true, true);
    el.dispatchEvent(event);
  }

  function validateTriggerOpensPopover(
    elIndex: number,
    openTrigger: string,
    closeTrigger: string
  ) {
    const caller = directiveElements[elIndex];
    const callerInstance = caller.injector.get(SkyPopoverDirective);

    const positionNextToSpy = spyOn(callerInstance.skyPopover, 'positionNextTo');
    const closeSpy = spyOn(callerInstance.skyPopover, 'close');

    // The popover should only execute hover events if it is set to 'mouseenter'.
    if (openTrigger !== 'mouseenter') {
      triggerMouseEvent(caller.nativeElement, 'mouseenter');
      expect(positionNextToSpy).not.toHaveBeenCalled();
    }

    triggerMouseEvent(caller.nativeElement, openTrigger);
    expect(positionNextToSpy).toHaveBeenCalled();

    callerInstance.skyPopover.isOpen = true;

    // The popover should only execute hover events if it is set to 'mouseenter'.
    if (closeTrigger !== 'mouseleave') {
      triggerMouseEvent(caller.nativeElement, 'mouseleave');
      expect(closeSpy).not.toHaveBeenCalled();
    }

    triggerMouseEvent(caller.nativeElement, closeTrigger);
    expect(closeSpy).toHaveBeenCalled();

    // Make sure close isn't called again when the popover is already closed.
    closeSpy.calls.reset();
    callerInstance.skyPopover.isOpen = false;

    triggerMouseEvent(caller.nativeElement, closeTrigger);
    expect(closeSpy).not.toHaveBeenCalled();
  }

  beforeEach(() => {
    mockWindowService = new MockWindowService();
    let mockAdapterService = {};

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        SkyPopoverComponent,
        SkyPopoverTestComponent,
        SkyPopoverDirective
      ],
      providers: [
        { provide: SkyPopoverAdapterService, useValue: mockAdapterService },
        { provide: SkyWindowRefService, useValue: mockWindowService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkyPopoverTestComponent);
    directiveElements = fixture.debugElement.queryAll(By.directive(SkyPopoverDirective));
    fixture.detectChanges();
  });

  it('should ask the popover to position itself accordingly', () => {
    const caller = directiveElements[0];
    const callerInstance = caller.injector.get(SkyPopoverDirective);
    const spy = spyOn(callerInstance.skyPopover, 'positionNextTo');
    caller.nativeElement.click();
    expect(spy).toHaveBeenCalledWith(callerInstance['elementRef'], undefined, undefined);
  });

  it('should ask the popover to close itself if the button is clicked again', () => {
    const caller = directiveElements[0];
    const callerInstance = caller.injector.get(SkyPopoverDirective);
    const spy = spyOn(callerInstance.skyPopover, 'close');
    callerInstance.skyPopover.isOpen = true;
    caller.nativeElement.click();
    expect(spy).toHaveBeenCalledWith();
  });

  it('should pass along the placement', () => {
    const caller = directiveElements[1];
    const callerInstance = caller.injector.get(SkyPopoverDirective);
    const spy = spyOn(callerInstance.skyPopover, 'positionNextTo');
    caller.nativeElement.click();
    expect(spy).toHaveBeenCalledWith(callerInstance['elementRef'], 'below', undefined);
  });

  it('should allow click to display the popover', () => {
    validateTriggerOpensPopover(1, 'click', 'click');
  });

  it('should allow mouseenter to display the popover', () => {
    validateTriggerOpensPopover(2, 'mouseenter', 'mouseleave');
  });

  it('should mark the popover to close on mouseleave', () => {
    const caller = directiveElements[2];
    const callerInstance = caller.injector.get(SkyPopoverDirective);
    const popoverSpy = spyOn(callerInstance.skyPopover, 'markForCloseOnMouseLeave');
    const closeSpy = spyOn((callerInstance as any), 'closePopover').and.callThrough();

    callerInstance.skyPopover.isOpen = true;
    callerInstance.skyPopover.isMouseEnter = true;

    triggerMouseEvent(caller.nativeElement, 'mouseleave');
    expect(popoverSpy).not.toHaveBeenCalled();
    expect(closeSpy).toHaveBeenCalled();

    popoverSpy.calls.reset();
    closeSpy.calls.reset();

    // Else path, popover has mouseenter.
    callerInstance.skyPopover.isOpen = true;
    spyOn(mockWindowService, 'getWindow').and.returnValue({
      setTimeout(callback: Function) {
        // Simulate the popover triggering mouseenter event:
        callerInstance.skyPopover.isMouseEnter = true;
        callback();
      }
    });

    triggerMouseEvent(caller.nativeElement, 'mouseleave');
    expect(popoverSpy).toHaveBeenCalledWith();
    expect(closeSpy).not.toHaveBeenCalled();
  });

  it('should adjust placement on window resize', () => {
    const caller = directiveElements[3];
    const callerInstance = caller.injector.get(SkyPopoverDirective);
    const spy = spyOn(callerInstance.skyPopover, 'positionNextTo');

    callerInstance.skyPopover.isOpen = false;
    caller.nativeElement.click();

    expect(spy).toHaveBeenCalledWith(callerInstance['elementRef'], 'above', 'left');
    callerInstance.skyPopover.isOpen = true;

    spy.calls.reset();

    TestUtility.fireDomEvent(window, 'resize');
    expect(spy).toHaveBeenCalledWith(callerInstance['elementRef'], 'above', 'left');

    // Positioning should only occur if the popover is open.
    caller.nativeElement.click();
    callerInstance.skyPopover.isOpen = false;
    spy.calls.reset();

    TestUtility.fireDomEvent(window, 'resize');
    expect(spy).not.toHaveBeenCalled();
  });

  it('should close the popover when the escape key is pressed', () => {
    const caller = directiveElements[3];
    const callerInstance = caller.injector.get(SkyPopoverDirective);
    const spy = spyOn(callerInstance.skyPopover, 'close');

    callerInstance.skyPopover.isOpen = true;

    TestUtility.fireKeyboardEvent(caller.nativeElement, 'keyup', { key: 'Escape' });
    expect(spy).toHaveBeenCalledWith();

    spy.calls.reset();

    // Should ignore other key events.
    TestUtility.fireKeyboardEvent(caller.nativeElement, 'keyup', { key: 'Backspace' });
    expect(spy).not.toHaveBeenCalled();
  });

  it('should focus the caller element after being closed', () => {
    const caller = directiveElements[3];
    const callerInstance = caller.injector.get(SkyPopoverDirective);
    const spy = spyOn(callerInstance['elementRef'].nativeElement, 'focus').and.callThrough();

    callerInstance.skyPopover.isOpen = true;

    TestUtility.fireKeyboardEvent(caller.nativeElement, 'keyup', { key: 'Escape' });
    expect(spy).toHaveBeenCalledWith();
  });
});
