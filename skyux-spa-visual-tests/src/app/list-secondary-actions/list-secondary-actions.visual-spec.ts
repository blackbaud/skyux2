import { SkyVisualTest } from '../../../config/utils/visual-test-commands';
import { browser, element, by } from 'protractor';

describe('list-secondary-actions component', () => {

  it('should display toolbar with secondary actions', () => {
    return SkyVisualTest
      .setupTest('list-secondary-actions')
      .then(() => {
        browser.sleep(100);

        element(by.css('.sky-list-secondary-actions .sky-dropdown-button')).click();

        return SkyVisualTest.compareScreenshot({
          screenshotName: 'list_secondary_actions',
          selector: '#screenshot-list-secondary-actions',
          checkAccessibility: true
        });
      });
  });
});
