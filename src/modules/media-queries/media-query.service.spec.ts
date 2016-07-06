import {
  addProviders,
  inject
} from '@angular/core/testing';

import { SkyMediaQueryListenerArgs } from './media-query-listener-args';
import { SkyMediaQueryService } from './media-query.service';

describe('Media query service', () => {
  let mediaQueryListPrototype: any;

  beforeEach(() => {
    addProviders([SkyMediaQueryService]);

    // Safari doesn't put MediaQueryList on the global window object so we
    // have to pick it off here.
    mediaQueryListPrototype = Object.getPrototypeOf(matchMedia(SkyMediaQueryService.sm));
  });

  it(
    'should listen for media query breakpoints on init',
    inject([SkyMediaQueryService], (mediaQueryService: SkyMediaQueryService) => {
      let matchMediaSpy = spyOn(window, 'matchMedia').and.callThrough();
      let addListenerSpy = spyOn(mediaQueryListPrototype, 'addListener');

      mediaQueryService.init(
        SkyMediaQueryService.sm,
        (args: SkyMediaQueryListenerArgs) => {

        }
      );

      expect(matchMediaSpy).toHaveBeenCalledWith(SkyMediaQueryService.sm);
      expect(addListenerSpy).toHaveBeenCalled();
    })
  );

  it(
    'should stop listening for media query breakpoints on destroy',
    inject([SkyMediaQueryService], (mediaQueryService: SkyMediaQueryService) => {
      let removeListenerSpy = spyOn(mediaQueryListPrototype, 'removeListener');

      mediaQueryService.init(
        SkyMediaQueryService.sm,
        (args: SkyMediaQueryListenerArgs) => {

        }
      );

      mediaQueryService.destroy();

      expect(removeListenerSpy).toHaveBeenCalled();
    })
  );

  it(
    'should fire the listener when the specified breakpoint is hit',
    inject([SkyMediaQueryService], (mediaQueryService: SkyMediaQueryService) => {
      let listenerCalled: boolean;

      function listener(args: SkyMediaQueryListenerArgs) {
        listenerCalled = true;
        expect(args.matches).toBe(true);
      }

      let matchMediaListener: Function;

      spyOn(mediaQueryListPrototype, 'addListener')
        .and.callFake((serviceListener: Function) => {
          matchMediaListener = serviceListener;
        }
      );

      mediaQueryService.init(
        SkyMediaQueryService.sm,
        listener
      );

      matchMediaListener({
        matches: true
      });

      expect(listenerCalled).toBe(true);
    })
  );

  it(
    'should provide the ability to check if the media query matches the current screen size',
    inject([SkyMediaQueryService], (mediaQueryService: SkyMediaQueryService) => {
      let mql = matchMedia(SkyMediaQueryService.sm);

      mediaQueryService.init(SkyMediaQueryService.sm, () => {});

      expect(mediaQueryService.matches).toBe(mql.matches);
    })
  );

  it(
    'should sanity check the listener when the specified breakpoint is hit',
    inject([SkyMediaQueryService], (mediaQueryService: SkyMediaQueryService) => {
      let matchMediaListener: Function;

      spyOn(mediaQueryListPrototype, 'addListener')
        .and.callFake((serviceListener: Function) => {
          matchMediaListener = serviceListener;
        }
      );

      mediaQueryService.init(
        SkyMediaQueryService.sm,
        undefined
      );

      // This shouldn't throw an error.
      matchMediaListener({
        matches: true
      });
    })
  );
});
