describe('TextExpand', function () {
  'use strict';

  it('should match previous text expands when not expanded', function () {
    return browser
      .setupTest('/text-expand.html')
      .compareScreenshot({
        screenshotName: 'text-expand-not-expanded',
        selector: '#text-expands'
      });
  });

  it('should match the previous normal text expand when expanded', function () {
    return browser
      .setupTest('/text-expand.html')
      .click('#normal-text-expand .sky-text-expand-see-more')
      .compareScreenshot({
        screenshotName: 'text-expand-normal-expanded',
        selector: '#normal-text-expand'
      });
  });

  it('should match previous modal text expand when expanded', function () {
    return browser
      .setupTest('/text-expand.html')
      .click('#modal-text-expand .sky-text-expand-see-more')
      .compareScreenshot({
        screenshotName: 'text-expand-modal-expanded',
        selector: '.sky-modal'
      });
  });

});
