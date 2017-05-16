describe('File drop', function () {
  'use strict';

  it('should match the file drop control', function () {
    return browser
      .setupTest('/fileattachments.html')
      .compareScreenshot({
        screenshotName: 'file-drop',
        selector: '#screenshot-file-drop'
      });
  });

  it('should match the file drop control when no links allowed', function () {
    return browser
      .setupTest('/fileattachments.html')
      .click('.sky-test-allow-links')
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'file_drop_nolink',
        selector: '#screenshot-file-drop'
      });
  });
});
