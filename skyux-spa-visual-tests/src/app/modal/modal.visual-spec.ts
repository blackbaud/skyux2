import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { element, by } from 'protractor';

describe('Modal', () => {

  it('should match previous modal screenshot', () => {
    return SkyVisualTest.setupTest('modal')
    .then(() => {
      element(by.css('.sky-btn-primary')).click();
      SkyVisualTest.moveCursorOffScreen();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'modal',
        selector: '.sky-modal',
        checkAccessibility: true
      }).then(() => {
        element(by.css('.sky-modal .sky-modal-btn-close')).click();
      });
    });

  });

  it('should match previous modal screenshot on small screens', () => {
    return SkyVisualTest.setupTest('modal', 480)
    .then(() => {
      element(by.css('.sky-btn-primary')).click();
      SkyVisualTest.moveCursorOffScreen();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'modal-small',
        selector: '.sky-modal',
        checkAccessibility: true
      }).then(() => {
        element(by.css('.sky-modal .sky-modal-btn-close')).click();
      });
    });

  });

  it('should match previous large modal screenshot', () => {
    return SkyVisualTest.setupTest('modal')
    .then(() => {
      element(by.css('.sky-test-large-modal')).click();
      SkyVisualTest.moveCursorOffScreen();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'modal-large',
        selector: '.sky-modal',
        checkAccessibility: true
      }).then(() => {
        element(by.css('.sky-modal .sky-modal-btn-close')).click();
      });
    });

  });

  it('should match previous large modal screenshot on mobile', () => {
    return SkyVisualTest.setupTest('modal', 480)
    .then(() => {
      element(by.css('.sky-test-large-modal')).click();
      SkyVisualTest.moveCursorOffScreen();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'modal-large-mobile',
        selector: '.sky-modal',
        checkAccessibility: true
      }).then(() => {
        element(by.css('.sky-modal .sky-modal-btn-close')).click();
      });
    });

  });

  it('should match previous screenshot of modal without header or footer', () => {
    return SkyVisualTest.setupTest('modal')
    .then(() => {
      element(by.css('.sky-test-content-only')).click();

      return SkyVisualTest.compareScreenshot({
        screenshotName: 'modal-content-only',
        selector: '.sky-modal',
        checkAccessibility: true
      }).then(() => {
        element(by.css('.sky-modal .sky-test-close')).click();
      });
    });
  });

  it('should match previous small size modal screenshot', () => {
    return SkyVisualTest.setupTest('modal')
      .then(() => {
        element(by.css('.sky-test-small-size-modal')).click();
        SkyVisualTest.moveCursorOffScreen();
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'modal_small_size',
          selector: '.sky-modal',
          checkAccessibility: true
        }).then(() => {
          element(by.css('.sky-modal .sky-modal-btn-close')).click();
        });
      });
  });

  it('should match previous medium size modal screenshot', () => {
    return SkyVisualTest.setupTest('modal')
      .then(() => {
        element(by.css('.sky-test-medium-size-modal')).click();
        SkyVisualTest.moveCursorOffScreen();
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'modal_medium_size',
          selector: '.sky-modal',
          checkAccessibility: true
        }).then(() => {
          element(by.css('.sky-modal .sky-modal-btn-close')).click();
        });
      });
  });

  it('should match previous large size modal screenshot', () => {
    return SkyVisualTest.setupTest('modal')
      .then(() => {
        element(by.css('.sky-test-large-size-modal')).click();
        SkyVisualTest.moveCursorOffScreen();
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'modal_large_size',
          selector: '.sky-modal',
          checkAccessibility: true
        }).then(() => {
          element(by.css('.sky-modal .sky-modal-btn-close')).click();
        });
      });
  });

  it('should match previous large size modal screenshot on intermediate screens', () => {
    return SkyVisualTest.setupTest('modal', 800)
      .then(() => {
        element(by.css('.sky-test-large-size-modal')).click();
        SkyVisualTest.moveCursorOffScreen();
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'modal_large_size_bounded',
          selector: '.sky-modal',
          checkAccessibility: true
        }).then(() => {
          element(by.css('.sky-modal .sky-modal-btn-close')).click();
        });
      });
  });

  it('should match previous tiled modal screenshot', () => {
    return SkyVisualTest.setupTest('modal', 800)
      .then(() => {
        element(by.css('.sky-test-tiled-modal')).click();
        SkyVisualTest.moveCursorOffScreen();
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'modal_tiled',
          selector: '.sky-modal',
          checkAccessibility: true
        }).then(() => {
          element(by.css('.sky-modal .sky-modal-btn-close')).click();
        });
      });
  });
});
