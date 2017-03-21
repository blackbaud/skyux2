describe('Button', function () {
  'use strict';

  it('should match previous button link screenshot on hover', function () {
    return browser
      .setupTest('/button.html')
      .moveToObject('.sky-btn')
      .compareScreenshot({
        screenshotName: 'button_link_hover',
        selector: '#screenshot-button-link',
        checkAccessibility: true
      });
  });
});
