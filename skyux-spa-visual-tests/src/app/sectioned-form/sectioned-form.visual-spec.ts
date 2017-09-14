import { SkyVisualTest } from '../../../config/utils/visual-test-commands';
import { browser } from 'protractor';
// import { element, by, browser } from 'protractor';

describe('Sectioned form', () => {
  it('should match previous sectioned form screenshot', () => {
    browser.sleep(8000);

    return SkyVisualTest.setupTest('sectioned-form')
    .then(() => {

      browser.sleep(8000);

      return SkyVisualTest.compareScreenshot({
        screenshotName: 'sectioned-form',
        selector: '#screenshot-sectioned-form'
      });
    });
  });

  // it('should switch to first tab on click', () => {
  //   return SkyVisualTest.setupTest('sectioned-form')
  //   .then(() => {

  //     let tabs = element.all(by.css('sky-vertical-tab'));
  //     browser.wait(function() { return browser.isElementPresent(tabs); }, 8000);

  //     // click first tab
  //     tabs[0].click();

  //     browser.sleep(1000);

  //     return SkyVisualTest.compareScreenshot({
  //       screenshotName: 'sectioned-form-first',
  //       selector: '#screenshot-sectioned-form'
  //     });
  //   });
  // });

  // it('should switch to second tab on click', () => {
  //   return SkyVisualTest.setupTest('sectioned-form')
  //   .then(() => {

  //     let tabs = element.all(by.css('sky-vertical-tab'));
  //     browser.wait(function() { return browser.isElementPresent(tabs); }, 8000);

  //     // click first tab
  //     tabs[0].click();

  //     browser.sleep(1000);

  //     return SkyVisualTest.compareScreenshot({
  //       screenshotName: 'sectioned-form-second',
  //       selector: '#screenshot-sectioned-form'
  //     });
  //   });
  // });
});
