describe('grid component', function () {
  'use strict';

  it('should display grid', function () {
    return browser
      .setupTest('/grid.html')
      .compareScreenshot({
        screenshotName: 'grid',
        selector: '#screenshot-grid',
        checkAccessibility: true
      });
  });
});
