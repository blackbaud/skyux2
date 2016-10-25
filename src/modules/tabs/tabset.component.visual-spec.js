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
      .click('#screenshot-tabset button.sky-dropdown-button-type-tab')
      .compareScreenshot({
        screenshotName: 'tabset-collapsed-dropdown',
        selector: '#screenshot-tabset'
      });
  });

});
