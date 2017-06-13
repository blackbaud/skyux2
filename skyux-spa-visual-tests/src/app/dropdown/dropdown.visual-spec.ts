import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { element, by } from 'protractor';

describe('Dropdown', () => {

  it('should match dropdown button screenshot when closed', () => {
    return SkyVisualTest.setupTest('dropdown')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'dropdown-button-closed',
        selector: '#screenshot-dropdown-button'
      });
    });

  });

  it('should match dropdown button screenshot when open', () => {
    return SkyVisualTest.setupTest('dropdown')
    .then(() => {
      element(by.css('#screenshot-dropdown-button .sky-dropdown-button')).click();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'dropdown-button-open',
        selector: '#screenshot-dropdown-button'
      });
    });

  });

  it('should match dropdown context menu screenshot when closed', () => {
    return SkyVisualTest.setupTest('dropdown')
    .then(() => {
       return SkyVisualTest.compareScreenshot({
        screenshotName: 'dropdown-context-menu-closed',
        selector: '#screenshot-dropdown-context-menu'
      });
    });

  });

  it('should match dropdown context menu screenshot when open', () => {
    return SkyVisualTest.setupTest('dropdown')
    .then(() => {
      element(by.css('#screenshot-dropdown-context-menu .sky-dropdown-button')).click();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'dropdown-context-menu-open',
        selector: '#screenshot-dropdown-context-menu'
      });
    });

  });

  it('should match dropdown screenshot when before a relative element', () => {
    return SkyVisualTest.setupTest('dropdown')
    .then(() => {
      element(by.css('#screenshot-dropdown-z-index .sky-dropdown-button')).click();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'dropdown-z-index',
        selector: '#screenshot-dropdown-z-index'
      });
    });

  });
});
