describe('Modal', function () {
  'use strict';

  it('should match previous modal screenshot', function () {
    return browser
      .setupTest('/modal.html')
      .click('.sky-btn-primary')
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'modal',
        selector: '.sky-modal',
        checkAccessibility: true
      });
  });
});
