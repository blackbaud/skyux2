import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

describe('Toolbar', () => {

  it('should match previous toolbar screenshot', () => {
    return SkyVisualTest.setupTest('toolbar')
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'toolbar',
          selector: '#screenshot-toolbar'
        });
      });
  });

  it('should match previous toolbar screenshot with sections', () => {
    return SkyVisualTest.setupTest('toolbar')
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'toolbar-section',
          selector: '#screenshot-toolbar-sectioned'
        });
      });
  });
});
