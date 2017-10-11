import { By } from '@angular/platform-browser';

import {
  DebugElement
} from '@angular/core';

import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  NoopAnimationsModule
} from '@angular/platform-browser/animations';

import {
  SkyWindowRefService
} from '../window';

import {
  SkyPopoverComponent,
  SkyPopoverDirective,
  SkyPopoverAdapterService
} from './index';

import {
  SkyPopoverTestComponent
} from './fixtures/popover.component.fixture';

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
  let component: SkyPopoverTestComponent;
  let directiveElements: DebugElement[];

  function triggerMouseEvent(el: DebugElement, eventName: string) {
    el.triggerEventHandler(
      eventName,
      {
        preventDefault: () => {}
      }
    );
  }

  function validateTriggerOpensPopover(
    elIndex: number,
    openTrigger: string,
    closeTrigger: string
  ) {
    const allOpenTriggers = [
      'click',
      'mouseenter'
    ];

    const allCloseTriggers = [
      'click',
      'mouseleave'
    ];

    const caller = directiveElements[elIndex];
    const callerInstance = caller.injector.get(SkyPopoverDirective);

    const positionNextToSpy = spyOn(callerInstance.skyPopover, 'positionNextTo');
    const closeSpy = spyOn(callerInstance.skyPopover, 'close');

    // The popover shouldn't be opened on other triggers.
    for (const supportedTrigger of allOpenTriggers) {
      if (supportedTrigger !== openTrigger) {
        triggerMouseEvent(caller, supportedTrigger);

        expect(positionNextToSpy).not.toHaveBeenCalled();
      }
    }

    triggerMouseEvent(caller, openTrigger);

    expect(positionNextToSpy).toHaveBeenCalled();

    callerInstance.skyPopover.isOpen = true;

    // The popover shouldn't be closed on other triggers.
    for (const supportedCloseTrigger of allCloseTriggers) {
      if (supportedCloseTrigger !== closeTrigger) {
        triggerMouseEvent(caller, supportedCloseTrigger);

        expect(closeSpy).not.toHaveBeenCalled();
      }
    }

    triggerMouseEvent(caller, closeTrigger);

    expect(closeSpy).toHaveBeenCalled();

    // Make sure close isn't called again when the popover is already closed.
    closeSpy.calls.reset();

    callerInstance.skyPopover.isOpen = false;

    triggerMouseEvent(caller, closeTrigger);

    expect(closeSpy).not.toHaveBeenCalled();
  }

  beforeEach(() => {
    let mockWindowService = new MockWindowService();
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
    component = fixture.componentInstance;
    directiveElements = fixture.debugElement.queryAll(By.directive(SkyPopoverDirective));
    fixture.detectChanges();
  });

  it('should ask the popover to position itself accordingly', () => {
    const caller = directiveElements[0];
    const callerInstance = caller.injector.get(SkyPopoverDirective);
    spyOn(callerInstance.skyPopover, 'positionNextTo');

    triggerMouseEvent(caller, 'click');

    expect(callerInstance.skyPopover.positionNextTo)
      .toHaveBeenCalledWith(callerInstance.elementRef, undefined);
  });

  it('should ask the popover to close itself if the button is clicked again', () => {
    const caller = directiveElements[0];
    const callerInstance = caller.injector.get(SkyPopoverDirective);

    callerInstance.skyPopover.isOpen = true;
    spyOn(callerInstance.skyPopover, 'close');

    triggerMouseEvent(caller, 'click');

    expect(callerInstance.skyPopover.close)
      .toHaveBeenCalledWith();
  });

  it('should pass along the placement', () => {
    const caller = directiveElements[1];
    const callerInstance = caller.injector.get(SkyPopoverDirective);

    spyOn(callerInstance.skyPopover, 'positionNextTo');

    triggerMouseEvent(caller, 'click');

    expect(callerInstance.skyPopover.positionNextTo)
      .toHaveBeenCalledWith(callerInstance.elementRef, 'below');
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
    const spy = spyOn(callerInstance.skyPopover, 'markForCloseOnMouseLeave');
    callerInstance.skyPopover.isOpen = true;
    callerInstance.skyPopover.isMouseEnter = true;
    triggerMouseEvent(caller, 'mouseleave');
    expect(spy).toHaveBeenCalledWith();
  });
});
