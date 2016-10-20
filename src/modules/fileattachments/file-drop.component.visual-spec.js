describe('File drop', () => {
  'use strict';

  it('should match the file drop control', () => {
    return browser
      .setupTest('/fileattachments.html')
      .compareScreenshot({
        screenshotName: 'file-drop',
        selector: '#screenshot-file-drop'
      });
  });
});
