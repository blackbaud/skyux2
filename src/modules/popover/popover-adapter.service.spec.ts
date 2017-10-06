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
    right: any = 'auto',
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
      spyOn(adapterService['renderer'], 'setStyle');

      adapterService.setPopoverPosition({
        popover: new ElementRef(createElementRefDefinition()),
        popoverArrow: new ElementRef(createElementRefDefinition()),
        caller: new ElementRef(createElementRefDefinition())
      }, 'right');

      expect(adapterService['renderer'].setStyle).toHaveBeenCalled();
    })
  );

  it('should default the placement to "above"',
    inject([SkyPopoverAdapterService], (adapterService: SkyPopoverAdapterService) => {
      spyOn(adapterService['renderer'], 'setStyle');

      adapterService.setPopoverPosition({
        popover: new ElementRef(createElementRefDefinition()),
        popoverArrow: new ElementRef(createElementRefDefinition()),
        caller: new ElementRef(createElementRefDefinition())
      }, undefined);

      expect(adapterService['renderer'].setStyle).toHaveBeenCalled();
    })
  );

  it('should attempt to find the optimal placement if outside viewport',
    inject([SkyPopoverAdapterService], (adapterService: SkyPopoverAdapterService) => {
      let newPlacement: string;
      const subscription = adapterService.placementChanges.subscribe((data) => {
        newPlacement = data;
      });

      adapterService.setPopoverPosition({
        popover: new ElementRef(createElementRefDefinition(0, 0, 'auto', 276, 100)),
        popoverArrow: new ElementRef(createElementRefDefinition()),
        caller: new ElementRef(createElementRefDefinition(0, 0, 100, 100, 34))
      }, 'above');

      subscription.unsubscribe();
      expect(newPlacement).toEqual('below');
    })
  );

  it('should only check for optimal placements a few times',
    inject(
      [SkyPopoverAdapterService, SkyWindowRefService],
      (adapterService: SkyPopoverAdapterService, windowService: SkyWindowRefService) => {
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

        let newPlacement: string;
        const subscription = adapterService.placementChanges.subscribe((data) => {
          newPlacement = data;
        });

        adapterService.setPopoverPosition({
          popover: new ElementRef(createElementRefDefinition(0, 0, 'auto', 276, 100)),
          popoverArrow: new ElementRef(createElementRefDefinition()),
          caller: new ElementRef(createElementRefDefinition(0, 0, 100, 100, 34))
        }, 'above');

        subscription.unsubscribe();
        // For this test, the window's dimensions have been set to be smaller than the popover.
        // All cardinal directions should be checked (and fail),
        // at which case the placement should be set to the opposite direction.
        expect(newPlacement).toEqual('below');
      }
    )
  );

  it('should hide a popover',
    inject([SkyPopoverAdapterService], (adapterService: SkyPopoverAdapterService) => {
      spyOn(adapterService['renderer'], 'addClass');
      const elem = new ElementRef({ nativeElement: {} });
      adapterService.hidePopover(elem);
      expect(adapterService['renderer'].addClass)
        .toHaveBeenCalledWith(elem.nativeElement, 'hidden');
    })
  );

  it('should show a popover',
    inject([SkyPopoverAdapterService], (adapterService: SkyPopoverAdapterService) => {
      spyOn(adapterService['renderer'], 'removeClass');
      const elem = new ElementRef({ nativeElement: {} });
      adapterService.showPopover(elem);
      expect(adapterService['renderer'].removeClass)
        .toHaveBeenCalledWith(elem.nativeElement, 'hidden');
    })
  );
});
