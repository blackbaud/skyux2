import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

describe('Action button', () => {
  it('should match previous action button screenshot', () => {
    SkyVisualTest.setupTest('/action-button')
    return SkyVisualTest.compareScreenshot({
        screenshotName: 'action-button',
        elementId: 'screenshot-action-button',
        checkAccessibility: true
      });
  });

  it('should match previous action button screenshot on small screens', () => {
    SkyVisualTest.setupTest('/action-button', 480)
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'action-button-small',
      elementId: 'screenshot-action-button',
      checkAccessibility: true
    });
  });
});
