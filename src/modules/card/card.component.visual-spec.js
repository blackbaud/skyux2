describe('Card', () => {
  'use strict';

  it('should match previous screenshot when all components are present', function () {
    return browser
      .setupTest('/card.html')
      .compareScreenshot({
        screenshotName: 'card-all',
        selector: '#screenshot-card-all',
        checkAccessibility: true
      });
  });

  it('should match previous screenshot when no header is present', function () {
    return browser
      .setupTest('/card.html')
      .compareScreenshot({
        screenshotName: 'card-noheader',
        selector: '#screenshot-card-noheader',
        checkAccessibility: true
      });
  });

  it('should match previous screenshot when no actions are present', function () {
    return browser
      .setupTest('/card.html')
      .compareScreenshot({
        screenshotName: 'card-noactions',
        selector: '#screenshot-card-noactions',
        checkAccessibility: true
      });
  });

  it('should match previous screenshot when selectable', function () {
    return browser
      .setupTest('/card.html')
      .compareScreenshot({
        screenshotName: 'card-selectable',
        selector: '#screenshot-card-selectable',
        checkAccessibility: true
      });
  });

  it('should match previous screenshot when the card is selected', function () {
    return browser
      .setupTest('/card.html')
      .click('.sky-card-title')
      .compareScreenshot({
        screenshotName: 'card-selected',
        selector: '#screenshot-card-selectable',
        checkAccessibility: true
      });
  });

});
