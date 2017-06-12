import { SkyVisualTest} from '../../../config/utils/visual-test-commands';

import { element, by } from 'protractor';

describe('Datepicker', () => {

  it('should match previous daypicker screenshot', () => {
    return SkyVisualTest.setupTest('datepicker')
    .then(() => {
      SkyVisualTest.moveCursorOffScreen();
      return SkyVisualTest.compareScreenshot({
          screenshotName: 'datepicker-daypicker',
          selector: '#screenshot-datepicker-calendar'
        });
    });

  });

  it('should match previous monthpicker screenshot', () => {
    return SkyVisualTest.setupTest('datepicker')
    .then(() => {
      element(by.css('.sky-datepicker-calendar-title')).click();
      SkyVisualTest.moveCursorOffScreen()
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'datepicker-monthpicker',
        selector: '#screenshot-datepicker-calendar'
      });
    });

  });

  it('should match previous yearpicker screenshot', () => {
    return SkyVisualTest.setupTest('datepicker')
    .then(() => {
      element(by.css('.sky-datepicker-calendar-title')).click();
      element(by.css('.sky-datepicker-calendar-title')).click();
      SkyVisualTest.moveCursorOffScreen()
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'datepicker-yearpicker',
        selector: '#screenshot-datepicker-calendar'
      });
    });

  });

  it('should match previous datepicker input screenshot', () => {
    return SkyVisualTest.setupTest('datepicker')
    .then(() => {
      SkyVisualTest.moveCursorOffScreen()
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'datepicker-input',
        selector: '#screenshot-datepicker'
      });
    });

  });

  it('should match previous datepicker input screenshot when open', () => {
    return SkyVisualTest.setupTest('datepicker')
    .then(() => {
       element(by.css('.sky-dropdown-button')).click();
      SkyVisualTest.moveCursorOffScreen()
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'datepicker-input-open',
        selector: '#screenshot-datepicker'
      });
    });

  });
});
