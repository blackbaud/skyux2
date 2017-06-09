import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

describe('Definition list', () => {

  it('should match definition list screenshot with default settings', () => {
    SkyVisualTest.setupTest('/definition-list');
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'definition-list-defaults',
      selector: '#screenshot-definition-list-1'
    });
  });

  it('should match definition list screenshot with custom settings', () => {
    SkyVisualTest.setupTest('/definition-list')
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'definition-list-overrides',
      selector: '#screenshot-definition-list-2'
    });
  });

});
