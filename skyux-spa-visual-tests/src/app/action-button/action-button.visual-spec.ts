import {
  // SkyA11y,
  SkyHostBrowser,
  SkyVisualTest
} from '@blackbaud/skyux-builder/runtime/testing/e2e';

fdescribe('Action button', () => {
  it('should match previous action button screenshot', () => {
    SkyHostBrowser.get('action-button');

    SkyVisualTest.moveCursorOffScreen();

    SkyVisualTest.compareScreenshot({
      screenshotName: 'action-button',
      selector: '#screenshot-action-button',
      breakpoint: 'sm'
    });

    // SkyA11y
    //   .run()
    //   .then((violations: number) => {
    //     expect(violations).toEqual(0);
    //   });
  });

  // it('should match previous action button screenshot on small screens', () => {
  //   return SkyVisualTest
  //     .setupTest('action-button', 480)
  //     .then(() => {
  //       SkyVisualTest.moveCursorOffScreen();
  //       return SkyVisualTest.compareScreenshot({
  //         screenshotName: 'action-button-small',
  //         selector: '#screenshot-action-button'
  //       });
  //     });

  // });

  // it('should match previous action button containerscreenshot', () => {
  //   return SkyVisualTest
  //     .setupTest('action-button')
  //     .then(() => {
  //       SkyVisualTest.moveCursorOffScreen();
  //       return SkyVisualTest.compareScreenshot({
  //           screenshotName: 'action-button-container',
  //           selector: '#screenshot-action-button-container'
  //         });
  //     });

  // });

  // it('should match previous action button container screenshot on small screens', () => {
  //   return SkyVisualTest
  //     .setupTest('action-button', 480)
  //     .then(() => {
  //       SkyVisualTest.moveCursorOffScreen();
  //       return SkyVisualTest.compareScreenshot({
  //         screenshotName: 'action-button-container-small',
  //         selector: '#screenshot-action-button-container'
  //       });
  //     });

  // });
});
