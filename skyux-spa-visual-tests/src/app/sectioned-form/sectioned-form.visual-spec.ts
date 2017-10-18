import { SkyVisualTest } from '../../../config/utils/visual-test-commands';
import { element, by, browser } from 'protractor';

describe('Sectioned form', () => {

  it('should match previous sectioned form screenshot', () => {
    return SkyVisualTest.setupTest('sectioned-form')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'sectioned-form',
        selector: '#screenshot-sectioned-form'
      });
    });
  });

  it('should match previous sectioned form screenshot after clicking first tab', () => {
    return SkyVisualTest.setupTest('sectioned-form')
    .then(() => {

      let tabs = element.all(by.css('sky-vertical-tab'));

      // click first tab
      tabs.get(0).click();

      return SkyVisualTest.compareScreenshot({
        screenshotName: 'sectioned-form-first',
        selector: '#screenshot-sectioned-form'
      });
    });
  });

  it('should match previous sectioned form screenshot after clicking second tab', () => {
    return SkyVisualTest.setupTest('sectioned-form')
    .then(() => {

      let tabs = element.all(by.css('sky-vertical-tab'));

      // click second tab
      tabs.get(1).click();

      return SkyVisualTest.compareScreenshot({
        screenshotName: 'sectioned-form-second',
        selector: '#screenshot-sectioned-form'
      });
    });
  });

  it('should match previous sectioned form screenshot on mobile', () => {
    return SkyVisualTest.setupTest('sectioned-form', 480)
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'sectioned-form-mobile',
        selector: '#screenshot-sectioned-form'
      });
    });
  });

  it('should match previous sectioned form screenshot after resizing to mobile', () => {
    return SkyVisualTest.setupTest('sectioned-form')
    .then(() => {

      // resize to mobile
      browser.driver.manage().window().setSize(480, 800);

      return SkyVisualTest.compareScreenshot({
        screenshotName: 'sectioned-form-to-mobile',
        selector: '#screenshot-sectioned-form'
      });
    });
  });

  it('should match previous sectioned form screenshot after resizing to widescreen', () => {
    return SkyVisualTest.setupTest('sectioned-form')
    .then(() => {

      // resize to mobile
      browser.driver.manage().window().setSize(480, 800);

      // resize to widescreen
      browser.driver.manage().window().setSize(1000, 800);

      return SkyVisualTest.compareScreenshot({
        screenshotName: 'sectioned-form-to-widescreen',
        selector: '#screenshot-sectioned-form'
      });
    });
  });
});
