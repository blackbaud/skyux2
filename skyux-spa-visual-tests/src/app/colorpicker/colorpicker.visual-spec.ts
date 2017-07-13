import { SkyVisualTest} from '../../../config/utils/visual-test-commands';

import { element, by } from 'protractor';

fdescribe('Colorpicker', () => {

  it('should match previous colorpicker screenshot', () => {
    return SkyVisualTest.setupTest('colorpicker')
    .then(() => {
      SkyVisualTest.moveCursorOffScreen();
      return SkyVisualTest.compareScreenshot({
          screenshotName: 'colorpicker',
          selector: '#screenshot-colorpicker'
        });
    });

  });
/*
  it('should match previous monthpicker screenshot', () => {
    return SkyVisualTest.setupTest('colorpicker')
    .then(() => {
      element(by.css('.sky-colorpicker-calendar-title')).click();
      SkyVisualTest.moveCursorOffScreen()
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'Colorpicker-monthpicker',
        selector: '#screenshot-colorpicker-calendar'
      });
    });

  });

  it('should match previous yearpicker screenshot', () => {
    return SkyVisualTest.setupTest('colorpicker')
    .then(() => {
      element(by.css('.sky-colorpicker-calendar-title')).click();
      element(by.css('.sky-colorpicker-calendar-title')).click();
      SkyVisualTest.moveCursorOffScreen()
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'Colorpicker-yearpicker',
        selector: '#screenshot-colorpicker-calendar'
      });
    });

  });

  it('should match previous Colorpicker input screenshot', () => {
    return SkyVisualTest.setupTest('colorpicker')
    .then(() => {
      SkyVisualTest.moveCursorOffScreen()
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'Colorpicker-input',
        selector: '#screenshot-colorpicker'
      });
    });

  });

  it('should match previous Colorpicker input screenshot when open', () => {
    return SkyVisualTest.setupTest('colorpicker')
    .then(() => {
       element(by.css('.sky-dropdown-button')).click();
      SkyVisualTest.moveCursorOffScreen()
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'Colorpicker-input-open',
        selector: '#screenshot-colorpicker'
      });
    });

  });

  */
});
