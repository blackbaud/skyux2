import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { element, by } from 'protractor';

describe('wait component', () => {

  it('should display wait on parent', () => {
    SkyVisualTest.setupTest('/wait');
    element(by.css('.sky-test-wait')).click();
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'wait-component',
      selector: '#screenshot-wait',
      checkAccessibility: true
    });
  });

  it('should display wait on parent to block absolute item', () => {
    SkyVisualTest.setupTest('/wait');
    element(by.css('.sky-test-wait')).click();
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'wait-component-absolute',
      selector: '#screenshot-wait-absolute',
      checkAccessibility: true
    });
  });

  it('should display wait behind parent with modal z-index', () => {
    SkyVisualTest.setupTest('/wait');
    element(by.css('.sky-test-wait')).click();
    SkyVisualTest.scrollElementIntoView('#screenshot-wait-behind')
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'wait-component-absolute-behind',
      selector: '#screenshot-wait-behind',
      checkAccessibility: true
    });
  });


  it('should display nonblocking wait on parent', () => {
    SkyVisualTest.setupTest('/wait');
    element(by.css('.sky-test-non-blocking')).click();
    element(by.css('.sky-test-wait')).click();
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'wait-component-non-block',
      selector: '#screenshot-wait',
      checkAccessibility: true
    });
  });

  it('should display wait on full page', () => {
    SkyVisualTest.setupTest('/wait');
    element(by.css('.sky-test-full-page')).click();
    element(by.css('.sky-test-wait')).click();
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'wait-full-page',
      selector: 'body',
      checkAccessibility: true
    });
  });

  it('should display non blocking wait on full page', () => {
    SkyVisualTest.setupTest('/wait');
    element(by.css('.sky-test-full-page')).click();
    element(by.css('.sky-test-non-blocking')).click();
    element(by.css('.sky-test-wait')).click();
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'wait-full-page-non-block',
      selector: 'body',
      checkAccessibility: true
    });
  });
});
