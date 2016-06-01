import { provide } from '@angular/core';
import {
  beforeEachProviders,
  describe,
  expect,
  inject,
  it
} from '@angular/core/testing';

import { SkyLogService } from './log.service';

describe('Log service', () => {
  let mockWindow = {
    console: {
      warn: () => {

      }
    }
  };

  beforeEachProviders(() => [
    provide(Window, {useValue: mockWindow}),
    SkyLogService
  ]);

  it(
    'should log warnings to the console',
    inject([SkyLogService], (logService: SkyLogService) => {
      let warnSpy = spyOn(mockWindow.console, 'warn');

      logService.warn('This is the message', 'an optional parameter');

      expect(warnSpy).toHaveBeenCalledWith('This is the message', 'an optional parameter');
    })
  );

  it(
    'should sanity check the existence of console when warn() is called',
    inject([SkyLogService], (logService: SkyLogService) => {
      mockWindow.console = undefined;

      logService.warn('This is the message', 'an optional parameter');
    })
  );
});
