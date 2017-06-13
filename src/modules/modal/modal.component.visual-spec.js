describe('Modal', function () {
  'use strict';

  it('should match previous modal screenshot', function () {
    return browser
      .setupTest('/modal.html')
      .click('.sky-btn-primary')
      .moveCursorOffScreen()
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
      .moveCursorOffScreen()
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
      .moveCursorOffScreen()
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'modal_large',
        selector: '.sky-modal',
        checkAccessibility: true
      });
  });

  it('should match previous large modal screenshot on mobile', function () {
    return browser
      .setupTest('/modal.html', 480)
      .click('.sky-test-large-modal')
      .moveCursorOffScreen()
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'modal_large_mobile',
        selector: '.sky-modal',
        checkAccessibility: true
      });
  });

  it('should match previous screenshot of modal without header or footer', function () {
    return browser
      .setupTest('/modal.html')
      .click('.sky-test-content-only')
      .moveCursorOffScreen()
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'modal_content_only',
        selector: '.sky-modal',
        checkAccessibility: true
      });
  });

  it('should match previous small size modal screenshot', function () {
    return browser
      .setupTest('/modal.html')
      .click('.sky-test-small-size-modal')
      .moveCursorOffScreen()
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'modal_small_size',
        selector: '.sky-modal',
        checkAccessibility: true
      });
  });

  it('should match previous medium size modal screenshot', function () {
    return browser
      .setupTest('/modal.html')
      .click('.sky-test-medium-size-modal')
      .moveCursorOffScreen()
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'modal_medium_size',
        selector: '.sky-modal',
        checkAccessibility: true
      });
  });

  it('should match previous large size modal screenshot', function () {
    return browser
      .setupTest('/modal.html')
      .click('.sky-test-large-size-modal')
      .moveCursorOffScreen()
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'modal_large_size',
        selector: '.sky-modal',
        checkAccessibility: true
      });
  });
});
