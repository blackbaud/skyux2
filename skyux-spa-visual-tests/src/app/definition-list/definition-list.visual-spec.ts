import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

describe('Definition list', () => {

  it('should match definition list screenshot with default settings', () => {
    return SkyVisualTest.setupTest('definition-list')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'definition-list-defaults',
        selector: '#screenshot-definition-list-1'
      });
    });

  });

  it('should match definition list screenshot with custom settings', () => {
    return SkyVisualTest.setupTest('definition-list')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'definition-list-overrides',
        selector: '#screenshot-definition-list-2'
      });
    });

  });

  it('should match definition list screenshot with long text', () => {
    return SkyVisualTest
      .setupTest('definition-list')
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'definition-list-long-text',
          selector: '#screenshot-definition-list-3'
        });
      });
  });

});
