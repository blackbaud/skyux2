import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

describe('icon', () => {
  it('should show the icon', () => {
    return SkyVisualTest
      .setupTest('icon')
      .then(() => {
        SkyVisualTest.moveCursorOffScreen();
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'icon',
          selector: '#screenshot-icon'
        });
      });
  });
});