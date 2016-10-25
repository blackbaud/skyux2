describe('Label', function () {
  'use strict';

  it('should match previous label screenshot', function () {
    return browser
      .setupTest('/label.html')
      .compareScreenshot({
        screenshotName: 'labels-all',
        selector: '#screenshot-label',
        checkAccessibility: true
      });
  });
});
