import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

describe('Sectioned modal', () => {

  it('should match previous sectioned modal screenshot', () => {
    return SkyVisualTest.setupTest('vertical-tabs')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'vertical-tabset',
        selector: '#screenshot-vertical-tabset'
      });
    });
  });
});
