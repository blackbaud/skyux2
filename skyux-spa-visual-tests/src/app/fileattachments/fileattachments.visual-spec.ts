import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { element, by } from 'protractor';

describe('File drop', () => {

  it('should match the file drop control', () => {
    SkyVisualTest.setupTest('/fileattachments');
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'file-drop',
      selector: '#screenshot-file-drop'
    });
  });

  it('should match the file drop control when no links allowed', () => {
    SkyVisualTest.setupTest('/fileattachments');
    element(by.css('.sky-test-allow-links')).click();
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'file-drop-nolink',
      selector: '#screenshot-file-drop'
    });
  });
});
