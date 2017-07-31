import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

describe('TextHighlight', () => {

  it('should match previous text highlight screenshot', () => {
    return SkyVisualTest.setupTest('text-highlight')
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'text-highlight-normal-screenshot',
          selector: '#text-highlight-normal'
        });
      });
  });

  it('should match previous text highlight screenshot when term is blank', () => {
    return SkyVisualTest.setupTest('text-highlight')
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'text-highlight-blank-screenshot',
          selector: '#text-highlight-blank'
        });
      });
  });

  it('should match previous text highlight screenshot when term is not matched', () => {
    return SkyVisualTest.setupTest('text-highlight')
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'text-highlight-no-match-screenshot',
          selector: '#text-highlight-no-match'
        });
      });
  });
});
