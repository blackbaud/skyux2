describe('Error', function () {
  'use strict';

  it('should match previous screenshot for broken type', function () {
    return browser
      .setupTest('/error.html')
      .compareScreenshot({
        screenshotName: 'error-images',
        selector: '#screenshot-error-img',
        checkAccessibility: true
      });
  });
});
