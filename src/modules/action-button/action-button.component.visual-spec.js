describe('Actionbutton', function () {
  'use strict';

  it('should match previous action button screenshot', function () {
    return browser
      .setupTest('/action-button.html')
      .waitForVisible('.sky-action-button')
      .compareScreenshot({
        screenshotName: 'action-button',
        selector: '#screenshot-action-button',
        checkAccessibility: true
      });
  });

  it('should match previous action-button screenshot on small screens', function () {
    return browser
      .setupTest('/action-button.html', 480)
      .waitForVisible('.sky-action-button')
      .compareScreenshot({
        screenshotName: 'action-button-small',
        selector: '#screenshot-action-button',
        checkAccessibility: true
      });
  });
});
