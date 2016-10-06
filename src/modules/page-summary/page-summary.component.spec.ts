import { TestBed } from '@angular/core/testing';

import { expect } from '../testing';

import { SkyMediaQueryService } from '../media-queries';

import { MockSkyMediaQueryService } from '../testing/mocks';

import { SkyPageSummaryFixturesModule } from './fixtures/page-summary-fixtures.module';
import { SkyPageSummaryTestComponent } from './fixtures/page-summary.component.fixture';

describe('Page summary component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyPageSummaryFixturesModule
      ]
    });
  });

  it('should move the key info section on extra-small screens', () => {
    function getSelector(size: string) {
      return `.sky-page-summary-key-info-${size} .sky-page-summary-key-info-container`;
    }

    let fixture = TestBed
      .overrideComponent(
        SkyPageSummaryTestComponent,
        {
          add: {
            providers: [
              {
                provide: SkyMediaQueryService,
                useClass: MockSkyMediaQueryService
              }
            ]
          }
        }
      )
      .createComponent(SkyPageSummaryTestComponent);

      fixture.detectChanges();

      let el = fixture.nativeElement;

      let xsSelector = getSelector('xs');
      let smSelector = getSelector('sm');

      let mockQueryService: MockSkyMediaQueryService = fixture.debugElement.injector.get(
        SkyMediaQueryService
      );

      expect(el.querySelector(xsSelector)).not.toExist();
      expect(el.querySelector(smSelector)).toExist();

      mockQueryService.fire({
        matches: true
      });

      expect(el.querySelector(xsSelector)).toExist();
      expect(el.querySelector(smSelector)).not.toExist();
  });
});
