describe('search component', function () {
  'use strict';

  it('should match the baseline search screenshot', function () {
    return browser
      .setupTest('/search.html')
      .pause(2000)
      .compareScreenshot({
        screenshotName: 'search',
        selector: '#screenshot-search-full',
        checkAccessibility: true
      });
  });

  it('should match the baseline search screenshot on small screens', function () {
    return browser
      .setupTest('/search.html', 480)
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'search_small',
        selector: '#screenshot-search-full',
        checkAccessibility: true
      });
  });

  it('should match the baseline search screenshot on small screens when dismissable input is shown',
    function () {
    return browser
      .setupTest('/search.html', 480)
      .pause(1000)
      .click('.sky-search-btn-open')
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'search_small_dismissable',
        selector: '#screenshot-search-full',
        checkAccessibility: true
      });
  });

  it('should match the baseline search screenshot on small screens when search is applied',
    function () {
    return browser
      .setupTest('/search.html', 480)
      .pause(1000)
      .click('.sky-search-btn-open')
      .pause(1000)
      .setValue('.sky-search-input', 'Value')
      .click('.sky-search-btn-apply')
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'search_small_dismissable_applied',
        selector: '#screenshot-search-full',
        checkAccessibility: true
      });
  });

  it('should match the baseline screenshot on small screens when search is applied and dismissed',
    function () {
    return browser
      .setupTest('/search.html', 480)
      .pause(1000)
      .click('.sky-search-btn-open')
      .pause(1000)
      .setValue('.sky-search-input', 'Value')
      .click('.sky-search-btn-apply')
      .pause(1000)
      .click('.sky-search-btn-dismiss')
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'search_small_applied',
        selector: '#screenshot-search-full',
        checkAccessibility: true
      });
  });

});
