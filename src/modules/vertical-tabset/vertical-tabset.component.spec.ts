import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';

import { SkyVerticalTabsFixturesModule } from './fixtures/vertical-tabs-fixtures.module';
import { VerticalTabsetTestComponent } from './fixtures/vertical-tabset.component.fixture';

describe('Vertical tabset component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyVerticalTabsFixturesModule
      ]
    });
  });

  it('first tab in open group should be selected', () => {
    let fixture = TestBed.createComponent(VerticalTabsetTestComponent);
    let el = fixture.nativeElement as HTMLElement;

    fixture.detectChanges();

    const content = el.querySelector('.sky-vertical-tabset-content');

    expect(content.textContent.trim()).toBe('Group 1 Tab 1 content');
  });

  // test mobile view
});
