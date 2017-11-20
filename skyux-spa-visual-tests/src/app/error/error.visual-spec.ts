import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { element, by } from 'protractor';

describe('Error', () => {
  it('should match previous screenshot for broken type', () => {
    return SkyVisualTest
      .setupTest('error')
      .then(() => {
        SkyVisualTest.scrollElementIntoView('#screenshot-error-broken');
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'error-type-broken',
          selector: '#screenshot-error-broken',
          checkAccessibility: true
        });
      });
  });

  it('should match previous screenshot for notfound type', () => {
    return SkyVisualTest
      .setupTest('error')
      .then(() => {
        SkyVisualTest.scrollElementIntoView('#screenshot-error-notfound');
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'error-type-notfound',
          selector: '#screenshot-error-notfound',
          checkAccessibility: true
        });
      });
  });

  it('should match previous screenshot for construction type', () => {
    return SkyVisualTest
      .setupTest('error')
      .then(() => {
        SkyVisualTest.scrollElementIntoView('#screenshot-error-construction');
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'error-type-construction',
          selector: '#screenshot-error-construction',
          checkAccessibility: true
        });
      });
  });

  it('should match previous screenshot for security type', () => {
    return SkyVisualTest
      .setupTest('error')
      .then(() => {
        SkyVisualTest.scrollElementIntoView('#screenshot-error-security');
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'error-type-security',
          selector: '#screenshot-error-security',
          checkAccessibility: true
        });
      });
  });

  it('should match previous screenshot for custom type', () => {
    return SkyVisualTest
      .setupTest('error')
      .then(() => {
        SkyVisualTest.scrollElementIntoView('#screenshot-error-custom');
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'error-type-custom',
          selector: '#screenshot-error-custom',
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
