describe('Chevron', () => {
  'use strict';

  it('should match previous chevron screenshot', () => {
    return browser
      .setupTest('/chevron.html')
      .compareScreenshot({
        screenshotName: 'chevron',
        selector: '#screenshot-chevron',
        checkAccessibility: true
      });
  });
});
