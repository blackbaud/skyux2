import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

describe('Chevron', () => {

  it('should match previous chevron screenshot', () => {
    SkyVisualTest.setupTest('/chevron')
    return SkyVisualTest.compareScreenshot({
        screenshotName: 'chevron',
        selector: '#screenshot-chevron',
        checkAccessibility: true
      });
  });
});
