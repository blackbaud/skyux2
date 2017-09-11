/*tslint:disable:no-console*/
import { By } from '@angular/platform-browser';

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

import { Observable } from 'rxjs/Observable';

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

  beforeEach(() => {
    let mockWindowService = new MockWindowService();
    let mockAdapterService = {
      placementChanges: Observable.of('above'),
      setPopoverPosition() {},
      hidePopover() {},
      showPopover() {}
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
    spyOn(component['adapterService'], 'setPopoverPosition');
    component.positionNextTo(caller, 'above');
    expect(component['adapterService'].setPopoverPosition).toHaveBeenCalled();
  });

  it('should call the adapter service with a default position', () => {
    const caller = new ElementRef({});
    spyOn(component['adapterService'], 'setPopoverPosition');
    component.positionNextTo(caller, undefined);
    expect(component['adapterService'].setPopoverPosition).toHaveBeenCalled();
    expect(component.placement).toEqual('above');
  });

  it('should not call the adapter service if a caller is not defined', () => {
    spyOn(component['adapterService'], 'setPopoverPosition');
    component.positionNextTo(undefined, 'above');
    expect(component['adapterService'].setPopoverPosition).not.toHaveBeenCalled();
  });

  it('should close a popover', () => {
    component.close();
    expect(component['lastCaller']).toBeUndefined();
    expect(component.isOpen).toEqual(false);
  });

  it('should get a CSS classname to represent its placement', () => {
    const element = fixture.debugElement.query(By.css('.sky-popover-placement-above'));
    expect(Boolean(element)).not.toEqual(false);
  });

  it('should remove a CSS classname before the animation starts', () => {
    spyOn(component['adapterService'], 'showPopover').and.returnValue(0);
    component.onAnimationStart({
      fromState: 'hidden',
      toState: 'visible',
      totalTime: 0,
      phaseName: '',
      element: {},
      triggerName: ''
    });
    expect(component['adapterService'].showPopover)
      .toHaveBeenCalledWith(component.popoverContainer);

    // Handle 'else' path:
    (component['adapterService'].showPopover as any).calls.reset();
    component.onAnimationStart({
      fromState: 'visible',
      toState: 'hidden',
      totalTime: 0,
      phaseName: '',
      element: {},
      triggerName: ''
    });

    expect(component['adapterService'].showPopover)
      .not
      .toHaveBeenCalled();
  });

  it('should add a CSS classname when the animation stops', () => {
    spyOn(component['adapterService'], 'hidePopover').and.returnValue(0);
    component.onAnimationDone({
      fromState: 'visible',
      toState: 'hidden',
      totalTime: 0,
      phaseName: '',
      element: {},
      triggerName: ''
    });
    expect(component['adapterService'].hidePopover)
      .toHaveBeenCalledWith(component.popoverContainer);
  });

  it('should emit an event when the popover is opened', () => {
    spyOn(component.popoverOpened, 'emit').and.returnValue(0);
    component.onAnimationDone({
      fromState: 'hidden',
      toState: 'visible',
      totalTime: 0,
      phaseName: '',
      element: {},
      triggerName: ''
    });
    expect(component.popoverOpened.emit)
      .toHaveBeenCalledWith(component);
  });

  it('should emit an event when the popover is closed', () => {
    spyOn(component.popoverClosed, 'emit').and.returnValue(0);
    component.onAnimationDone({
      fromState: 'visible',
      toState: 'hidden',
      totalTime: 0,
      phaseName: '',
      element: {},
      triggerName: ''
    });
    expect(component.popoverClosed.emit)
      .toHaveBeenCalledWith(component);
  });

  it('should get the animation state', () => {
    let state = component.getAnimationState();
    expect(state).toEqual('hidden');
    component.isOpen = true;
    fixture.detectChanges();
    state = component.getAnimationState();
    expect(state).toEqual('visible');
  });

  it('should unsubscribe from the placement observable', () => {
    spyOn(component['placementSubscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['placementSubscription'].unsubscribe).toHaveBeenCalled();
  });

  it('should capture mouse enter and mouse leave events', () => {
    expect(component['isMouseEnter']).toEqual(false);
    TestUtility.fireDomEvent(fixture.nativeElement, 'mouseenter');
    expect(component['isMouseEnter']).toEqual(true);
    TestUtility.fireDomEvent(fixture.nativeElement, 'mouseleave');
    expect(component['isMouseEnter']).toEqual(false);
  });

  it('should adjust placement on window resize', () => {
    component.placement = 'below';
    spyOn(component, 'positionNextTo').and.returnValue(0);
    TestUtility.fireDomEvent(window, 'resize');
    expect(component.positionNextTo).toHaveBeenCalledWith(component['lastCaller'], 'below');
  });

  it('should close the popover when the escape key is pressed', () => {
    spyOn(component, 'close');

    component.isOpen = true;

    const escapeEvent: any = document.createEvent('CustomEvent');
    escapeEvent.which = 27;
    escapeEvent.initEvent('keyup', true, true);
    document.dispatchEvent(escapeEvent);

    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('.sky-popover-container.hidden'));

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
});
