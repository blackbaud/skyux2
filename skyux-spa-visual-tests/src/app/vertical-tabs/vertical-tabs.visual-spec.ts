import { SkyVisualTest } from '../../../config/utils/visual-test-commands';
import { element, by, browser } from 'protractor';

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
    return SkyVisualTest.setupTest('vertical-tabs')
    .then(() => {

      browser.sleep(1000);

      // open group
      element(by.css('.group2')).click();

      return SkyVisualTest.compareScreenshot({
        screenshotName: 'vertical-tabset-clicked-group',
        selector: '#screenshot-vertical-tabset'
      }).then(() => {

        // // wait for tab element to exist
        // const tabElement = element(by.id('group2Tab2'));
        // browser.wait(function() { return browser.isElementPresent(tabElement); }, 8000);

        // // click tab
        // tabElement.click();

        // return SkyVisualTest.compareScreenshot({
        //   screenshotName: 'vertical-tabset-clicked-tab',
        //   selector: '#screenshot-vertical-tabset'
        // });
      });
    });
  });

  // $('#username').sendKeys('administrator');
  // $('#password').sendKeys('password');
  // $('#login').click();

  // var logout = by.css('#logout');
  // browser.wait(function() { return $p.isElementPresent(logout); }, 8000);

  // it('should match previous vertical tabset screenshot on mobile', () => {
  //   return SkyVisualTest.setupTest('vertical-tabs-mobile', 480)
  //   .then(() => {
  //     return SkyVisualTest.compareScreenshot({
  //       screenshotName: 'vertical-tabset-mobile',
  //       selector: '#screenshot-vertical-tabset'
  //     });
  //   });
  // });

  // it('should match previous vertical tabset screenshot on mobile clicking show tabs', () => {
  //   return SkyVisualTest.setupTest('vertical-tabs-mobile-show-tabs', 480)
  //   .then(() => {
  //     return SkyVisualTest.compareScreenshot({
  //       screenshotName: 'vertical-tabset-mobile-show-tabs',
  //       selector: '#screenshot-vertical-tabset'
  //     });
  //   });
  // });

  // it('should match previous vertical tabset screenshot on mobile clicking tab', () => {
  //   return SkyVisualTest.setupTest('vertical-tabs-mobile-clicking-tab', 480)
  //   .then(() => {
  //     return SkyVisualTest.compareScreenshot({
  //       screenshotName: 'vertical-tabset-mobile-clicking-tab',
  //       selector: '#screenshot-vertical-tabset'
  //     });
  //   });
  // });
});
