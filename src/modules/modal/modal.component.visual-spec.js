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

  it('should match previous modal screenshot on small screens', function () {
    return browser
      .setupTest('/modal.html', 480)
      .click('.sky-btn-primary')
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'modal_small',
        selector: '.sky-modal',
        checkAccessibility: true
      });
  });

  it('should match previous large modal screenshot', function () {
    return browser
      .setupTest('/modal.html')
      .click('.sky-test-large-modal')
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'modal_large',
        selector: '.sky-modal',
        checkAccessibility: true
      });
  });
});
