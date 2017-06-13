describe('Repeater', function () {
  'use strict';

  it('should match previous repeater screenshot', function () {
    return browser
      .setupTest('/repeater.html')
      .compareScreenshot({
        screenshotName: 'repeater',
        selector: '#screenshot-repeater',
        checkAccessibility: true
      });
  });

  it('should match previous repeater screenshot when all are collapsed', function () {
    return browser
      .setupTest('/repeater.html')
      .compareScreenshot({
        screenshotName: 'repeater-collapsed',
        selector: '#screenshot-repeater-collapsed',
        checkAccessibility: true
      });
  });

  it('should match previous repeater screenshot in single mode', function () {
    return browser
      .setupTest('/repeater.html')
      .compareScreenshot({
        screenshotName: 'repeater-single',
        selector: '#screenshot-repeater-single',
        checkAccessibility: true
      });
  });

  it('should match previous repeater screenshot in multiple mode', function () {
    return browser
      .setupTest('/repeater.html')
      .compareScreenshot({
        screenshotName: 'repeater-multiple',
        selector: '#screenshot-repeater-multiple',
        checkAccessibility: true
      });
  });

  it('should match previous repeater screenshot in selectable mode', function () {
    return browser
      .setupTest('/repeater.html')
      .compareScreenshot({
        screenshotName: 'repeater-selectable',
        selector: '#screenshot-repeater-selectable',
        checkAccessibility: true
      });
  });

});
