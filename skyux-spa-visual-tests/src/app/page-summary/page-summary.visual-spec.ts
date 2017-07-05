import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { browser, element, by } from 'protractor';

describe('Page summary', () => {

  function clickTest(
    screenshotName: string, visibleComponents: Array<string>, screenWidth?: number) {
    return SkyVisualTest.setupTest('page-summary', screenWidth)
    .then(() => {
      element(by.css('#screenshots-page-summary-items')).sendKeys(visibleComponents.join(','));
      return SkyVisualTest.compareScreenshot({
        screenshotName: ('pagesummary-' + screenshotName),
        selector: '#screenshots-page-summary',
        checkAccessibility: true
      });
    });

  }

  it(
    'should match previous pagesummary screenshot when all components are present',
    () => {
      return clickTest(
        'all',
        [
            'Title',
            'Subtitle',
            'Image',
            'Status',
            'KeyInfo',
            'Content',
            'Alert'
        ]
      );
    }
  );

  it(
    'should match previous pagesummary screenshot when all components are present on small screens',
    () => {
      return clickTest(
        'all',
        [
          'Title',
          'Subtitle',
          'Image',
          'Status',
          'KeyInfo',
          'Content',
          'Alert'
        ],
        480
      );
    }
  );

  it(
    'should match previous pagesummary screenshot when no image is present',
    () => {
      return clickTest(
        'noimage',
        [
          'Title',
          'Subtitle',
          'Status',
          'KeyInfo',
          'Content',
          'Alert'
        ]
      );
    }
  );

  it(
    'should match previous pagesummary screenshot when no subtitle is present',
    () => {
      return clickTest(
        'nosubtitle',
        [
          'Title',
          'Image',
          'Status',
          'KeyInfo',
          'Content',
          'Alert'
        ]
      );
    }
  );

  it(
    'should match previous pagesummary screenshot when no status is present',
    () => {
      return clickTest(
        'nostatus',
        [
          'Title',
          'Subtitle',
          'Image',
          'KeyInfo',
          'Content',
          'Alert'
        ]
      );
    }
  );

  it('should match previous pagesummary screenshot when no key info is present',
  () => {
      return clickTest(
        'nokeyinfo',
        [
          'Title',
          'Subtitle',
          'Image',
          'Status',
          'Content',
          'Alert'
        ]
      );
    }
  );

  it(
    'should match previous pagesummary screenshot when no additional content is present',
    () => {
      return clickTest(
        'nocontent',
        [
          'Title',
          'Subtitle',
          'Image',
          'Status',
          'KeyInfo',
          'Alert'
        ]
      );
    }
  );

  it(
    'should match previous pagesummary screenshot when no alert is present',
    () => {
      return clickTest(
        'noalert',
        [
          'Title',
          'Subtitle',
          'Image',
          'Status',
          'KeyInfo',
          'Content'
        ]
      );
    }
  );

  it(
    'should match previous pagesummary screenshot when only image, title, and subtitle are present',
    () => {
      return clickTest(
        'image_title_subtitle',
        [
            'Title',
            'Subtitle',
            'Image'
        ]
      );
    }
  );

  it(
    'should match previous pagesummary screenshot when only image, title, and subtitle are ' +
    'present on small screens',
    () => {
      return clickTest(
        'image_title_subtitle',
        [
          'Title',
          'Subtitle',
          'Image'
        ],
        480
      );
    }
  );
});
