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
    const def: any = {
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

    def.setOffsets = (offsetTop: number, offsetLeft: number) => {
      def.offsetTop = offsetTop;
      def.offsetLeft = offsetLeft;
    };

    return def;
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

  it('should set a popover\'s arrow top and left coordinates',
    inject([SkyPopoverAdapterService, SkyWindowRefService], (
      adapterService: SkyPopoverAdapterService,
      windowService: SkyWindowRefService
    ) => {
      const spy = spyOn(adapterService['renderer'], 'setStyle');

      spyOn(windowService, 'getWindow').and.returnValue({
        setTimeout(callback: Function) {
          callback();
        },
        document: {
          body: {
            clientWidth: 800,
            clientHeight: 800
          }
        },
        innerHeight: 300, // viewport height
        pageXOffset: 0,
        pageYOffset: 100
      });

      const caller = new ElementRef(createElementRefDefinition(750, 0, 100, 34));
      const popover = new ElementRef(createElementRefDefinition(0, 0, 200, 300));
      const popoverArrow = new ElementRef(createElementRefDefinition());

      adapterService.setPopoverPosition({
        popover,
        popoverArrow,
        caller
      }, 'right', undefined);

      expect(spy).toHaveBeenCalledWith(popoverArrow.nativeElement, 'top', '367px');
      expect(spy).toHaveBeenCalledWith(popoverArrow.nativeElement, 'left', undefined);
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

      expect(spy).toHaveBeenCalledWith(popover.nativeElement, 'top', undefined);
      expect(spy).toHaveBeenCalledWith(popover.nativeElement, 'left', undefined);
      expect(spy).toHaveBeenCalledWith(popoverArrow.nativeElement, 'top', undefined);
      expect(spy).toHaveBeenCalledWith(popoverArrow.nativeElement, 'left', undefined);
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

  it('should return placement of fullscreen if popover dimensions greater than viewport',
    inject([SkyPopoverAdapterService], (adapterService: SkyPopoverAdapterService) => {
      adapterService.positionChange.take(1).subscribe((change: any) => {
        expect(change.placement).toEqual('fullscreen');
      });

      adapterService.setPopoverPosition({
        popover: new ElementRef(createElementRefDefinition(0, 0, 1500, 1500)),
        popoverArrow: new ElementRef(createElementRefDefinition()),
        caller: new ElementRef(createElementRefDefinition(0, 0, 100, 34))
      }, 'above', undefined);
    })
  );

  it('should only check for optimal placements a few times',
    inject(
      [SkyPopoverAdapterService, SkyWindowRefService],
      (adapterService: SkyPopoverAdapterService, windowService: SkyWindowRefService) => {
        adapterService.positionChange.take(1).subscribe((change: any) => {
          expect(change.placement).toEqual('fullscreen');
        });

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
              clientWidth: 300,
              clientHeight: 300
            }
          },
          innerHeight: 300,
          pageXOffset: 0,
          pageYOffset: 0
        });

        const elements = {
          popover: new ElementRef(createElementRefDefinition(0, 0, 276, 276)),
          popoverArrow: new ElementRef(createElementRefDefinition()),
          caller: new ElementRef(createElementRefDefinition(0, 0, 50, 50))
        };

        adapterService.setPopoverPosition(elements, 'above', undefined);

        expect(spy.calls.count()).toEqual(4);
        expect(spy.calls.argsFor(0)[1]).toEqual('above');
        expect(spy.calls.argsFor(1)[1]).toEqual('below');
        expect(spy.calls.argsFor(2)[1]).toEqual('left');
        expect(spy.calls.argsFor(3)[1]).toEqual('right');
      }
    )
  );

  it('should hide a popover',
    inject([SkyPopoverAdapterService], (adapterService: SkyPopoverAdapterService) => {
      const spy = spyOn(adapterService['renderer'], 'addClass');
      const elem = new ElementRef({ nativeElement: {} });
      adapterService.hidePopover(elem);
      expect(spy).toHaveBeenCalledWith(elem.nativeElement, 'sky-popover-hidden');
    })
  );

  it('should show a popover',
    inject([SkyPopoverAdapterService], (adapterService: SkyPopoverAdapterService) => {
      const spy = spyOn(adapterService['renderer'], 'removeClass');
      const elem = new ElementRef({ nativeElement: {} });
      adapterService.showPopover(elem);
      expect(spy).toHaveBeenCalledWith(elem.nativeElement, 'sky-popover-hidden');
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

  it('should stick the popover to the button\'s horizontal dimensions',
    inject([SkyPopoverAdapterService], (adapterService: SkyPopoverAdapterService) => {
      const spy = spyOn(adapterService['renderer'], 'setStyle');
      const callerDef = createElementRefDefinition(200, -5, 100, 34);
      callerDef.setOffsets(0, 10);

      const popover = new ElementRef(createElementRefDefinition(0, 0, 200, 100));
      const popoverArrow = new ElementRef(createElementRefDefinition());

      adapterService.setPopoverPosition({
        popover,
        popoverArrow,
        caller: new ElementRef(callerDef)
      }, 'above', 'right');

      expect(spy).toHaveBeenCalledWith(popover.nativeElement, 'top', '-100px');
      // The popover left coordinate should never be less than the button's offsetLeft.
      expect(spy).toHaveBeenCalledWith(popover.nativeElement, 'left', '10px');
    })
  );
});
