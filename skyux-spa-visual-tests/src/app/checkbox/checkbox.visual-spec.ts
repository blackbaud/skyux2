import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

describe('Checkbox', () => {

  it('should match previous checkbox screenshot', () => {
    return SkyVisualTest.setupTest('checkbox')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'checkbox',
        selector: '#screenshot-checkbox'
      });
    });

  });
});
