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
});
