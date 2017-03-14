describe('grid component', function () {
  'use strict';

  it('should display grid', function () {
    return browser
      .setupTest('/grid.html')
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'grid',
        selector: '#screenshot-grid',
        checkAccessibility: true
      });
  });

  it('should display grid with descending sort indication', function () {
    return browser
      .setupTest('/grid.html')
      .pause(1000)
      .click('th')
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'grid_sort_desc',
        selector: '#screenshot-grid',
        checkAccessibility: true
      });
  });

  it('should display grid with ascending sort indication', function () {
    return browser
      .setupTest('/grid.html')
      .pause(1000)
      .click('th')
      .pause(1000)
      .click('th')
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'grid_sort_asc',
        selector: '#screenshot-grid',
        checkAccessibility: true
      });
  });
});
