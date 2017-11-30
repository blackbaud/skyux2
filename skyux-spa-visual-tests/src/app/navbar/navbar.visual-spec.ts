import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { browser, element, by } from 'protractor';

describe('Navbar', () => {

  it('should match previous navbar screenshot', () => {
    return SkyVisualTest.setupTest('navbar')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'navbar',
        selector: '#screenshot-navbar',
        checkAccessibility: false
      });
    });

  });

  it('should match previous navbar screenshot when the user mouses over an item', () => {
    return SkyVisualTest.setupTest('navbar')
    .then(() => {
      browser.actions()
        .mouseMove(element(by.css('#screenshot-navbar .first-item')))
        .perform();

      return SkyVisualTest.compareScreenshot({
        screenshotName: 'navbar-item-over',
        selector: '#screenshot-navbar',
        checkAccessibility: false
      });
    });

  });

  it('should match previous navbar screenshot when a dropdown is open', () => {
    return SkyVisualTest.setupTest('navbar')
    .then(() => {
       browser.actions()
        .mouseMove(element(by.css('#screenshot-navbar .sky-dropdown-button')))
        .perform();

      return SkyVisualTest.compareScreenshot({
        screenshotName: 'navbar-dropdown-open',
        selector: '#screenshot-navbar',
        checkAccessibility: false
      });
    });

  });

  it('should match previous navbar screenshot when the user is over a dropdown item', () => {
    return SkyVisualTest.setupTest('navbar')
    .then(() => {
      browser.actions()
        .mouseMove(element(by.css('#screenshot-navbar .sky-dropdown-button')))
        .perform();
      browser.actions()
        .mouseMove(element(by.css('#screenshot-navbar .sky-dropdown-item:first-child')))
        .perform();

      return SkyVisualTest.compareScreenshot({
        screenshotName: 'navbar-dropdown-item-over',
        selector: '#screenshot-navbar',
        checkAccessibility: false
      });
    });

  });

  it(
    'should match previous navbar screenshot when an item is active via the item CSS class',
    () => {
      return SkyVisualTest.setupTest('navbar')
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'navbar-item-active',
          selector: '#screenshot-navbar-active-item',
          checkAccessibility: false
        });
      });

    }
  );

  it(
    'should match previous navbar screenshot when an item is active via a child CSS class',
    () => {
      return SkyVisualTest.setupTest('navbar')
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'navbar-item-active-child',
          selector: '#screenshot-navbar-active-child',
          checkAccessibility: false
        });
      });

    }
  );

  it(
    'should match previous navbar screenshot when a dropdown is active',
    () => {
      return SkyVisualTest.setupTest('navbar')
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'navbar-item-active-child',
          selector: '#screenshot-navbar-active-child',
          checkAccessibility: false
        });
      });
    });

});
