import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

describe('Sectioned form', () => {
  it('should match previous sectioned form screenshot', () => {
    return SkyVisualTest.setupTest('sectioned-form')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'sectioned-form',
        selector: '#screenshot-sectioned-form'
      });
    });
  });
});
