describe('TextExpand', function () {
  'use strict';

  it('should match previous text expand repeater when not expanded', function () {
    return browser
      .setupTest('/text-expand-repeater.html')
      .compareScreenshot({
        screenshotName: 'text-expand-repeater-not-expanded',
        selector: '#text-expand-repeater'
      });
  });

  it('should match the previous text expand repeater when expanded', function () {
    return browser
      .setupTest('/text-expand.html')
      .click('.sky-text-expand-see-more')
      .compareScreenshot({
        screenshotName: 'text-expand-repeater-expanded',
        selector: '#text-expand-repeater'
      });
  });

});
