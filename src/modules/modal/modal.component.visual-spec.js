describe('Modal', function () {
  'use strict';

  it('should match previous modal screenshot', function () {
    return browser
      .setupTest('/modal.html')
      .compareScreenshot({
        screenshotName: 'modal',
        selector: '#screenshot-modal',
        checkAccessibility: true
      });
  });
});
