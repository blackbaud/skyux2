describe('Chevron', function () {
  'use strict';

  it('should match previous chevron screenshot', function () {
    return browser
      .setupTest('/chevron.html')
      .compareScreenshot({
        screenshotName: 'chevron',
        selector: '#screenshot-chevron',
        checkAccessibility: true
      });
  });
});
