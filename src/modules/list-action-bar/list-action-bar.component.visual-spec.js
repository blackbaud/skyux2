describe('list-action-bar component', function () {
  'use strict';

  it('should display action bar', function () {
    return browser
      .setupTest('/list-action-bar.html')
      .compareScreenshot({
        screenshotName: 'list-action-bar',
        selector: '#screenshot-list-action-bar'
      });
  });
});
