describe('Toolbar', function () {
  'use strict';

  it('should match previous toolbar screenshot', function () {
    return browser
      .setupTest('/toolbar.html')
      .compareScreenshot({
        screenshotName: 'toolbar',
        selector: '#screenshot-toolbar',
        checkAccessibility: true
      });
  });

  it('should match previous toolbar screenshot with dark theme and sections', function () {
    return browser
      .setupTest('/toolbar.html')
      .compareScreenshot({
        screenshotName: 'toolbar_dark',
        selector: '#screenshot-toolbar-dark',
        checkAccessibility: true
      });
  });
});
