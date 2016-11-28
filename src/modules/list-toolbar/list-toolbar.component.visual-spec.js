describe('list-toolbar component', function () {
  'use strict';

  it('should display toolbar', function () {
    return browser
      .setupTest('/list-toolbar.html')
      .compareScreenshot({
        screenshotName: 'list-toolbar-all',
        selector: '#screenshot-list-toolbar-all'
      });
  });
});
