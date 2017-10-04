import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { element, by } from 'protractor';

describe('Error', () => {

  it('should match previous screenshot for broken type', () => {
    return SkyVisualTest.setupTest('error')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'error-images',
        selector: '#screenshot-error-img',
        checkAccessibility: true
      });
    });

  });

  it('should match previous error modal form screenshot', () => {
    return SkyVisualTest.setupTest('error')
      .then(() => element(by.css('.sky-test-error-modal')).click() as any)
      .then(() => {
        SkyVisualTest.moveCursorOffScreen();
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'error-modal-form',
          selector: '.sky-modal',
          checkAccessibility: true
        });
      })
      .then(() => element(by.css('.sky-error-modal-close .sky-btn-primary')).click() as any);
  });

  it('should match previous error modal with long description form screenshot', () => {
    return SkyVisualTest.setupTest('error')
      .then(() => element(by.css('.sky-test-error-modal-long-description')).click() as any)
      .then(() => {
        SkyVisualTest.moveCursorOffScreen();
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'error-modal-form-long-description',
          selector: '.sky-modal',
          checkAccessibility: true
        });
      })
      .then(() => element(by.css('.sky-error-modal-close .sky-btn-primary')).click() as any);

  });
});
