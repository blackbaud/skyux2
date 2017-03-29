describe('Filter', function () {
  'use strict';

  it('should match previous screenshot for filter button', function () {
    return browser
      .setupTest('/filter.html')
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'filter_button',
        selector: '#screenshot-filter-button',
        checkAccessibility: true
      });
  });

  it('should match previous screenshot for active filter button', function () {
    return browser
      .setupTest('/filter.html')
      .pause(1000)
      .click('.sky-btn-default')
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'filter_button_active',
        selector: '#screenshot-filter-button',
        checkAccessibility: true
      });
  });

  it('should match previous screenshot for filter summary', function () {
    return browser
      .setupTest('/filter.html')
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'filter_summary',
        selector: '#screenshot-filter-summary',
        checkAccessibility: true
      });
  });

  it('should match previous screenshot for filter inline', function () {
    return browser
      .setupTest('/filter.html')
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'filter_inline',
        selector: '#screenshot-filter-inline',
        checkAccessibility: true
      });
  });
});
