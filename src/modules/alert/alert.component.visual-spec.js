describe('Alert', function () {
  'use strict';

  it('should match previous alert screenshot', function () {
    console.log('in alert code');
    return browser
      .setupTest('/alert.html')
      .compareScreenshot({
        screenshotName: 'alert',
        selector: '#screenshot-alert',
        checkAccessibility: true
      });
  });
});
