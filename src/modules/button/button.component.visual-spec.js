describe('Button', function () {
  'use strict';

  it('should match previous button link screenshot on hover', function () {
    return browser
      .setupTest('/button.html')
      .moveToObject('#screenshot-button-link .sky-btn')
      .compareScreenshot({
        screenshotName: 'button_link_hover',
        selector: '#screenshot-button-link',
        checkAccessibility: true
      });
  });

  it('should match previous button link inline screenshot on hover', function () {
    return browser
      .setupTest('/button.html')
      .moveToObject('#screenshot-button-link-inline .sky-btn')
      .compareScreenshot({
        screenshotName: 'button_link_inline_hover',
        selector: '#screenshot-button-link-inline',
        checkAccessibility: true
      });
  });
});
