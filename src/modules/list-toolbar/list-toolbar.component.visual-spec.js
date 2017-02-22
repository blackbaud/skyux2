describe('list-toolbar component', function () {
  'use strict';

  it('should display toolbar with secondary actions', function () {
    return browser
      .setupTest('/list-toolbar.html')
      .pause(1000)
      .click('.sky-list-toolbar-secondary-actions .sky-dropdown-button')
      .compareScreenshot({
        screenshotName: 'list_toolbar_secondary',
        selector: '#screenshot-list-toolbar-secondary',
        checkAccessibility: true
      });
  });
});
