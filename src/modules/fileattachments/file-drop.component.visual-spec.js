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
});
