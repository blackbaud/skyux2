describe('Checkbox', () => {
  'use strict';

  it('should match previous checkbox screenshot', () => {
    return browser
      .setupTest('/checkbox.html')
      .compareScreenshot({
        screenshotName: 'checkbox',
        selector: '#screenshot-checkbox',
        checkAccessibility: true
      });
  });
});
