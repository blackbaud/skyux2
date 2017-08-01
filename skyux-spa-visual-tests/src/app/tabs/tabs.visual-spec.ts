import { SkyVisualTest } from '../../../config/utils/visual-test-commands';
import { element, by } from 'protractor';

describe('TabSet', () => {

  it('should match previous tabset screenshot', () => {
    return SkyVisualTest.setupTest('tabs')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'tabset',
        selector: '#screenshot-tabset'
      });
    });

  });

  it('should match the tabset screenshot with wizard styling', () => {
    return SkyVisualTest.setupTest('tabs')
    .then(() => {
      element(by.css('.sky-test-show-wizard')).click();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'tabset-wizard',
        selector: '#screenshot-tabset'
      });
    });

  });

  it('should match previous mobile tabset screenshot', () => {
    return SkyVisualTest.setupTest('tabs', 480)
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'tabset-collapsed',
        selector: '#screenshot-tabset'
      });
    });

  });

  it('should match previous mobile dropdown tabset screenshot', () => {
    return SkyVisualTest.setupTest('tabs', 480)
    .then(() => {
      element(by.css('#screenshot-tabset button.sky-dropdown-button-type-tab')).click();
      SkyVisualTest.moveCursorOffScreen();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'tabset-collapsed-dropdown',
        selector: '#screenshot-tabset'
      });
    });

  });

  it('should match previous mobile dropdown tabset screenshot with long tab', () => {
    return SkyVisualTest.setupTest('tabs', 480)
    .then(() => {
      SkyVisualTest.moveCursorOffScreen();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'tabset-collapsed-dropdown-long',
        selector: '#screenshot-tabset-long'
      });
    });

  });

});
