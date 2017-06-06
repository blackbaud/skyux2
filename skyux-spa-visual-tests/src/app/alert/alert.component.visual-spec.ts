import { SkyHostBrowser } from '@blackbaud/skyux-builder/runtime/testing/e2e';

describe('Alert', () => {
  'use strict';

  it('should match previous alert screenshot', function () {
    SkyHostBrowser.get('/alert');
  });
});
