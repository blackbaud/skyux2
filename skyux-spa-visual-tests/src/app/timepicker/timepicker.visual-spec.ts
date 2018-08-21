import {
  by,
  element
} from 'protractor';

import {
  SkyVisualTest
} from '../../../config/utils/visual-test-commands';

fdescribe('timepicker', () => {
  it('should show the timepicker correctly for 12hr', () => {
    return SkyVisualTest
      .setupTest('timepicker')
      .then(() => {
        SkyVisualTest.moveCursorOffScreen();
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'timepicker12hr',
          selector: '#screenshot-timepicker12hr'
        });
      });
  });

  it('should show the timpicker correctly for 24hr', () => {
    return SkyVisualTest
      .setupTest('timepicker')
      .then(() => {
        SkyVisualTest.moveCursorOffScreen();
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'timepicker24hr',
          selector: '#screenshot-timepicker24hr'
        });
      });
  });

  it('should show the timepicker correctly after clicking on the icon for 12 hr', () => {
    return SkyVisualTest
      .setupTest('timepicker')
      .then(() => {
        element(by.css('#screenshot-timepicker12hr .sky-dropdown-button')).click();
        SkyVisualTest.moveCursorOffScreen();
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'timepicker12hr-open',
          selector: '#screenshot-timepicker12hr .sky-popover-body'
        });
      });
  });

  it('should show the timepicker correctly after clicking on the icon for 24 hr', () => {
    return SkyVisualTest
      .setupTest('timepicker')
      .then(() => {
        element(by.css('#screenshot-timepicker24hr .sky-dropdown-button')).click();
        SkyVisualTest.moveCursorOffScreen();
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'timepicker24hr-open',
          selector: '#screenshot-timepicker24hr .sky-popover-body'
        });
      });
  });
});
