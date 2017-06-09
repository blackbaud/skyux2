import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

describe('Label', () => {

  it('should match previous label screenshot', () => {
    SkyVisualTest.setupTest('/label');
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'labels-all',
      selector: '#screenshot-label',
      checkAccessibility: true
    });
  });
});
