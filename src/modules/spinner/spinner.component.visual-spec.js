describe('spinner component', function () {
  'use strict';

  it('should display spinner', function () {
    return browser
      .setupTest('/spinner.html')
      .compareScreenshot({
        screenshotName: 'spinner',
        selector: '#screenshot-spinner'
      });
  });
});
