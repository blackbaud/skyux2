describe('Toolbar', function () {
  'use strict';

  it('should match previous toolbar screenshot', function () {
    return browser
      .setupTest('/toolbar.html')
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'toolbar',
        selector: '#screenshot-toolbar',
        checkAccessibility: true
      });
  });

  it('should match previous toolbar screenshot with sections', function () {
    return browser
      .setupTest('/toolbar.html')
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'toolbar_section',
        selector: '#screenshot-toolbar-sectioned',
        checkAccessibility: true
      });
  });
});
