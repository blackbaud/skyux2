import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { element, by, browser } from 'protractor';

describe('Card', () => {

  it('should match previous screenshot when all components are present', () => {
    SkyVisualTest.setupTest('/card');

    return SkyVisualTest
      .compareScreenshot({
        screenshotName: 'card-all',
        selector: '#screenshot-card-all',
        checkAccessibility: true
      });
  });

  it('should match previous screenshot when no header is present', () => {
    SkyVisualTest.setupTest('/card');
    return SkyVisualTest.compareScreenshot({
        screenshotName: 'card-noheader',
        selector: '#screenshot-card-noheader',
        checkAccessibility: true
      });
  });

  it('should match previous screenshot when no actions are present', () => {
    SkyVisualTest.setupTest('/card');
    SkyVisualTest.scrollElementIntoView('#screenshot-card-noactions');
    return SkyVisualTest.compareScreenshot({
        screenshotName: 'card-noactions',
        selector: '#screenshot-card-noactions',
        checkAccessibility: true
      });
  });

  it('should match previous screenshot when selectable', () => {
    SkyVisualTest.setupTest('/card');
    SkyVisualTest.scrollElementIntoView('#screenshot-card-selectable');
    return SkyVisualTest.compareScreenshot({
        screenshotName: 'card-selectable',
        selector: '#screenshot-card-selectable',
        checkAccessibility: true
      });
  });

  it('should match previous screenshot when the card is selected', () => {
    SkyVisualTest.setupTest('/card');
    SkyVisualTest.scrollElementIntoView('#screenshot-card-selectable');
    element(by.css('#screenshot-card-selectable .sky-card-title')).click()
    return SkyVisualTest.compareScreenshot({
        screenshotName: 'card-selected',
        selector: '#screenshot-card-selectable',
        checkAccessibility: true
      });
  });

  it('should match previous screenshot when the card has title overflow', () => {
    SkyVisualTest.setupTest('/card');
    SkyVisualTest.scrollElementIntoView('#screenshot-card-overflow');
    SkyVisualTest.compareScreenshot({
        screenshotName: 'card-title-overflow',
        selector: '#screenshot-card-overflow',
        checkAccessibility: true
      });
  });

});
