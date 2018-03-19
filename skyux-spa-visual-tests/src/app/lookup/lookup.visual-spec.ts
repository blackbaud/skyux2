import {
  browser,
  element,
  by
} from 'protractor';

import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

describe('Lookup component', () => {
  it('should match previous lookup screenshot', () => {
    return SkyVisualTest
      .setupTest('lookup')
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'lookup',
          selector: 'body'
        });
      });
  });

  it('should match previous lookup w/ menu screenshot on small screens', () => {
    return SkyVisualTest
      .setupTest('lookup')
      .then(() => {
        const input = element(by.css('textarea'));
        input.value = 'r';
        input.click();
        browser.actions().sendKeys('r').perform();

        browser.wait(() => {
          return browser.isElementPresent(
            element(by.css('.sky-dropdown-item'))
          );
        });

        return SkyVisualTest.compareScreenshot({
          screenshotName: 'lookup-w-menu',
          selector: 'body'
        });
      });
  });

  it('should match previous lookup screenshot', () => {
    return SkyVisualTest
      .setupTest('lookup', 480)
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'lookup-sm',
          selector: 'body'
        });
      });
  });

  it('should match previous lookup w/ menu screenshot on small screens', () => {
    return SkyVisualTest
      .setupTest('lookup', 480)
      .then(() => {
        const input = element(by.css('textarea'));
        input.value = 'r';
        input.click();
        browser.actions().sendKeys('r').perform();

        browser.wait(() => {
          return browser.isElementPresent(
            element(by.css('.sky-dropdown-item'))
          );
        });

        return SkyVisualTest.compareScreenshot({
          screenshotName: 'lookup-w-menu-sm',
          selector: 'body'
        });
      });
  });

  it('should match previous disabled lookup screenshot', () => {
    return SkyVisualTest
      .setupTest('lookup')
      .then(() => {
        const btn = element(by.css('#btn-disable-lookup'));
        btn.click();
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'lookup-disabled',
          selector: 'body'
        });
      });
  });
});
