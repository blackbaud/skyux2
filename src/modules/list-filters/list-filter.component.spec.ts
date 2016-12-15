import {
  TestBed,
  async
} from '@angular/core/testing';
import { SkyListFiltersModule } from './';
import {
  ListFilterEmptyTestComponent
} from './fixtures/list-filter-empty.component.fixture';

describe('List Filter Component', () => {
  let fixture: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListFilterEmptyTestComponent
      ],
      imports: [
        SkyListFiltersModule
      ]
    });
  }));

  describe('Empty Fixture', () => {
    it('should throw error if name not defined', () => {
        try {
          fixture = TestBed.createComponent(ListFilterEmptyTestComponent);
          fixture.detectChanges();
        } catch (error) {
          expect(error.originalError.message).toBe('Sky List Filter requires a name.');
        }
    });
  });
});
