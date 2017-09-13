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

      const groupElement = element(by.css('.group2'));
      browser.wait(function() { return browser.isElementPresent(groupElement); }, 8000);

      // open group
      groupElement.click();

      browser.sleep(1000);

      // click tab
      element(by.id('group2Tab2')).click();

      return SkyVisualTest.compareScreenshot({
        screenshotName: 'vertical-tabset-clicked-tab',
        selector: '#screenshot-vertical-tabset'
      });
    });
  });

  it('should match previous vertical tabset screenshot on mobile', () => {
    return SkyVisualTest.setupTest('vertical-tabs', 480)
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'vertical-tabset-mobile',
        selector: '#screenshot-vertical-tabset'
      });
    });
  });

  it('should match previous vertical tabset screenshot on mobile clicking show tabs', () => {
    return SkyVisualTest.setupTest('vertical-tabs', 480)
    .then(() => {

      const showTabsButton = element(by.css('.sky-vertical-tabset-show-tabs-btn'));
      browser.wait(function() { return browser.isElementPresent(showTabsButton); }, 8000);

      // show tabs
      showTabsButton.click();

      return SkyVisualTest.compareScreenshot({
        screenshotName: 'vertical-tabset-mobile-show-tabs',
        selector: '#screenshot-vertical-tabset'
      });
    });
  });

  it('should match previous vertical tabset screenshot on mobile clicking tab', () => {
    return SkyVisualTest.setupTest('vertical-tabs', 480)
    .then(() => {

      const showTabsButton = element(by.css('.sky-vertical-tabset-show-tabs-btn'));
      browser.wait(function() { return browser.isElementPresent(showTabsButton); }, 8000);

      // show tabs
      showTabsButton.click();
      browser.sleep(1000);

      // open group
      element(by.css('.group2')).click();
      browser.sleep(1000);

      // click tab
      element(by.id('group2Tab2')).click();

      return SkyVisualTest.compareScreenshot({
        screenshotName: 'vertical-tabset-mobile-clicked-tab',
        selector: '#screenshot-vertical-tabset'
      });
    });
  });
});
