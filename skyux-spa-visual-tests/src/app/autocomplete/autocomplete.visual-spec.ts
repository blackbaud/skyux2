import {
  browser,
  by,
  element
} from 'protractor';

import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

describe('Autocomplete', () => {
  it('should match previous autocomplete screenshot', () => {
    return SkyVisualTest
      .setupTest('autocomplete')
      .then(() => {
        const input = element(by.css('input'));
        input.value = 'r';
        input.click();
        browser.actions().sendKeys('r').perform();

        browser.wait(() => {
          return browser.isElementPresent(
            element(by.css('.sky-dropdown-item'))
          );
        });

        return SkyVisualTest.compareScreenshot({
          screenshotName: 'autocomplete',
          selector: '#screenshot-autocomplete'
        });
      });
  });

  it('should match previous autocomplete screenshot on small screens', () => {
    return SkyVisualTest
      .setupTest('autocomplete', 480)
      .then(() => {

        const input = element(by.css('input'));
        input.value = 'r';
        input.click();
        browser.actions().sendKeys('r').perform();

        browser.wait(() => {
          return browser.isElementPresent(
            element(by.css('.sky-dropdown-item'))
          );
        });

        return SkyVisualTest.compareScreenshot({
          screenshotName: 'autocomplete',
          selector: '#screenshot-autocomplete'
        });
      });
  });
});
