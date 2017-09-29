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

    fixture.detectChanges();
    caller.nativeElement.click();
    fixture.detectChanges();

    expect(callerInstance.skyPopover.positionNextTo)
      .toHaveBeenCalledWith(callerInstance.elementRef, undefined);
  });

  it('should ask the popover to close itself if the button is clicked again', () => {
    const caller = directiveElements[0];
    const callerInstance = caller.injector.get(SkyPopoverDirective);

    callerInstance.skyPopover.isOpen = true;
    spyOn(callerInstance.skyPopover, 'close');

    caller.nativeElement.click();
    fixture.detectChanges();

    expect(callerInstance.skyPopover.close)
      .toHaveBeenCalledWith();
  });

  it('should pass along the placement', () => {
    const caller = directiveElements[1];
    const callerInstance = caller.injector.get(SkyPopoverDirective);

    spyOn(callerInstance.skyPopover, 'positionNextTo');

    fixture.detectChanges();
    caller.nativeElement.click();
    fixture.detectChanges();

    expect(callerInstance.skyPopover.positionNextTo)
      .toHaveBeenCalledWith(callerInstance.elementRef, 'below');
  });
});
