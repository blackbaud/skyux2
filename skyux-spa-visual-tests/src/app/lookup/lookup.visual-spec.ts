import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { browser, element, by } from 'protractor';

fdescribe('lookup component', () => {

  it('should match the baseline lookup single screenshot', () => {
    return SkyVisualTest.setupTest('lookup')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'lookup-single-no-selection',
        selector: '#screenshot-lookup-single'
      });
    });
  });

  it('should match the baseline lookup single with selection screenshot', () => {
    return SkyVisualTest.setupTest('lookup')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'lookup-single-selection',
        selector: '#screenshot-lookup-single-selected'
      });
    });
  });

  it('should match the baseline lookup multi-select screenshot', () => {
    return SkyVisualTest.setupTest('lookup')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'lookup-multiple-no-selection',
        selector: '#screenshot-lookup-multiple'
      });
    });
  });

  it('should match the baseline lookup multi-select with selection screenshot', () => {
    return SkyVisualTest.setupTest('lookup')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'lookup-multiple-selection',
        selector: '#screenshot-lookup-multiple-selected'
      });
    });
  });

  it('should match the baseline lookup single screenshot with expanded menu', () => {
    return SkyVisualTest.setupTest('lookup')
    .then(() => {
      element(by.css('#screenshot-lookup-single input')).sendKeys('b');
      browser.sleep(100);
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'lookup-single-dropdown',
        selector: '#screenshot-lookup-single .sky-dropdown-menu'
      });
    });
  });

  it('should match the baseline lookup multi-select screenshot with expanded menu', () => {
    return SkyVisualTest.setupTest('lookup')
    .then(() => {
      element(by.css('#screenshot-lookup-multiple input')).sendKeys('b');
      browser.sleep(100);
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'lookup-multiple-dropdown',
        selector: '#screenshot-lookup-multiple .sky-dropdown-menu'
      });
    });
  });

  it('should match the baseline lookup single screenshot with expanded templated menu', () => {
    return SkyVisualTest.setupTest('lookup')
    .then(() => {
      element(by.css('#screenshot-lookup-menu-template input')).sendKeys('b');
      browser.sleep(100);
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'lookup-templated-dropdown',
        selector: '#screenshot-lookup-menu-template .sky-dropdown-menu'
      });
    });
  });
});
