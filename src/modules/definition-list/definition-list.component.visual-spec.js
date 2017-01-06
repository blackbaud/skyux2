describe('Definition list', function () {
  'use strict';

  it('should match definition list screenshot with default settings', function () {
    return browser
      .setupTest('/definition-list.html')
      .compareScreenshot({
        screenshotName: 'definition-list-defaults',
        selector: '#screenshot-definition-list-1'
      });
  });

  it('should match definition list screenshot with custom settings', function () {
    return browser
      .setupTest('/definition-list.html')
      .compareScreenshot({
        screenshotName: 'definition-list-overrides',
        selector: '#screenshot-definition-list-2'
      });
  });

});
