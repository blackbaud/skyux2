describe('Repeater', () => {
  'use strict';

  it('should match previous repeater screenshot', function (done) {
    browser
      .setupTest('/repeater.html')
      .compareScreenshot({
        screenshotName: 'repeater',
        selector: '#screenshot-repeater',
        checkAccessibility: true
      })
      .call(done);
  });

  it('should match previous repeater screenshot when all are collapsed', function (done) {
    browser
      .setupTest('/repeater.html')
      .compareScreenshot({
        screenshotName: 'repeater-collapsed',
        selector: '#screenshot-repeater-collapsed',
        checkAccessibility: true
      })
      .call(done);
  });

  it('should match previous repeater screenshot in single mode', function (done) {
    browser
      .setupTest('/repeater.html')
      .compareScreenshot({
        screenshotName: 'repeater-single',
        selector: '#screenshot-repeater-single',
        checkAccessibility: true
      })
      .call(done);
  });

  it('should match previous repeater screenshot in multiple mode', function (done) {
    browser
      .setupTest('/repeater.html')
      .compareScreenshot({
        screenshotName: 'repeater-multiple',
        selector: '#screenshot-repeater-multiple',
        checkAccessibility: true
      })
      .call(done);
  });

});
