import {
  addProviders,
  inject
} from '@angular/core/testing';

import { SkyLogService } from './log.service';

describe('Log service', () => {
  beforeEach(() => {
    addProviders([SkyLogService]);
  });

  it(
    'should log warnings to the console',
    inject([SkyLogService], (logService: SkyLogService) => {
      let warnSpy = spyOn(window.console, 'warn');

      logService.warn('This is the message', 'an optional parameter');

      expect(warnSpy).toHaveBeenCalledWith('This is the message', 'an optional parameter');
    })
  );
});
