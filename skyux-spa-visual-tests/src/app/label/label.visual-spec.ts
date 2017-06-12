import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

describe('Label', () => {

  it('should match previous label screenshot', () => {
    return SkyVisualTest.setupTest('label')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'labels-all',
        selector: '#screenshot-label',
        checkAccessibility: true
      });
    });

  });
});
