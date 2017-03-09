describe('grid component', function () {
  'use strict';

  it('should display grid', function () {
    return browser
      .setupTest('/grid.html')
      .compareScreenshot({
        screenshotName: 'grid',
        selector: '#screenshot-grid',
        checkAccessibility: true
      });
  });

  it('should display grid with descending sort indication', function () {
    return browser
      .setupTest('/grid.html')
      .click('th')
      .compareScreenshot({
        screenshotName: 'grid_sort_desc',
        selector: '#screenshot-grid',
        checkAccessibility: true
      });
  });

  it('should display grid with ascending sort indication', function () {
    return browser
      .setupTest('/grid.html')
      .click('th')
      .click('th')
      .compareScreenshot({
        screenshotName: 'grid_sort_asc',
        selector: '#screenshot-grid',
        checkAccessibility: true
      });
  });
});
