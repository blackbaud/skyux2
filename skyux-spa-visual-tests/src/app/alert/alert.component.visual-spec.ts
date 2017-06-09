import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

describe('Alert', () => {

  it('should match previous alert screenshot', () => {
    SkyVisualTest.setupTest('/alert');
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'alert',
      selector: '#screenshot-alert',
      checkAccessibility: true
    });
  });
});
