import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

describe('Avatar', () => {

  it('should match previous screenshot when image is present', () => {
    return SkyVisualTest
      .setupTest('avatar')
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'avatar-image',
          selector: '#screenshot-avatar-img'
        });
      });

  });

  it('should match previous screenshot when initials are present', () => {
    return SkyVisualTest
      .setupTest('avatar')
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'avatar-initials',
          selector: '#screenshot-avatar-initials'
        });
      });

  });
});
