describe('list-view-repeater component', function () {
  'use strict';

  it('should display repeater view', function () {
    return browser
      .setupTest('/list-view-repeater.html')
      .compareScreenshot({
        screenshotName: 'list-view-repeater',
        selector: '#screenshot-list-view-repeater'
      });
  });

  it('should display expanded repeater list item', function () {
    return browser
      .setupTest('/list-view-repeater.html')
      .click('sky-chevron button')
      .compareScreenshot({
        screenshotName: 'list-view-repeater-expanded',
        selector: '#screenshot-list-view-repeater'
      });
  });
});
