import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

describe('KeyInfo', () => {

  it('should match previous key-info screenshot', () => {
    SkyVisualTest.setupTest('/key-info');
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'key-info',
      selector: '#screenshot-key-info',
      checkAccessibility: true
    });
  });

});
