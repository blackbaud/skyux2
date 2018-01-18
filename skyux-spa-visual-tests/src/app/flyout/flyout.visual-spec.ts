import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { element, by } from 'protractor';

fdescribe('Flyout', () => {

  it('should match previous flyout screenshot', () => {
    return SkyVisualTest.setupTest('flyout')
    .then(() => {
      element(by.css('.sky-btn-primary')).click();
      SkyVisualTest.moveCursorOffScreen();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'flyout',
        selector: '.sky-flyout'
      }).then(() => {
        element(by.css('.sky-flyout .sky-flyout-btn-close')).click();
      });
    });

  });

});
