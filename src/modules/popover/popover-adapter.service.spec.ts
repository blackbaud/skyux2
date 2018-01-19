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
    width = 0,
    height = 0
  ) {
    return {
      getBoundingClientRect: function () {
        return {
          top: top,
          left: left,
          width: width,
          height: height
        };
      },
      offsetTop: top,
      offsetLeft: left
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
      const popover = new ElementRef(createElementRefDefinition(0, 0, 180, 70));
      const popoverArrow = new ElementRef(createElementRefDefinition(0, 0, 20, 10));

      adapterService.setPopoverPosition({
        popover,
        popoverArrow,
        caller: new ElementRef(createElementRefDefinition(200, 200, 80, 34))
      }, 'above', 'center');

      expect(spy).toHaveBeenCalledWith(popover.nativeElement, 'top', '130px');
      expect(spy).toHaveBeenCalledWith(popover.nativeElement, 'left', '150px');
      expect(spy).toHaveBeenCalledWith(popoverArrow.nativeElement, 'top', undefined);
      expect(spy).toHaveBeenCalledWith(popoverArrow.nativeElement, 'left', '90px');
    })
  );

  it('should handle invalid placement and alignment values',
    inject([SkyPopoverAdapterService], (adapterService: SkyPopoverAdapterService) => {
      const spy = spyOn(adapterService['renderer'], 'setStyle');
      const popover = new ElementRef(createElementRefDefinition(0, 0, 180, 70));
      const popoverArrow = new ElementRef(createElementRefDefinition(0, 0, 20, 10));

      (adapterService as any).setPopoverPosition({
        popover,
        popoverArrow,
        caller: new ElementRef(createElementRefDefinition(200, 200, 80, 34))
      }, 'foo', 'bar');

      // Should default to values that would normally be created by 'above' 'center':
      expect(spy).toHaveBeenCalledWith(popover.nativeElement, 'top', '130px');
      expect(spy).toHaveBeenCalledWith(popover.nativeElement, 'left', '150px');
      expect(spy).toHaveBeenCalledWith(popoverArrow.nativeElement, 'top', undefined);
      expect(spy).toHaveBeenCalledWith(popoverArrow.nativeElement, 'left', '90px');
    })
  );

  it('should allow for left and right alignment',
    inject([SkyPopoverAdapterService], (adapterService: SkyPopoverAdapterService) => {
      const spy = spyOn(adapterService['renderer'], 'setStyle');
      const popover = new ElementRef(createElementRefDefinition(0, 0, 180, 70));
      const popoverArrow = new ElementRef(createElementRefDefinition(0, 0, 20, 10));

      adapterService.setPopoverPosition({
        popover,
        popoverArrow,
        caller: new ElementRef(createElementRefDefinition(200, 200, 80, 34))
      }, 'below', 'left');

      expect(spy).toHaveBeenCalledWith(popover.nativeElement, 'top', '234px');
      expect(spy).toHaveBeenCalledWith(popover.nativeElement, 'left', '200px');
      expect(spy).toHaveBeenCalledWith(popoverArrow.nativeElement, 'top', undefined);
      expect(spy).toHaveBeenCalledWith(popoverArrow.nativeElement, 'left', '40px');

      adapterService.setPopoverPosition({
        popover,
        popoverArrow,
        caller: new ElementRef(createElementRefDefinition(200, 200, 80, 34))
      }, 'below', 'right');

      expect(spy).toHaveBeenCalledWith(popover.nativeElement, 'top', '234px');
      expect(spy).toHaveBeenCalledWith(popover.nativeElement, 'left', '100px');
      expect(spy).toHaveBeenCalledWith(popoverArrow.nativeElement, 'top', undefined);
      expect(spy).toHaveBeenCalledWith(popoverArrow.nativeElement, 'left', '140px');
    })
  );

  it('should attempt to find the optimal placement if outside viewport',
    inject([SkyPopoverAdapterService], (adapterService: SkyPopoverAdapterService) => {
      adapterService.positionChange.take(1).subscribe((change: any) => {
        expect(change.placement).toEqual('below');
      });

      adapterService.setPopoverPosition({
        popover: new ElementRef(createElementRefDefinition(0, 0, 276, 100)),
        popoverArrow: new ElementRef(createElementRefDefinition()),
        caller: new ElementRef(createElementRefDefinition(0, 0, 100, 34))
      }, 'above', undefined);
    })
  );

  it('should only check for optimal placements a few times',
    inject(
      [SkyPopoverAdapterService, SkyWindowRefService],
      (adapterService: SkyPopoverAdapterService, windowService: SkyWindowRefService) => {
        const spy = spyOn(adapterService as any, 'getPopoverCoordinates').and.callThrough();

        // For this test, the window's dimensions have been set to be smaller than the popover.
        // All cardinal directions should be checked (and fail),
        // at which case the placement should be set to the opposite direction.
        spyOn(windowService, 'getWindow').and.returnValue({
          setTimeout(callback: Function) {
            callback();
          },
          document: {
            body: {
              clientWidth: 50,
              clientHeight: 50
            }
          },
          pageXOffset: 0,
          pageYOffset: 0
        });

        const elements = {
          popover: new ElementRef(createElementRefDefinition(0, 0, 276, 100)),
          popoverArrow: new ElementRef(createElementRefDefinition()),
          caller: new ElementRef(createElementRefDefinition(0, 0, 100, 34))
        };

        adapterService.setPopoverPosition(elements, 'below', undefined);
        expect(spy.calls.mostRecent().args[1]).toEqual('above');

        adapterService.setPopoverPosition(elements, 'right', undefined);
        expect(spy.calls.mostRecent().args[1]).toEqual('left');

        adapterService.setPopoverPosition(elements, 'left', undefined);
        expect(spy.calls.mostRecent().args[1]).toEqual('right');

        adapterService.setPopoverPosition(elements, 'above', undefined);
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

  it('should handle out-of-bounds coordinates for arrows',
    inject([SkyPopoverAdapterService], (adapterService: SkyPopoverAdapterService) => {
      const spy = spyOn(adapterService['renderer'], 'setStyle');
      const popover = new ElementRef(createElementRefDefinition(0, 0, 180, 70));
      const popoverArrow = new ElementRef(createElementRefDefinition(0, 0, 20, 10));

      adapterService.setPopoverPosition({
        popover,
        popoverArrow,
        // Make the button larger than the screen:
        caller: new ElementRef(createElementRefDefinition(200, 200, 4000, 34))
      }, 'above', 'left');

      // The arrow is out of bounds, so resort to the CSS defaults:
      expect(spy).toHaveBeenCalledWith(popoverArrow.nativeElement, 'top', undefined);
      expect(spy).toHaveBeenCalledWith(popoverArrow.nativeElement, 'left', undefined);

      adapterService.setPopoverPosition({
        popover,
        popoverArrow,
        caller: new ElementRef(createElementRefDefinition(200, 200, 4000, 34))
      }, 'above', 'right');

      // The arrow is out of bounds, so resort to the CSS defaults:
      expect(spy).toHaveBeenCalledWith(popoverArrow.nativeElement, 'top', undefined);
      expect(spy).toHaveBeenCalledWith(popoverArrow.nativeElement, 'left', undefined);
    })
  );

  it('should respect a positioned parent\'s width',
    inject([SkyPopoverAdapterService], (adapterService: SkyPopoverAdapterService) => {
      const spy = spyOn(adapterService['renderer'], 'setStyle');
      const popover = new ElementRef(createElementRefDefinition(0, 0, 180, 70));
      const popoverArrow = new ElementRef(createElementRefDefinition(0, 0, 20, 10));
      const caller = new ElementRef(createElementRefDefinition(0, 0, 80, 34));

      // Create a parent with position:relative set.
      // See: offsetParent, https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent
      // Parent element is the same width as the button,
      // so that a placement of 'right' will cause the adapter
      // to place the popover 'below'.
      caller.nativeElement.offsetParent = createElementRefDefinition(0, 0, 80, 80);

      adapterService.setPopoverPosition({
        popover,
        popoverArrow,
        caller
      }, 'right', undefined);

      // The following coordinates represent the popover 'below' the trigger.
      expect(spy).toHaveBeenCalledWith(popover.nativeElement, 'top', '34px');
      expect(spy).toHaveBeenCalledWith(popover.nativeElement, 'left', '0px');
      expect(spy).toHaveBeenCalledWith(popoverArrow.nativeElement, 'top', undefined);
      expect(spy).toHaveBeenCalledWith(popoverArrow.nativeElement, 'left', '40px');
    })
  );
});
