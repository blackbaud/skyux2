describe('Checkbox', function () {
  'use strict';

  it('should match previous checkbox screenshot', function () {
    return browser
      .setupTest('/checkbox.html')
      .compareScreenshot({
        screenshotName: 'checkbox',
        selector: '#screenshot-checkbox',
        checkAccessibility: true
      });
  });
});
