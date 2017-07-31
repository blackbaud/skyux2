import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { element, by } from 'protractor';

describe('Card', () => {

  it('should match previous screenshot when all components are present', () => {
    return SkyVisualTest
      .setupTest('card')
      .then(() => {
        return SkyVisualTest
          .compareScreenshot({
            screenshotName: 'card-all',
            selector: '#screenshot-card-all',
            checkAccessibility: true
          });
      });
  });

  it('should match previous screenshot when no header is present', () => {
    return SkyVisualTest
      .setupTest('card')
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'card-noheader',
          selector: '#screenshot-card-noheader',
          checkAccessibility: true
        });
      });
  });

  it('should match previous screenshot when no actions are present', () => {
    return SkyVisualTest.setupTest('card')
    .then(() => {
      SkyVisualTest.scrollElementIntoView('#screenshot-card-noactions');
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'card-noactions',
        selector: '#screenshot-card-noactions',
        checkAccessibility: true
      });
    });
  });

  it('should match previous screenshot when selectable', () => {
    return SkyVisualTest.setupTest('card')
    .then(() => {
      SkyVisualTest.scrollElementIntoView('#screenshot-card-selectable');
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'card-selectable',
        selector: '#screenshot-card-selectable',
        checkAccessibility: true
      });
    });
  });

  it('should match previous screenshot when the card is selected', () => {
    return SkyVisualTest.setupTest('card')
    .then(() => {
      SkyVisualTest.scrollElementIntoView('#screenshot-card-selectable');
      element(by.css('#screenshot-card-selectable .sky-card-title')).click()
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'card-selected',
        selector: '#screenshot-card-selectable',
        checkAccessibility: true
      });
    });
  });

  it('should match previous screenshot when the card has title overflow', () => {
    return SkyVisualTest.setupTest('card')
    .then(() => {
      SkyVisualTest.scrollElementIntoView('#screenshot-card-overflow');
      SkyVisualTest.compareScreenshot({
        screenshotName: 'card-title-overflow',
        selector: '#screenshot-card-overflow',
        checkAccessibility: true
      });
    });
  });

});
