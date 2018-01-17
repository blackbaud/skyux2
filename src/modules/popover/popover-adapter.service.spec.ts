import {
  ElementRef,
  Renderer2
} from '@angular/core';

import {
  inject,
  TestBed
} from '@angular/core/testing';

import {
  SkyWindowRefService
} from '../window';

import {
  SkyPopoverAdapterService
} from './popover-adapter.service';

describe('SkyPopoverAdapterService', () => {
  let mockRenderer: any;

  class MockWindowService {
    public getWindow(): any {
      return {
        setTimeout(callback: Function) {
          callback();
        },
        document: {
          body: {
            clientWidth: 800,
            clientHeight: 1200
          }
        },
        pageXOffset: 0,
        pageYOffset: 0
      };
    }
  }

  function createElementRefDefinition(
    top = 0,
    left = 0,
    right = 0,
    width = 0,
    height = 0
  ) {
    return {
      getBoundingClientRect: function () {
        return {
          top: top,
          left: left,
          right: right,
          width: width,
          height: height
        };
      }
    };
  }

  beforeEach(() => {
    mockRenderer = {
      removeStyle() {},
      setStyle() {},
      addClass() {},
      removeClass() {}
    };

    TestBed.configureTestingModule({
      providers: [
        SkyPopoverAdapterService,
        { provide: Renderer2, useValue: mockRenderer },
        { provide: SkyWindowRefService, useValue: new MockWindowService() }
      ]
    });
  });

  it('should set a popover\'s top and left coordinates',
    inject([SkyPopoverAdapterService], (adapterService: SkyPopoverAdapterService) => {
      const spy = spyOn(adapterService['renderer'], 'setStyle');
      const popover = new ElementRef(createElementRefDefinition(0, 0, 0, 180, 70));
      const popoverArrow = new ElementRef(createElementRefDefinition(0, 0, 0, 20, 10));

      adapterService.setPopoverPosition({
        popover,
        popoverArrow,
        caller: new ElementRef(createElementRefDefinition(200, 200, 0, 80, 34))
      }, 'right');

      expect(spy).toHaveBeenCalledWith(popover.nativeElement, 'top', `182px`);
      expect(spy).toHaveBeenCalledWith(popover.nativeElement, 'left', `0px`);
      expect(spy).toHaveBeenCalledWith(popoverArrow.nativeElement, 'top', `35px`);
      expect(spy).toHaveBeenCalledWith(popoverArrow.nativeElement, 'left', undefined);
    })
  );

  it('should default the placement to "above"',
    inject([SkyPopoverAdapterService], (adapterService: SkyPopoverAdapterService) => {
      const spy = spyOn(adapterService as any, 'getCoordinates').and.callThrough();

      // Setting the caller's top value to 200 will make sure the popover has
      // enough room to appear above.
      adapterService.setPopoverPosition({
        popover: new ElementRef(createElementRefDefinition(0, 0, 0, 276, 100)),
        popoverArrow: new ElementRef(createElementRefDefinition()),
        caller: new ElementRef(createElementRefDefinition(200, 0, 100, 100, 34))
      }, undefined);

      expect(spy.calls.mostRecent().args[1]).toEqual('above');
    })
  );

  it('should attempt to find the optimal placement if outside viewport',
    inject([SkyPopoverAdapterService], (adapterService: SkyPopoverAdapterService) => {
      const spy = spyOn(adapterService as any, 'getCoordinates').and.callThrough();

      adapterService.setPopoverPosition({
        popover: new ElementRef(createElementRefDefinition(0, 0, 0, 276, 100)),
        popoverArrow: new ElementRef(createElementRefDefinition()),
        caller: new ElementRef(createElementRefDefinition(0, 0, 100, 100, 34))
      }, 'above');

      expect(spy.calls.mostRecent().args[1]).toEqual('below');
    })
  );

  it('should only check for optimal placements a few times',
    inject(
      [SkyPopoverAdapterService, SkyWindowRefService],
      (adapterService: SkyPopoverAdapterService, windowService: SkyWindowRefService) => {
        const spy = spyOn(adapterService as any, 'getCoordinates').and.callThrough();

        // For this test, the window's dimensions have been set to be smaller than the popover.
        // All cardinal directions should be checked (and fail),
        // at which case the placement should be set to the opposite direction.
        spyOn(windowService, 'getWindow').and.returnValue({
          setTimeout(callback: Function) {
            callback();
          },
          document: {
            body: {
              clientWidth: 100,
              clientHeight: 50
            }
          },
          pageXOffset: 0,
          pageYOffset: 0
        });

        const elements = {
          popover: new ElementRef(createElementRefDefinition(0, 0, 0, 276, 100)),
          popoverArrow: new ElementRef(createElementRefDefinition()),
          caller: new ElementRef(createElementRefDefinition(0, 0, 100, 100, 34))
        };

        adapterService.setPopoverPosition(elements, 'below');
        expect(spy.calls.mostRecent().args[1]).toEqual('above');

        adapterService.setPopoverPosition(elements, 'right');
        expect(spy.calls.mostRecent().args[1]).toEqual('left');

        adapterService.setPopoverPosition(elements, 'left');
        expect(spy.calls.mostRecent().args[1]).toEqual('right');

        adapterService.setPopoverPosition(elements, 'above');
        expect(spy.calls.mostRecent().args[1]).toEqual('below');
      }
    )
  );

  it('should hide a popover',
    inject([SkyPopoverAdapterService], (adapterService: SkyPopoverAdapterService) => {
      const spy = spyOn(adapterService['renderer'], 'addClass');
      const elem = new ElementRef({ nativeElement: {} });
      adapterService.hidePopover(elem);
      expect(spy).toHaveBeenCalledWith(elem.nativeElement, 'hidden');
    })
  );

  it('should show a popover',
    inject([SkyPopoverAdapterService], (adapterService: SkyPopoverAdapterService) => {
      const spy = spyOn(adapterService['renderer'], 'removeClass');
      const elem = new ElementRef({ nativeElement: {} });
      adapterService.showPopover(elem);
      expect(spy).toHaveBeenCalledWith(elem.nativeElement, 'hidden');
    })
  );
});
