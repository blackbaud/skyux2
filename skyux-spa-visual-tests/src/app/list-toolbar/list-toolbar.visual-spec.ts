import { SkyVisualTest } from '../../../config/utils/visual-test-commands';
import { element, by } from 'protractor';

describe('list-toolbar component', () => {

  it('should display toolbar with the column chooser', () => {
    return SkyVisualTest
      .setupTest('list-toolbar')
      .then(() => {
        return element(by.css('#screenshot-list-toolbar .sky-list-secondary-actions .sky-dropdown-button'))
          .click() as any;
      })
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'list-toolbar',
          selector: '#screenshot-list-toolbar'
        });
      });
  });

  it('should display toolbar correctly when a small screen', () => {
    return SkyVisualTest
      .setupTest('list-toolbar', 400)
      .then(() => {
        return element(by.css('#screenshot-list-toolbar .sky-list-secondary-actions .sky-dropdown-button'))
          .click() as any;
      })
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'list-toolbar-small',
          selector: '#screenshot-list-toolbar'
        });
      });
  });
});
