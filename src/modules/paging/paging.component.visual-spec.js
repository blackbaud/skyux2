describe('paging component', function () {
  'use strict';

  it('should display first page selected', function () {
    return browser
      .setupTest('/paging.html')
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'paging_first',
        selector: '#screenshot-paging'
      });
  });

  it('should display middle page selected', function () {
    return browser
      .setupTest('/paging.html')
      .pause(1000)
      .click('a[sky-cmp-id="next"]')
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'paging_middle',
        selector: '#screenshot-paging'
      });
  });
});
