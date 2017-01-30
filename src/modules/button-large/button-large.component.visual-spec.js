describe('Button large', function () {
  'use strict';

  it('should match previous button large screenshot', function () {
    return browser
      .setupTest('/button-large.html')
      .compareScreenshot({
        screenshotName: 'button_large',
        selector: '#screenshot-button-large',
        checkAccessibility: true
      });
  });

  it('should match previous button large screenshot on small screens', function () {
    return browser
      .setupTest('/button-large.html', 480)
      .compareScreenshot({
        screenshotName: 'button_large_small',
        selector: '#screenshot-button-large',
        checkAccessibility: true
      });
  });
});
