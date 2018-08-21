import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { element, by } from 'protractor';

describe('list-view-checklist component', () => {

  it('should display checklist view', () => {
    return SkyVisualTest.setupTest('list-view-checklist')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'list-view-checklist',
        selector: '#screenshot-list-view-checklist'
      });
    });

  });

  it('should display checklist view with checked', () => {
    return SkyVisualTest.setupTest('list-view-checklist')
    .then(() => {
      element(by.css('.sky-list-view-checklist sky-checkbox')).click();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'list-view-checklist-checked',
        selector: '#screenshot-list-view-checklist'
      });
    });

  });

  it('should display only checked items when "only show selected items" is checked', () => {
    return SkyVisualTest.setupTest('list-view-checklist')
    .then(() => {
      element(by.css('.sky-list-view-checklist sky-checkbox')).click();
      element(by.css('#sky-list-view-checklist-show-selected')).click();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'list-view-checklist-only-show-selected-items',
        selector: '#screenshot-list-view-checklist'
      });
    });

  });

  it('should display checklist view single select', () => {
    return SkyVisualTest.setupTest('list-view-checklist')
    .then(() => {
      element(by.css('.sky-btn.sky-btn-primary')).click();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'list-view-checklist-single',
        selector: '#screenshot-list-view-checklist'
      });
    });

  });
});
