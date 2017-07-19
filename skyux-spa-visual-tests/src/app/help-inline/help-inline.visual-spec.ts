import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

describe('Help inline', () => {
    it('should match previous help inline screenshot', () => {
        return SkyVisualTest
          .setupTest('help-inline')
          .then(() => {
              SkyVisualTest.compareScreenshot({
                  screenshotName: 'help-inline',
                  selector: '#screenshot-help-inline',
                  checkAccessibility: true
              })
          })
    })
})