import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

describe('Radio component', () => {

  it('should match the radio input', () => {
    SkyVisualTest.setupTest('/radio');
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'radio',
      selector: '#screenshot-radio'
    });
  });
});
