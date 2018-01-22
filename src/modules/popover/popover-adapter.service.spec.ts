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

import {
  SkyPopoverPosition
} from './types';

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

  function verifyPosition(
    position: SkyPopoverPosition,
    top: number,
    left: number,
    arrowTop: number,
    arrowLeft: number
  ) {
    expect(position.top).toEqual(top);
    expect(position.left).toEqual(left);
    expect(position.arrowTop).toEqual(arrowTop);
    expect(position.arrowLeft).toEqual(arrowLeft);
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
      const popover = new ElementRef(createElementRefDefinition(0, 0, 180, 70));
      const popoverArrow = new ElementRef(createElementRefDefinition(0, 0, 20, 10));

      const position = adapterService.getPopoverPosition({
        popover,
        popoverArrow,
        caller: new ElementRef(createElementRefDefinition(200, 200, 80, 34))
      }, 'above', 'center');

      verifyPosition(position, 130, 150, undefined, 90);
    })
  );

  it('should set a popover\'s arrow top and left coordinates',
    inject([SkyPopoverAdapterService, SkyWindowRefService], (
      adapterService: SkyPopoverAdapterService,
      windowService: SkyWindowRefService
    ) => {
      spyOn(windowService, 'getWindow').and.returnValue({
        setTimeout(callback: Function) {
          callback();
        },
        document: {
          body: { // document dimensions
            clientWidth: 800,
            clientHeight: 800
          }
        },
        innerHeight: 300, // viewport height
        pageXOffset: 0,
        pageYOffset: 100 // scroll top
      });

      const caller = new ElementRef(createElementRefDefinition(750, 0, 100, 34));
      const popover = new ElementRef(createElementRefDefinition(0, 0, 200, 300));
      const popoverArrow = new ElementRef(createElementRefDefinition());

      const position = adapterService.getPopoverPosition({
        popover,
        popoverArrow,
        caller
      }, 'right', undefined);

      expect(position.arrowTop).toEqual(367);
      expect(position.arrowLeft).toEqual(undefined);
    })
  );

  it('should handle invalid placement and alignment values',
    inject([SkyPopoverAdapterService], (adapterService: SkyPopoverAdapterService) => {
      const popover = new ElementRef(createElementRefDefinition(0, 0, 180, 70));
      const popoverArrow = new ElementRef(createElementRefDefinition(0, 0, 20, 10));

      const position = (adapterService as any).getPopoverPosition({
        popover,
        popoverArrow,
        caller: new ElementRef(createElementRefDefinition(200, 200, 80, 34))
      }, 'foo', 'bar');

      verifyPosition(position, undefined, undefined, undefined, undefined);
    })
  );

  it('should allow for left and right alignment',
    inject([SkyPopoverAdapterService], (adapterService: SkyPopoverAdapterService) => {
      const popover = new ElementRef(createElementRefDefinition(0, 0, 180, 70));
      const popoverArrow = new ElementRef(createElementRefDefinition(0, 0, 20, 10));

      let position = adapterService.getPopoverPosition({
        popover,
        popoverArrow,
        caller: new ElementRef(createElementRefDefinition(200, 200, 80, 34))
      }, 'below', 'left');

      verifyPosition(position, 234, 200, undefined, 40);

      position = adapterService.getPopoverPosition({
        popover,
        popoverArrow,
        caller: new ElementRef(createElementRefDefinition(200, 200, 80, 34))
      }, 'below', 'right');

      verifyPosition(position, 234, 100, undefined, 140);
    })
  );

  it('should attempt to find the optimal placement if outside viewport',
    inject([SkyPopoverAdapterService], (adapterService: SkyPopoverAdapterService) => {
      const position = adapterService.getPopoverPosition({
        popover: new ElementRef(createElementRefDefinition(0, 0, 276, 100)),
        popoverArrow: new ElementRef(createElementRefDefinition()),
        caller: new ElementRef(createElementRefDefinition(0, 0, 100, 34))
      }, 'above', undefined);

      expect(position.placement).toEqual('below');
    })
  );

  it('should return placement of fullscreen if popover dimensions greater than viewport',
    inject([SkyPopoverAdapterService], (adapterService: SkyPopoverAdapterService) => {
      const position = adapterService.getPopoverPosition({
        popover: new ElementRef(createElementRefDefinition(0, 0, 1500, 1500)),
        popoverArrow: new ElementRef(createElementRefDefinition()),
        caller: new ElementRef(createElementRefDefinition(0, 0, 100, 34))
      }, 'above', undefined);

      expect(position.placement).toEqual('fullscreen');
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

        const position = adapterService.getPopoverPosition(elements, 'above', undefined);

        expect(spy.calls.count()).toEqual(4);
        expect(spy.calls.argsFor(0)[1]).toEqual('above');
        expect(spy.calls.argsFor(1)[1]).toEqual('below');
        expect(spy.calls.argsFor(2)[1]).toEqual('left');
        expect(spy.calls.argsFor(3)[1]).toEqual('right');
        expect(position.placement).toEqual('fullscreen');
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
      // const spy = spyOn(adapterService['renderer'], 'setStyle');
      const popover = new ElementRef(createElementRefDefinition(0, 0, 180, 70));
      const popoverArrow = new ElementRef(createElementRefDefinition(0, 0, 20, 10));

      let position = adapterService.getPopoverPosition({
        popover,
        popoverArrow,
        // Make the button larger than the screen:
        caller: new ElementRef(createElementRefDefinition(200, 200, 4000, 34))
      }, 'above', 'left');

      // The arrow is out of bounds, so resort to the CSS defaults:
      expect(position.arrowTop).toEqual(undefined);
      expect(position.arrowLeft).toEqual(undefined);

      position = adapterService.getPopoverPosition({
        popover,
        popoverArrow,
        caller: new ElementRef(createElementRefDefinition(200, 200, 4000, 34))
      }, 'above', 'right');

      // The arrow is out of bounds, so resort to the CSS defaults:
      expect(position.arrowTop).toEqual(undefined);
      expect(position.arrowLeft).toEqual(undefined);
    })
  );

  it('should stick the popover to the button\'s horizontal dimensions',
    inject([SkyPopoverAdapterService], (adapterService: SkyPopoverAdapterService) => {
      const callerDef = createElementRefDefinition(200, -5, 100, 34);
      const popover = new ElementRef(createElementRefDefinition(0, 0, 200, 100));
      const popoverArrow = new ElementRef(createElementRefDefinition());

      callerDef.setOffsets(0, 10);

      const position = adapterService.getPopoverPosition({
        popover,
        popoverArrow,
        caller: new ElementRef(callerDef)
      }, 'above', 'right');

      expect(position.top).toEqual(-100);
      // The popover left coordinate should never be less than the button's offsetLeft.
      expect(position.left).toEqual(10);
    })
  );
});
