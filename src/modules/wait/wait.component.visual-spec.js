describe('wait component', function () {
  'use strict';

  it('should display wait on parent', function () {
    return browser
      .setupTest('/wait.html')
      .click('.sky-test-wait')
      .compareScreenshot({
        screenshotName: 'wait_component',
        selector: '#screenshot-wait',
        checkAccessibility: true
      });
  });

  it('should display nonblocking wait on parent', function () {
    return browser
      .setupTest('/wait.html')
      .click('.sky-test-non-blocking')
      .click('.sky-test-wait')
      .compareScreenshot({
        screenshotName: 'wait_component_non_block',
        selector: '#screenshot-wait',
        checkAccessibility: true
      });
  });

  it('should display wait on full page', function () {
    return browser
      .setupTest('/wait.html')
      .click('.sky-test-full-page')
      .click('.sky-test-wait')
      .compareScreenshot({
        screenshotName: 'wait_full_page',
        selector: 'body',
        checkAccessibility: true
      });
  });

  it('should display non blocking wait on full page', function () {
    return browser
      .setupTest('/wait.html')
      .click('.sky-test-full-page')
      .click('.sky-test-non-blocking')
      .click('.sky-test-wait')
      .compareScreenshot({
        screenshotName: 'wait_full_page_non_block',
        selector: 'body',
        checkAccessibility: true
      });
  });
});
