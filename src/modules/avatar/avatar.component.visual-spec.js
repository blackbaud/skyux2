describe('Avatar', () => {
  'use strict';

  it('should match previous screenshot when image is present', () => {
    return browser
      .setupTest('/avatar.html')
      .compareScreenshot({
        screenshotName: 'avatar-image',
        selector: '#screenshot-avatar-img',
        checkAccessibility: true
      });
  });

  it('should match previous screenshot when initials are present', () => {
    return browser
      .setupTest('/avatar.html')
      .compareScreenshot({
        screenshotName: 'avatar-initials',
        selector: '#screenshot-avatar-initials',
        checkAccessibility: true
      });
  });
});
