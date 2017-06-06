import { SkyHostBrowser } from '@blackbaud/skyux-builder/runtime/testing/e2e';
import { element, by, browser} from 'protractor';

describe('Alert', () => {
  'use strict';

  it('should match previous alert screenshot', function () {
    SkyHostBrowser.get('/alert');
    (browser as any).pixDiff.checkRegion(element(by.id('screenshot-alert')), 'alert');
  });
});
