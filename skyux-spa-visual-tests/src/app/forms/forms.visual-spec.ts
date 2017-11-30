import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

describe('Forms', () => {

  it('should match previous screenshot for required label', () => {
    return SkyVisualTest.setupTest('forms')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'label-required',
        selector: '#screenshot-required-label'
      });
    });
  });
});
