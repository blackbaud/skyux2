import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

describe('Radio component', () => {

  it('should match the radio input', () => {
    return SkyVisualTest.setupTest('radio')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'radio',
        selector: '#screenshot-radio'
      });
    });
  });

  it('should match the icon radio input', () => {
    return SkyVisualTest.setupTest('radio')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'icon-radio',
        selector: '#screenshot-icon-radio'
      });
    });
  });
});
