import { SkyVisualTest } from '../../../config/utils/visual-test-commands';
import { element, by } from 'protractor';

describe('link-records component', () => {

  it('should display suggested match', () => {
    return SkyVisualTest.setupTest('link-records')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'link_records_match',
        selector: '#screenshot-link-records-match',
        checkAccessibility: true
      });
    });
  });

  it('should display no match', () => {
    return SkyVisualTest.setupTest('link-records')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'link_records_no_match',
        selector: '#screenshot-link-records-no-match',
        checkAccessibility: true
      });
    });
  });

  it('should display linked match', () => {
    return SkyVisualTest.setupTest('link-records')
    .then(() => {
      element(by.css('#linked-match-records .link-records-item-footer .sky-btn-primary')).click();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'link_records_linked_match',
        selector: '#screenshot-link-records-linked-match',
        checkAccessibility: true
      });
    });
  });

  it('should display created match', () => {
    return SkyVisualTest.setupTest('link-records')
    .then(() => {
      element(by.css('#create-link-records .link-records-item-footer .sky-btn-link')).click();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'link_records_created_match',
        selector: '#screenshot-link-records-created-match',
        checkAccessibility: true
      });
    });
  });

  it('should display fields to update on a match', () => {
    return SkyVisualTest.setupTest('link-records')
    .then(() => {
      element(by.css('#field-update-records .link-records-item-footer .sky-btn-primary')).click();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'link_records_fields_update',
        selector: '#screenshot-link-records-fields-update'
      });
    });
  });
});
