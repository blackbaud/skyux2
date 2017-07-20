import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { browser, element, by } from 'protractor';

describe('Help inline', () => {
    it('should match previous help inline screenshot', () => {
        return SkyVisualTest
          .setupTest('help-inline')
          .then(() => {
              SkyVisualTest.compareScreenshot({
                  screenshotName: 'help-inline',
                  selector: '#screenshot-help-inline',
                  checkAccessibility: true
              })
          })
    })

    it('should match previous help inline screenshot on hover', () => {
        return SkyVisualTest
        .setupTest('help-inline')
        .then(() => {
            browser.actions()
            .mouseMove(element(by.css('#screenshot-help-inline .sky-help-inline')))
            .perform();

            return SkyVisualTest
            .compareScreenshot({
                screenshotName: 'help-inline-hover',
                selector: '#screenshot-help-inline',
                checkAccessibility: true
            });
        });

  });
})