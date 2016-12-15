describe('list-view-grid component', function () {
  'use strict';

  it('should display grid view', function () {
    return browser
      .setupTest('/list-view-grid.html')
      .compareScreenshot({
        screenshotName: 'list-view-grid',
        selector: '#screenshot-list-view-grid'
      });
  });

  it('should display grid view checked', function () {
    return browser
      .setupTest('/list-view-grid.html')
      .click('th[cmp-id="select-header"] sky-checkbox')
      .compareScreenshot({
        screenshotName: 'list-view-grid-checked',
        selector: '#screenshot-list-view-grid'
      });
  });

  it('should display sort asc icon for column', function () {
    return browser
      .setupTest('/list-view-grid.html')
      .click('th[cmp-id="column1"]')
      .compareScreenshot({
        screenshotName: 'list-view-grid-asc',
        selector: '#screenshot-list-view-grid'
      });
  });

  it('should display sort desc icon for column', function () {
    return browser
      .setupTest('/list-view-grid.html')
      .click('th[cmp-id="column1"]')
      .click('th[cmp-id="column1"]')
      .compareScreenshot({
        screenshotName: 'list-view-grid-desc',
        selector: '#screenshot-list-view-grid'
      });
  });
});
