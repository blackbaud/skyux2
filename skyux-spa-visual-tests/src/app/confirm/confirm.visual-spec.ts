import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { element, by } from 'protractor';

describe('Confirm', () => {
  it('should match previous OK screenshot', () => {
    return SkyVisualTest
      .setupTest('confirm')
      .then(() => {
        element(by.css('.sky-confirm-btn-ok')).click();

        SkyVisualTest.moveCursorOffScreen();

        return SkyVisualTest.compareScreenshot({
          screenshotName: 'confirm-ok',
          selector: '.sky-modal'
        });
      })
      .then(() => {
        element(by.css('.sky-confirm-buttons .sky-btn-primary')).click();
      });
  });

  it('should match previous YesCancel screenshot', () => {
    return SkyVisualTest
      .setupTest('confirm')
      .then(() => {
        element(by.css('.sky-confirm-btn-yescancel')).click();

        SkyVisualTest.moveCursorOffScreen();

        return SkyVisualTest.compareScreenshot({
          screenshotName: 'confirm-yescancel',
          selector: '.sky-modal'
        });
      })
      .then(() => {
        element(by.css('.sky-confirm-buttons .sky-btn-primary')).click();
      });
  });

  it('should match previous YesNoCancel screenshot', () => {
    return SkyVisualTest
      .setupTest('confirm')
      .then(() => {
        element(by.css('.sky-confirm-btn-yesnocancel')).click();

        SkyVisualTest.moveCursorOffScreen();

        return SkyVisualTest.compareScreenshot({
          screenshotName: 'confirm-yesnocancel',
          selector: '.sky-modal'
        });
      })
      .then(() => {
        element(by.css('.sky-confirm-buttons .sky-btn-primary')).click();
      });
  });

  it('should match previous custom screenshot', () => {
    return SkyVisualTest
      .setupTest('confirm')
      .then(() => {
        element(by.css('.sky-confirm-btn-custom')).click();

        SkyVisualTest.moveCursorOffScreen();

        return SkyVisualTest.compareScreenshot({
          screenshotName: 'confirm-custom',
          selector: '.sky-modal'
        });
      })
      .then(() => {
        element(by.css('.sky-confirm-buttons .sky-btn-primary')).click();
      });
  });

  it('should match previous OK screenshot on small screens', () => {
    return SkyVisualTest
      .setupTest('confirm', 480)
      .then(() => {
        element(by.css('.sky-confirm-btn-ok')).click();

        SkyVisualTest.moveCursorOffScreen();

        return SkyVisualTest.compareScreenshot({
          screenshotName: 'confirm-ok',
          selector: '.sky-modal'
        });
      })
      .then(() => {
        element(by.css('.sky-confirm-buttons .sky-btn-primary')).click();
      });
  });

  it('should match previous YesCancel screenshot on small screens', () => {
    return SkyVisualTest
      .setupTest('confirm', 480)
      .then(() => {
        element(by.css('.sky-confirm-btn-yescancel')).click();

        SkyVisualTest.moveCursorOffScreen();

        return SkyVisualTest.compareScreenshot({
          screenshotName: 'confirm-yescancel',
          selector: '.sky-modal'
        });
      })
      .then(() => {
        element(by.css('.sky-confirm-buttons .sky-btn-primary')).click();
      });
  });

  it('should match previous YesNoCancel screenshot on small screens', () => {
    return SkyVisualTest
      .setupTest('confirm', 480)
      .then(() => {
        element(by.css('.sky-confirm-btn-yesnocancel')).click();

        SkyVisualTest.moveCursorOffScreen();

        return SkyVisualTest.compareScreenshot({
          screenshotName: 'confirm-yesnocancel',
          selector: '.sky-modal'
        });
      })
      .then(() => {
        element(by.css('.sky-confirm-buttons .sky-btn-primary')).click();
      });
  });

  it('should match previous custom screenshot on small screens', () => {
    return SkyVisualTest
      .setupTest('confirm', 480)
      .then(() => {
        element(by.css('.sky-confirm-btn-custom')).click();

        SkyVisualTest.moveCursorOffScreen();

        return SkyVisualTest.compareScreenshot({
          screenshotName: 'confirm-custom',
          selector: '.sky-modal'
        });
      })
      .then(() => {
        element(by.css('.sky-confirm-buttons .sky-btn-primary')).click();
      });
  });
});
