import { SkyVisualTest } from '../../../config/utils/visual-test-commands';
import { element, by } from 'protractor';

describe('list-column-selector-action component', () => {

  it('should display toolbar with the column chooser', () => {
    return SkyVisualTest
      .setupTest('list-column-selector-action')
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'list-column-selector-action',
          selector: '#screenshot-list-column-selector-action'
        });
      });
  });

  it('should display toolbar with the column chooser without text when a small screen', () => {
    return SkyVisualTest
      .setupTest('list-column-selector-action', 400)
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'list-column-selector-action-small',
          selector: '#screenshot-list-column-selector-action'
        });
      });
  });

  it('should display toolbar with the column chooser in the deprecated manner', () => {
    return SkyVisualTest
      .setupTest('list-column-selector-action')
      .then(() => {
        return element(by.css('#screenshot-list-column-selector-action-deprecated .sky-list-secondary-actions .sky-dropdown-button'))
          .click() as any;
      })
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'list-column-selector-action-deprecated',
          selector: '#screenshot-list-column-selector-action-deprecated'
        });
      });
  });
});
