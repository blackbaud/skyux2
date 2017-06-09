import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { element, by } from 'protractor';

describe('list-view-checklist component', () => {

  it('should display checklist view', () => {
    SkyVisualTest.setupTest('/list-view-checklist');
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'list-view-checklist',
      selector: '#screenshot-list-view-checklist'
    });
  });

  it('should display checklist view with checked', () => {
    SkyVisualTest.setupTest('/list-view-checklist');
    element(by.css('sky-checkbox')).click();
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'list-view-checklist-checked',
      selector: '#screenshot-list-view-checklist'
    });
  });
});
