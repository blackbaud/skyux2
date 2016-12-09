describe('TabSet', function () {
  'use strict';

  it('should match previous tabset screenshot', function () {
    return browser
      .setupTest('/tabs.html')
      .compareScreenshot({
        screenshotName: 'tabset',
        selector: '#screenshot-tabset'
      });
  });

  it('should match the tabset screenshot with wizard styling', function () {
    return browser
      .setupTest('/tabs.html')
      .click('.sky-test-show-wizard')
      .compareScreenshot({
        screenshotName: 'tabset-wizard',
        selector: '#screenshot-tabset'
      });
  });

  it('should match previous mobile tabset screenshot', function () {
    return browser
      .setupTest('/tabs.html', 480)
      .compareScreenshot({
        screenshotName: 'tabset-collapsed',
        selector: '#screenshot-tabset'
      });
  });

  it('should match previous mobile dropdown tabset screenshot', function () {
    return browser
      .setupTest('/tabs.html', 480)
      .waitForVisible('#screenshot-tabset button.sky-dropdown-button-type-tab')
      .click('#screenshot-tabset button.sky-dropdown-button-type-tab')
      .compareScreenshot({
        screenshotName: 'tabset-collapsed-dropdown',
        selector: '#screenshot-tabset'
      });
  });

});
