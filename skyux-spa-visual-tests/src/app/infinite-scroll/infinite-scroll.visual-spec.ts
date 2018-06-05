// #region imports
import {
  SkyVisualTest
} from '../../../config/utils/visual-test-commands';

import {
  by,
  element
} from 'protractor';
// #endregion

describe('Infinite Scroll', () => {
  it('should match previous infinite scroll screenshot', () => {
    return SkyVisualTest
      .setupTest('infinite-scroll')
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'infinite-scroll',
          selector: '#screenshot-infinite-scroll'
        });
      });
  });

  it('should match previous infinite scroll screenshot when hasMore is false', () => {
    return SkyVisualTest.setupTest('infinite-scroll')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'infinite-scroll-nobutton',
        selector: '#screenshot-infinite-scroll-nobutton'
      });
    });
  });

  it('should match previous infinite scroll screenshot in wait mode', () => {
    return SkyVisualTest.setupTest('infinite-scroll')
    .then(() => {
      element(by.css('.sky-btn')).click();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'infinite-scroll-wait',
        selector: '#screenshot-infinite-scroll-wait'
      });
    });
  });
});
