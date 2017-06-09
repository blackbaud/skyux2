import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { element, by } from 'protractor';

describe('Modal', () => {

  it('should match previous modal screenshot', () => {
    SkyVisualTest.setupTest('/modal');
    element(by.css('.sky-btn-primary')).click();
    SkyVisualTest.moveCursorOffScreen();
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'modal',
      selector: '.sky-modal',
      checkAccessibility: true
    });
  });

  it('should match previous modal screenshot on small screens', () => {
    SkyVisualTest.setupTest('/modal', 480);
    element(by.css('.sky-btn-primary')).click();
    SkyVisualTest.moveCursorOffScreen();
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'modal-small',
      selector: '.sky-modal',
      checkAccessibility: true
    });
  });

  it('should match previous large modal screenshot', () => {
    SkyVisualTest.setupTest('/modal');
    element(by.css('.sky-test-large-modal')).click();
    SkyVisualTest.moveCursorOffScreen();
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'modal-large',
      selector: '.sky-modal',
      checkAccessibility: true
    });
  });

  it('should match previous large modal screenshot on mobile', () => {
    SkyVisualTest.setupTest('/modal', 480);
    element(by.css('.sky-test-large-modal')).click();
    SkyVisualTest.moveCursorOffScreen()
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'modal-large-mobile',
      selector: '.sky-modal',
      checkAccessibility: true
    });
  });

  it('should match previous screenshot of modal without header or footer', () => {
    SkyVisualTest.setupTest('/modal');
    element(by.css('.sky-test-content-only')).click();
    SkyVisualTest.moveCursorOffScreen();
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'modal-content-only',
      selector: '.sky-modal',
      checkAccessibility: true
    });
  });
});
