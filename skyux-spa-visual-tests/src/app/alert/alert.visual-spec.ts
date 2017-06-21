import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

describe('Alert', () => {

  it('should match previous alert screenshot', () => {
    return SkyVisualTest
      .setupTest('alert')
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'alert',
          selector: '#screenshot-alert',
          checkAccessibility: true
        });
      });

  });
});
