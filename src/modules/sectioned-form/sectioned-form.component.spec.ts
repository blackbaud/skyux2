import { TestBed } from '@angular/core/testing';
import { SkySectionedFormFixturesModule } from './fixtures/sectioned-form-fixtures.module';
import { SkySectionedFormFixtureComponent } from './fixtures/sectioned-form.component.fixture';

function getVisibleContent(el: any) {
  return el.querySelectorAll('#verticalTab:not(.sky-vertical-tab-hidden)');
}

describe('Sectioned form component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkySectionedFormFixturesModule
      ]
    });
  });

  function createTestComponent() {
    return TestBed.createComponent(SkySectionedFormFixtureComponent);
  }

  it('active tab should be open', () => {
    let fixture = createTestComponent();
    let el = fixture.nativeElement as HTMLElement;

    fixture.detectChanges();

    // check correct section tab is active
    const activeSection =
      el.querySelectorAll('sky-sectioned-form-section .sky-vertical-tab-active');
    expect(activeSection.length).toBe(1);

    const heading = activeSection[0].querySelector('.sky-vertical-tab-heading');
    expect(heading.textContent.trim()).toBe('Information 2');

    const count = activeSection[0].querySelector('.sky-vertical-tab-count');
    expect(count.textContent.trim()).toBe('(2)');

    // check correct section content is displayed
    const content = getVisibleContent(el);
    expect(content.length).toBe(1);
    expect(content[0].textContent.trim()).toBe('information 2');
  });
});
