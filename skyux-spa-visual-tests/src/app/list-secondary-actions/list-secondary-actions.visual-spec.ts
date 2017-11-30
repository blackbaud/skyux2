import { SkyVisualTest } from '../../../config/utils/visual-test-commands';
import { element, by } from 'protractor';

describe('list-secondary-actions component', () => {

  it('should display toolbar with secondary actions', () => {
    return SkyVisualTest
      .setupTest('list-secondary-actions')
      .then(() => {
        return element(by.css('.sky-list-secondary-actions .sky-dropdown-button'))
          .click() as any;
      })
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'list_secondary_actions',
          selector: '#screenshot-list-secondary-actions'
        });
      });
  });
});
