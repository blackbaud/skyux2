describe('list-view-checklist component', function () {
  'use strict';

  it('should display checklist view', function () {
    return browser
      .setupTest('/list-view-checklist.html')
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'list-view-checklist',
        selector: '#screenshot-list-view-checklist'
      });
  });

  it('should display checklist view with checked', function () {
    return browser
      .setupTest('/list-view-checklist.html')
      .click('sky-checkbox')
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'list-view-checklist-checked',
        selector: '#screenshot-list-view-checklist'
      });
  });
});
