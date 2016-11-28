describe('list-paging component', function () {
  'use strict';

  it('should display flat paging control - first page', function () {
    return browser
      .setupTest('/list-paging-default.html')
      .compareScreenshot({
        screenshotName: 'list-paging-flat',
        selector: '#screenshot-list-paging-flat'
      });
  });

  it('should display flat paging control - middle page', function () {
    return browser
      .setupTest('/list-paging-default.html')
      .compareScreenshot({
        screenshotName: 'list-paging-flat-middle',
        selector: '#screenshot-list-paging-flat-middle'
      });
  });

  it('should display flat paging control - last page', function () {
    return browser
      .setupTest('/list-paging-default.html')
      .compareScreenshot({
        screenshotName: 'list-paging-fla-last',
        selector: '#screenshot-list-paging-flat-last'
      });
  });

  it('should display condensed paging control - first page', function () {
    return browser
      .setupTest('/list-paging-default.html')
      .compareScreenshot({
        screenshotName: 'list-paging-condensed',
        selector: '#screenshot-list-paging-condensed'
      });
  });

  it('should display the list paging control - middle page', function () {
    return browser
      .setupTest('/list-paging-default.html')
      .compareScreenshot({
        screenshotName: 'list-paging-condensed-middle',
        selector: '#screenshot-list-paging-condensed-middle'
      });
  });

  it('should display the list paging control - last page', function () {
    return browser
      .setupTest('/list-paging-default.html')
      .compareScreenshot({
        screenshotName: 'list-paging-condensed-last',
        selector: '#screenshot-list-paging-condensed-last'
      });
  });
});
