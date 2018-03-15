import { visualTest } from '../shared/visual-test';

describe('Action button', () => {
  it('should match previous action button screenshot', () => {
    visualTest({
      screenshotName: 'action-button',
      selector: '#screenshot-action-button'
    });
  });

  it('should match previous action button screenshot on small screens', () => {
    visualTest({
      screenshotName: 'action-button-xs',
      selector: '#screenshot-action-button',
      breakpoint: 'xs'
    });
  });

  it('should match previous action button containerscreenshot', () => {
    visualTest({
      screenshotName: 'action-button-container',
      selector: '#screenshot-action-button-container'
    });
  });

  it('should match previous action button container screenshot on small screens', () => {
    visualTest({
      screenshotName: 'action-button-container-xs',
      selector: '#screenshot-action-button-container',
      breakpoint: 'xs'
    });
  });
});
