describe('Alert', function () {
  'use strict';

  it('should match previous alert screenshot', function () {
    return browser
      .setupTest('/alert.html')
      .waitForVisible('.sky-alert')
      .compareScreenshot({
        screenshotName: 'alert',
        selector: '#screenshot-alert',
        checkAccessibility: true
      });
  });
});
