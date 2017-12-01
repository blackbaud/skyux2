import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { element, by } from 'protractor';

describe('wait component', () => {

  it('should display wait on parent', () => {
    return SkyVisualTest.setupTest('wait')
      .then(() => element(by.css('.sky-test-wait')).click() as any)
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'wait-component',
          selector: '#screenshot-wait'
        });
      });
  });

  it('should display wait on parent to block absolute item', () => {
    return SkyVisualTest.setupTest('wait')
      .then(() => element(by.css('.sky-test-wait')).click() as any)
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'wait-component-absolute',
          selector: '#screenshot-wait-absolute'
        });
      });
  });

  it('should display wait behind parent with modal z-index', () => {
    return SkyVisualTest.setupTest('wait')
      .then(() => element(by.css('.sky-test-wait')).click() as any)
      .then(() => {
        SkyVisualTest.scrollElementIntoView('#screenshot-wait-behind');
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'wait-component-absolute-behind',
          selector: '#screenshot-wait-behind'
        });
      });
  });

  it('should display nonblocking wait on parent', () => {
    return SkyVisualTest.setupTest('wait')
      .then(() => element(by.css('.sky-test-non-blocking')).click() as any)
      .then(() => element(by.css('.sky-test-wait')).click() as any)
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'wait-component-non-block',
          selector: '#screenshot-wait'
        });
      });
  });

  it('should display wait on full page', () => {
    return SkyVisualTest.setupTest('wait')
      .then(() => element(by.css('.sky-test-full-page')).click() as any)
      .then(() => element(by.css('.sky-test-wait')).click() as any)
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'wait-full-page',
          selector: 'body'
        });
      });
  });

  it('should display non blocking wait on full page', () => {
    return SkyVisualTest.setupTest('wait')
      .then(() => element(by.css('.sky-test-full-page')).click() as any)
      .then(() => element(by.css('.sky-test-non-blocking')).click() as any)
      .then(() => element(by.css('.sky-test-wait')).click() as any)
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'wait-full-page-non-block',
          selector: 'body'
        });
      });
  });
});
