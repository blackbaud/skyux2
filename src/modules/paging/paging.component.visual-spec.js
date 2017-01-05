describe('paging component', function () {
  'use strict';

  it('should display first page selected', function () {
    return browser
      .setupTest('/paging.html')
      .compareScreenshot({
        screenshotName: 'paging-first',
        selector: '#screenshot-paging'
      });
  });

  it('should display middle page selected', function () {
    return browser
      .setupTest('/paging.html')
      .click('a[sky-cmp-id="next"]')
      .compareScreenshot({
        screenshotName: 'paging-middle',
        selector: '#screenshot-paging'
      });
  });

  it('should display middle next page selected', function () {
    return browser
      .setupTest('/paging.html')
      .click('a[sky-cmp-id="next"]')
      .click('a[sky-cmp-id="next"]')
      .compareScreenshot({
        screenshotName: 'paging-middle-next',
        selector: '#screenshot-paging'
      });
  });

  it('should display last page selected', function () {
    return browser
      .setupTest('/paging.html')
      .click('a[sky-cmp-id="next"]')
      .click('a[sky-cmp-id="next"]')
      .click('a[sky-cmp-id="next"]')
      .compareScreenshot({
        screenshotName: 'paging-last',
        selector: '#screenshot-paging'
      });
  });
});
