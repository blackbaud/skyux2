describe('Alert', () => {
  'use strict';

  it('should match previous alert screenshot', () => {
    return browser
      .setupTest('/alert.html')
      .compareScreenshot({
        screenshotName: 'alert',
        selector: '#screenshot-alert',
        checkAccessibility: true
      });
  });
});
