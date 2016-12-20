describe('list component', function () {
  'use strict';

  it('should display list', function () {
    return browser
      .setupTest('/list.html')
      .compareScreenshot({
        screenshotName: 'list',
        selector: '#screenshot-list'
      })
  });

  it('should display column selector modal', function () {
    return browser
      .setupTest('/list.html')
      .click('sky-list-toolbar-item-renderer[cmp-id="column-selector"] button')
      .compareScreenshot({
        screenshotName: 'list-column-selector',
        selector: '#screenshot-list'
      })
  });

  it('should display sort selector', function () {
    return browser
      .setupTest('/list.html')
      .click('sky-list-toolbar-item-renderer[cmp-id="sort-selector"] button')
      .compareScreenshot({
        screenshotName: 'list-sort-selector',
        selector: '#screenshot-list'
      })
  });

  it('should display view selector', function () {
    return browser
      .setupTest('/list.html')
      .click('sky-list-toolbar-item-renderer[cmp-id="view-selector"] button')
      .compareScreenshot({
        screenshotName: 'list-view-selector',
        selector: '#screenshot-list'
      })
  });

  it('should display inline filter', function () {
    return browser
      .setupTest('/list.html')
      .click('button[cmp-id="filter"]')
      .compareScreenshot({
        screenshotName: 'list-filter-inline',
        selector: '#screenshot-list'
      })
  });

  it('should display show more filter modal', function () {
    return browser
      .setupTest('/list.html')
      .click('button[cmp-id="filter"]')
      .click('button[cmp-id="filter-show-more"]')
      .compareScreenshot({
        screenshotName: 'list-filter-modal',
        selector: '#screenshot-list'
      })
  });
});
