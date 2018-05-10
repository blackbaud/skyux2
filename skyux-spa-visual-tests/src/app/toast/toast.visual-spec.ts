import {
  SkyVisualTest
} from '../../../config/utils/visual-test-commands';

import {
  by,
  element
} from 'protractor';

describe('Toast', () => {
  it('should match previous toast screenshot', () => {
    return SkyVisualTest.setupTest('toast')
      .then(() => {
        element(by.css('.sky-btn-primary')).click();
        SkyVisualTest.moveCursorOffScreen();
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'toast',
          selector: '.sky-toaster'
        });
      });
  });

  it('should match previous templated toast screenshot', () => {
    return SkyVisualTest.setupTest('toast')
      .then(() => {
        element(by.css('.sky-btn-secondary')).click();
        SkyVisualTest.moveCursorOffScreen();
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'toast-component',
          selector: '.sky-toaster'
        });
      });
  });

  it('should match previous toast screenshot on tiny screens', () => {
    return SkyVisualTest.setupTest('toast', 480)
      .then(() => {
        element(by.css('.sky-btn-primary')).click();
        SkyVisualTest.moveCursorOffScreen();
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'toast-xs',
          selector: '.sky-toaster'
        });
      });
  });

  it('should match previous templated toast screenshot on tiny screens', () => {
    return SkyVisualTest.setupTest('toast', 480)
      .then(() => {
        element(by.css('.sky-btn-secondary')).click();
        SkyVisualTest.moveCursorOffScreen();
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'toast-component-xs',
          selector: '.sky-toaster'
        });
      });
  });
});
