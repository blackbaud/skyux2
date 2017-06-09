import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

describe('Checkbox', () => {

  it('should match previous checkbox screenshot', () => {
    SkyVisualTest.setupTest('/checkbox')
    return SkyVisualTest.compareScreenshot({
        screenshotName: 'checkbox',
        selector: '#screenshot-checkbox',
        checkAccessibility: true
      });
  });
});
