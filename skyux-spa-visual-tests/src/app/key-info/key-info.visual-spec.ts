import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

describe('KeyInfo', () => {

  it('should match previous key-info screenshot', () => {
    return SkyVisualTest.setupTest('key-info')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'key-info',
        selector: '#screenshot-key-info',
        checkAccessibility: true
      });
    });

  });

});
