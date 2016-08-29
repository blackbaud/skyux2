describe('Card', () => {
  'use strict';

  it('should match previous screenshot when all components are present', function (done) {
    browser
      .setupTest('/card.html')
      .compareScreenshot({
        screenshotName: 'card-all',
        selector: '#screenshot-card-all',
        checkAccessibility: true
      })
      .call(done);
  });

  it('should match previous screenshot when no header is present', function (done) {
    browser
      .setupTest('/card.html')
      .compareScreenshot({
        screenshotName: 'card-noheader',
        selector: '#screenshot-card-noheader',
        checkAccessibility: true
      })
      .call(done);
  });

  it('should match previous screenshot when no actions are present', function (done) {
    browser
      .setupTest('/card.html')
      .compareScreenshot({
        screenshotName: 'card-noactions',
        selector: '#screenshot-card-noactions',
        checkAccessibility: true
      })
      .call(done);
  });

  it('should match previous screenshot when selectable', function (done) {
    browser
      .setupTest('/card.html')
      .compareScreenshot({
        screenshotName: 'card-selectable',
        selector: '#screenshot-card-selectable',
        checkAccessibility: true
      })
      .call(done);
  });

  it('should match previous screenshot when the card is selected', function (done) {
    browser
      .setupTest('/card.html')
      .click('.sky-card-title')
      .compareScreenshot({
        screenshotName: 'card-selected',
        selector: '#screenshot-card-selectable',
        checkAccessibility: true
      })
      .call(done);
  });

});
