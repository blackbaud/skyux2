describe('list-paging component', function () {
  'use strict';

  it('should display first page selected', function () {
    return browser
      .setupTest('/list-paging.html')
      .compareScreenshot({
        screenshotName: 'list-paging-first',
        selector: '#screenshot-list-paging'
      });
  });

  it('should display middle page selected', function () {
    return browser
      .setupTest('/list-paging.html')
      .click('a[cmp-id="next"]')
      .compareScreenshot({
        screenshotName: 'list-paging-middle',
        selector: '#screenshot-list-paging'
      });
  });

  it('should display middle next page selected', function () {
    return browser
      .setupTest('/list-paging.html')
      .click('a[cmp-id="next"]')
      .click('a[cmp-id="next"]')
      .compareScreenshot({
        screenshotName: 'list-paging-middle-next',
        selector: '#screenshot-list-paging'
      });
  });

  it('should display last page selected', function () {
    return browser
      .setupTest('/list-paging.html')
      .click('a[cmp-id="next"]')
      .click('a[cmp-id="next"]')
      .click('a[cmp-id="next"]')
      .compareScreenshot({
        screenshotName: 'list-paging-last',
        selector: '#screenshot-list-paging'
      });
  });
});
