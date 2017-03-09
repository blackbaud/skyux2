describe('list-view-checklist component', function () {
  'use strict';

  it('should display checklist view', function () {
    return browser
      .setupTest('/list-view-checklist.html')
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'list_view_checklist',
        selector: '#screenshot-list-view-checklist'
      });
  });

  it('should display checklist view with checked', function () {
    return browser
      .setupTest('/list-view-checklist.html')
      .pause(1000)
      .click('sky-checkbox')
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'list_view_checklist_checked',
        selector: '#screenshot-list-view-checklist'
      });
  });
});
