/*
describe('Repeater', () => {
  'use strict';

  it('should match the baseline repeater screenshot', function (done) {
    browser
      .setupTest('/repeater.html')
      .compareScreenshot({
        screenshotName: 'repeater',
        selector: '#screenshot-repeater-full',
        checkAccessibility: true
      })
      .call(done);
  });

  it('should match the baseline repeater component screenshot when all items are collapsed', function (done) {
    browser
      .setupTest('/repeater.html')
      .compareScreenshot({
        screenshotName: 'repeater-component-collapsed',
        selector: '#screenshot-repeater-component-full',
        checkAccessibility: true
      })
      .call(done);
  });

  it('should match the baseline repeater component screenshot when an item is expanded', function (done) {
    browser
      .setupTest('/repeater.html')
      .click('.bb-repeater-item-header:nth-Child(1)')
      .compareScreenshot({
        screenshotName: 'repeater-component-expanded',
        selector: '#screenshot-repeater-component-full',
        checkAccessibility: true
      })
      .call(done);
  });

  it('should match the baseline repeater component screenshot when an item is expanded and no context menu exists', function (done) {
    browser
      .setupTest('/repeater.html')
      .click('#screenshot-repeater-hide-context-menu')
      .click('.bb-repeater-item-header:nth-Child(1)')
      .compareScreenshot({
        screenshotName: 'repeater-component-expanded-no-context-menu',
        selector: '#screenshot-repeater-component-full',
        checkAccessibility: true
      })
      .call(done);
  });

  it('should match the baseline repeater component screenshot when no title exists', function (done) {
    browser
      .setupTest('/repeater.html')
      .click('#screenshot-repeater-hide-title')
      .compareScreenshot({
        screenshotName: 'repeater-component-expanded-no-title',
        selector: '#screenshot-repeater-component-full',
        checkAccessibility: true
      })
      .call(done);
  });

  it('should match the baseline repeater component screenshot when no checkbox exists', function (done) {
    browser
      .setupTest('/repeater.html')
      .click('#screenshot-repeater-hide-checkbox')
      .compareScreenshot({
        screenshotName: 'repeater-component-expanded-no-checkbox',
        selector: '#screenshot-repeater-component-full',
        checkAccessibility: true
      })
      .call(done);
  });

  it('should match the baseline repeater component screenshot when expand mode is "none"', function (done) {
    browser
      .setupTest('/repeater.html')
      .click('#screenshot-repeater-expand-mode-none')
      .compareScreenshot({
        screenshotName: 'repeater-component-expanded-no-expand',
        selector: '#screenshot-repeater-component-full',
        checkAccessibility: true
      })
      .call(done);
  });

});
*/
