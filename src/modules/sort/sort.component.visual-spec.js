describe('Sort component', function () {
  'use strict';

  it('should match the baseline sort screenshot', function () {
    return browser
      .setupTest('/sort.html')
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'sort',
        selector: '#screenshot-sort-full',
        checkAccessibility: true
      });
  });

  it('should match the baseline sort screenshot when dropdown is open', function () {
    return browser
      .setupTest('/sort.html')
      .pause(1000)
      .click('button')
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'sort_open',
        selector: '#screenshot-sort-full',
        checkAccessibility: true
      });
  });

});
