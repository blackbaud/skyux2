import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { browser, element, by } from 'protractor';

describe('Button', () => {

  it('should match previous button link screenshot on hover', () => {
    return SkyVisualTest
      .setupTest('button')
      .then(() => {
        browser.actions()
          .mouseMove(element(by.css('#screenshot-button-link .sky-btn')))
          .perform();

        return SkyVisualTest
          .compareScreenshot({
            screenshotName: 'button-link-hover',
            selector: '#screenshot-button-link'
          });
      });

  });

  it('should match previous button link inline screenshot on hover', () => {
    return SkyVisualTest
      .setupTest('button')
      .then(() => {
         browser.actions()
          .mouseMove(element(by.css('#screenshot-button-link-inline .sky-btn')))
          .perform();

        return SkyVisualTest
          .compareScreenshot({
            screenshotName: 'button-link-inline-hover',
            selector: '#screenshot-button-link-inline'
          });

      });
  });
});
