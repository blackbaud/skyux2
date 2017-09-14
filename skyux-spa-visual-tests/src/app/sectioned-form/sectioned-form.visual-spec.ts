import { SkyVisualTest } from '../../../config/utils/visual-test-commands';
import { element, by } from 'protractor';

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
});
