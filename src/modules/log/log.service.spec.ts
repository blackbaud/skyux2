import {
  describe,
  expect,
  it
} from '@angular/core/testing';

import { SkyLogService } from './log.service';

describe('Log service', () => {
  'use strict';

  it('should log warnings to the console', () => {
    let logService = new SkyLogService(window);
    let warnSpy = spyOn(console, 'warn');

    logService.warn('This is the message', 'an optional parameter');

    expect(warnSpy).toHaveBeenCalledWith('This is the message', 'an optional parameter');
  });
});
