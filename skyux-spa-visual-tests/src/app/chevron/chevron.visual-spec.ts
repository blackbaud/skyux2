import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

describe('Chevron', () => {

  it('should match previous chevron screenshot', () => {
    return SkyVisualTest.setupTest('chevron')
    .then(() => {
       return SkyVisualTest.compareScreenshot({
        screenshotName: 'chevron',
        selector: '#screenshot-chevron'
      });
    });

  });
});
