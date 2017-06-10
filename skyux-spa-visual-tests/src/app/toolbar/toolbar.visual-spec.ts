import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

describe('Toolbar', () => {

  it('should match previous toolbar screenshot', () => {
    SkyVisualTest.setupTest('/toolbar');
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'toolbar',
      selector: '#screenshot-toolbar',
      checkAccessibility: true
    });
  });

  it('should match previous toolbar screenshot with sections', () => {
    SkyVisualTest.setupTest('/toolbar');
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'toolbar-section',
      selector: '#screenshot-toolbar-sectioned',
      checkAccessibility: true
    });
  });
});

