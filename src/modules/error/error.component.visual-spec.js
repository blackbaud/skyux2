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

  it('should match previous error modal form screenshot', function () {
    return browser
      .setupTest('/error.html')
      .click('.sky-test-error-modal')
      .moveCursorOffScreen()
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'error-modal-form',
        selector: '.sky-modal',
        checkAccessibility: true
      });
  });
});
