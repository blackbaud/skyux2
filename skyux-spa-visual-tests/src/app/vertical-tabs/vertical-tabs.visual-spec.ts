import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { element, by } from 'protractor/built';

describe('Vertical tabSet', () => {

  it('should match previous vertical tabset screenshot', () => {
    return SkyVisualTest.setupTest('vertical-tabs')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'vertical-tabset',
        selector: '#screenshot-vertical-tabset'
      });
    });
  });

  it('should match previous vertical tabset screenshot after clicking tab', () => {
    return SkyVisualTest.setupTest('vertical-tabs-clicked-tab')
    .then(() => {

      // open group
      element(by.css('.group2')).click();

      // click tab
      element(by.id('group2Tab2')).click();

      return SkyVisualTest.compareScreenshot({
        screenshotName: 'vertical-tabset-clicked-tab',
        selector: '#screenshot-vertical-tabset'
      });
    });
  });

  // it('should match previous vertical tabset screenshot on mobile', () => {
  //   return SkyVisualTest.setupTest('vertical-tabs-mobile', 500)
  //   .then(() => {
  //     return SkyVisualTest.compareScreenshot({
  //       screenshotName: 'vertical-tabset-mobile',
  //       selector: '#screenshot-vertical-tabset'
  //     });
  //   });
  // });

  // it('should match previous vertical tabset screenshot on mobile clicking show tabs', () => {
  //   return SkyVisualTest.setupTest('vertical-tabs-mobile-show-tabs', 500)
  //   .then(() => {
  //     return SkyVisualTest.compareScreenshot({
  //       screenshotName: 'vertical-tabset-mobile-show-tabs',
  //       selector: '#screenshot-vertical-tabset'
  //     });
  //   });
  // });

  // it('should match previous vertical tabset screenshot on mobile clicking tab', () => {
  //   return SkyVisualTest.setupTest('vertical-tabs-mobile-clicking-tab', 500)
  //   .then(() => {
  //     return SkyVisualTest.compareScreenshot({
  //       screenshotName: 'vertical-tabset-mobile-clicking-tab',
  //       selector: '#screenshot-vertical-tabset'
  //     });
  //   });
  // });
});
