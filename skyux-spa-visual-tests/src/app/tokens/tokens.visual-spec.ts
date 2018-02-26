import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

describe('Tokens', () => {
  it('should match previous tokens screenshot', () => {
    return SkyVisualTest
      .setupTest('tokens')
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'tokens',
          selector: '#screenshot-tokens'
        });
      });
  });

  it('should match previous tokens screenshot on small screens', () => {
    return SkyVisualTest
      .setupTest('tokens', 480)
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'tokens-small',
          selector: '#screenshot-tokens'
        });
      });
  });
});
