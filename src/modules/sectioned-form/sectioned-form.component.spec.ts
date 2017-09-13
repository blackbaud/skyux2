import { expect } from '@blackbaud/skyux-builder/runtime/testing/browser';
import { TestBed } from '@angular/core/testing';
import { SkySectionedFormFixturesModule } from './fixtures/sectioned-form-fixtures.module';
import { SkySectionedFormFixtureComponent } from './fixtures/sectioned-form.component.fixture';

import {
  SkySectionedFormNoSectionsFixtureComponent
} from './fixtures/sectioned-form-no-sections.component.fixture';

import {
  SkySectionedFormNoActiveFixtureComponent
} from './fixtures/sectioned-form-no-active.component.fixture';

function getVisibleContent(el: any) {
  return el.querySelectorAll('.sky-vertical-tab-content-pane:not(.sky-vertical-tab-hidden)');
}

function getActiveSection(el: any) {
  return el.querySelectorAll('sky-sectioned-form-section .sky-vertical-tab-active');
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
    let activeSection = getActiveSection(el);
    expect(activeSection.length).toBe(1);

    let heading = activeSection[0].querySelector('.sky-vertical-tab-heading');
    expect(heading.textContent.trim()).toBe('Information 2');

    let count = activeSection[0].querySelector('.sky-vertical-tab-count');
    expect(count.textContent.trim()).toBe('(2)');

    // check correct section content is displayed
    let content = getVisibleContent(el);
    expect(content.length).toBe(1);
    expect(content[0].textContent.trim()).toBe('information 2');
  });

  it('clicking tab should show content', () => {
    let fixture = createTestComponent();
    let el = fixture.nativeElement;

    fixture.detectChanges();

    // click first tab
    let firstTab = el.querySelectorAll('.sky-vertical-tab');
    firstTab[0].click();

    fixture.detectChanges();

    // check correct section tab is active
    let activeSection = getActiveSection(el);
    expect(activeSection.length).toBe(1);

    let heading = activeSection[0].querySelector('.sky-vertical-tab-heading');
    expect(heading.textContent.trim()).toBe('Information 1');

    let count = activeSection[0].querySelector('.sky-vertical-tab-count');
    // tslint:disable-next-line:no-null-keyword
    expect(count).toBe(null);

    // check correct section content is displayed
    let content = getVisibleContent(el);
    expect(content.length).toBe(1);
    expect(content[0].textContent.trim()).toBe('information 1');
  });

  it('section should respect required field change', () => {
    let fixture = createTestComponent();
    let cmp = fixture.componentInstance;
    let el = fixture.nativeElement;

    fixture.detectChanges();

    // check section is not required
    let tabs = el.querySelectorAll('sky-vertical-tab');
    expect(tabs.length).toBe(2);

    let activeTab = tabs[1];
    expect(activeTab.classList.contains('sky-tab-field-required')).toBe(false);

    // mark required
    cmp.sectionedForm.setRequired(true);
    fixture.detectChanges();

    let requiredTabs = cmp.sectionedForm.sections.filter(section => section.fieldRequired);
    expect(requiredTabs.length).toBe(1);

    // check section is required
    expect(activeTab.classList.contains('sky-tab-field-required')).toBe(true);
  });

  it('section should respect required field change after switching tabs', () => {
    let fixture = createTestComponent();
    let cmp = fixture.componentInstance;
    let el = fixture.nativeElement;

    fixture.detectChanges();

    // click first tab
    let firstTab = el.querySelectorAll('.sky-vertical-tab');
    firstTab[0].click();

    fixture.detectChanges();

    // check section is not required
    let tabs = el.querySelectorAll('sky-vertical-tab');
    expect(tabs.length).toBe(2);

    let activeTab = tabs[0];
    expect(activeTab.classList.contains('sky-tab-field-required')).toBe(false);

    // mark required
    cmp.sectionedForm.setRequired(true);
    fixture.detectChanges();

    let requiredTabs = cmp.sectionedForm.sections.filter(section => section.fieldRequired);
    expect(requiredTabs.length).toBe(1);

    // check section is required
    expect(activeTab.classList.contains('sky-tab-field-required')).toBe(true);
  });

  it('active index should be raised when tab changed', () => {
    let fixture = createTestComponent();
    let cmp = fixture.componentInstance;
    let el = fixture.nativeElement;

    fixture.detectChanges();

    let firstTab = el.querySelectorAll('.sky-vertical-tab');
    firstTab[0].click();
    expect(cmp.sectionedForm.indexChanged.getValue()).toBe(0);
  });
});

describe('Sectioned form component - no sections', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkySectionedFormFixturesModule
      ]
    });
  });

  function createTestComponent() {
    return TestBed.createComponent(SkySectionedFormNoSectionsFixtureComponent);
  }

  it('should not fail to load when no sections exist', () => {
    let fixture = createTestComponent();
    let cmp = fixture.componentInstance;
    let el = fixture.nativeElement;

    fixture.detectChanges();

    let allTabs = el.querySelectorAll('.sky-sectioned-form-tabs');
    expect(allTabs.length).toBe(1);
    expect(allTabs[0].textContent.trim()).toBe('');

    // no errors should be thrown
    cmp.sectionedForm.setRequired(true);
  });
});

describe('Sectioned form component - no active sections', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkySectionedFormFixturesModule
      ]
    });
  });

  function createTestComponent() {
    return TestBed.createComponent(SkySectionedFormNoActiveFixtureComponent);
  }

  it('should not fail to load when no active sections exist', () => {
    let fixture = createTestComponent();
    let cmp = fixture.componentInstance;
    let el = fixture.nativeElement;

    fixture.detectChanges();

    let activeSection = getActiveSection(el);
    expect(activeSection.length).toBe(0);

    let tabs = el.querySelectorAll('sky-vertical-tab');
    expect(tabs.length).toBe(2);

    // no errors should be thrown
    cmp.sectionedForm.setRequired(true);

    fixture.detectChanges();

    expect(tabs[0].classList.contains('sky-tab-field-required')).toBe(false);
    expect(tabs[1].classList.contains('sky-tab-field-required')).toBe(false);
  });
});
