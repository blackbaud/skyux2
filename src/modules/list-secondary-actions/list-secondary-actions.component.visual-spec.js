describe('list-secondary-actions component', function () {
  'use strict';

  it('should display toolbar with secondary actions', function () {
    return browser
      .setupTest('/list-secondary-actions.html')
      .pause(1000)
      .click('.sky-list-secondary-actions .sky-dropdown-button')
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'list_secondary_actions',
        selector: '#screenshot-list-secondary-actions',
        checkAccessibility: true
      });
  });
});
