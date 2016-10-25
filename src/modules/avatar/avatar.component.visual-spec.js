describe('Avatar', function () {
  'use strict';

  it('should match previous screenshot when image is present', function () {
    return browser
      .setupTest('/avatar.html')
      .compareScreenshot({
        screenshotName: 'avatar-image',
        selector: '#screenshot-avatar-img',
        checkAccessibility: true
      });
  });

  it('should match previous screenshot when initials are present', function () {
    return browser
      .setupTest('/avatar.html')
      .compareScreenshot({
        screenshotName: 'avatar-initials',
        selector: '#screenshot-avatar-initials',
        checkAccessibility: true
      });
  });
});
