import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

describe('Avatar', () => {

  it('should match previous screenshot when image is present', () => {
    SkyVisualTest.setupTest('/avatar');
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'avatar-image',
      elementId: 'screenshot-avatar-img',
      checkAccessibility: true
    });
  });

  it('should match previous screenshot when initials are present', function () {
    SkyVisualTest.setupTest('/avatar');
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'avatar-initials',
      elementId: 'screenshot-avatar-initials',
      checkAccessibility: true
    });
  });
});
