import { TestBed } from '@angular/core/testing';
import { SkyVerticalTabsFixturesModule } from './fixtures/vertical-tabs-fixtures.module';
import { SkyVerticalTabsetComponent } from '../vertical-tabset/vertical-tabset.component';
import { VerticalTabsetTestComponent } from './fixtures/vertical-tabset.component.fixture';
import { MockSkyMediaQueryService } from './../testing/mocks/mock-media-query.service';
import { SkyMediaQueryService, SkyMediaBreakpoints } from '../media-queries';

let mockQueryService = new MockSkyMediaQueryService();

describe('Vertical tabset component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyVerticalTabsFixturesModule
      ],
      providers: [
        { provide: SkyMediaQueryService, useValue: mockQueryService}
      ]
    });
  });

  function createTestComponent() {
    return TestBed.overrideComponent(SkyVerticalTabsetComponent, {
      add: {
        providers: [
          { provide: SkyMediaQueryService, useValue: mockQueryService }
        ]
      }
    })
    .createComponent(VerticalTabsetTestComponent);
  }

  it('first tab in open group should be selected', () => {
    mockQueryService.current = SkyMediaBreakpoints.lg;
    let fixture = createTestComponent();
    let el = fixture.nativeElement as HTMLElement;

    fixture.detectChanges();

    // check open tab content
    const content = el.querySelector('.sky-vertical-tabset-content');
    expect(content.textContent.trim()).toBe('Group 1 Tab 1 content');

    // check open group
    const openGroup = el.querySelectorAll('.sky-tab-group-header-sub-open');
    expect(openGroup.length).toBe(1);
    expect(openGroup[0].textContent.trim()).toBe('Group 1');
  });

  it('open second tab in second group', () => {
    mockQueryService.current = SkyMediaBreakpoints.lg;
    let fixture = createTestComponent();
    fixture.detectChanges();
    let el = fixture.nativeElement;

    // open second group
    const group = el.querySelectorAll('.sky-tab-group-header');
    group[1].click();

    fixture.detectChanges();

    // check second group open
    const openedGroups = el.querySelectorAll('.sky-tab-group-icon-open');
    expect(openedGroups.length).toBe(2);

    // click second tab in second group
    const tabs = el.querySelectorAll('.sky-vertical-tab');
    tabs[3].click();

    fixture.detectChanges();

    // check open tab
    const visibleTab = el.querySelectorAll('.sky-vertical-tab-visible');
    expect(visibleTab.length).toBe(1);
    expect(visibleTab[0].textContent.trim()).toBe('Group 2 Tab 2 content');

    // check open group
    const openGroup = el.querySelectorAll('.sky-tab-group-header-sub-open');
    expect(openGroup.length).toBe(1);
    expect(openGroup[0].textContent.trim()).toBe('Group 2');
  });

  it('check closing of group', () => {
    mockQueryService.current = SkyMediaBreakpoints.lg;
    let fixture = createTestComponent();
    let el = fixture.nativeElement;

    fixture.detectChanges();

    // close first group
    const group = el.querySelectorAll('.sky-tab-group-header');
    group[0].click();

    fixture.detectChanges();

    // check group is closed
    const openGroups = el.querySelectorAll('.sky-tab-group-icon-open');
    expect(openGroups.length).toBe(0);
  });

  it('mobile button should not be visible on wide screen', () => {
    mockQueryService.current = SkyMediaBreakpoints.lg;
    let fixture = createTestComponent();
    let el = fixture.nativeElement;

    fixture.detectChanges();

    // check show tabs button is not visible
    const showTabsButton = el.querySelectorAll('.sky-vertical-tabset-show-tabs');
    expect(showTabsButton.length).toBe(0);
  });

  it('mobile button should be visible on small screen', () => {
    mockQueryService.current = SkyMediaBreakpoints.xs;
    let fixture = createTestComponent();
    let el = fixture.nativeElement;

    fixture.detectChanges();

    // check show tabs button is visible
    const showTabsButton = el.querySelectorAll('.sky-vertical-tabset-show-tabs');
    expect(showTabsButton.length).toBe(1);
    expect(showTabsButton[0].textContent.trim()).toBe('Tab list');

    // check content is visible
    const content = el.querySelector('.sky-vertical-tabset-content .sky-vertical-tab-visible');
    expect(content.textContent.trim()).toBe('Group 1 Tab 1 content');

    // check tabs are not visible
    const tabs = el.querySelectorAll('.sky-vertical-tabset-group-container');
    expect(tabs.length).toBe(0);
  });

  it('show tabs button should show tabs on mobile', () => {
    mockQueryService.current = SkyMediaBreakpoints.xs;
    let fixture = createTestComponent();
    let el = fixture.nativeElement;

    fixture.detectChanges();

    // check tabs are not visible
    const tabs = el.querySelectorAll('.sky-vertical-tabset-group-container');
    expect(tabs.length).toBe(0);

    // check content is visible
    const content = el.querySelector('.sky-vertical-tabset-content .sky-vertical-tab-visible');
    expect(content.textContent.trim()).toBe('Group 1 Tab 1 content');

    // click show tabs
    const showTabsButton = el.querySelector('.sky-vertical-tabset-show-tabs');
    showTabsButton.click();

    fixture.detectChanges();

    // check tabs are visible
    const tabsUpdated = el.querySelectorAll('.sky-vertical-tabset-group-container');
    expect(tabsUpdated.length).toBe(1);

    // check content is not visible
    const contentUpdated = el.querySelectorAll('.sky-vertical-tab-visible');
    expect(content.textContent.trim()).toBe('Group 1 Tab 1 content');
  });

  it('clicking a tab in mobile should show content and hides tabs', () => {
    mockQueryService.current = SkyMediaBreakpoints.xs;
    let fixture = createTestComponent();
    let el = fixture.nativeElement;

    fixture.detectChanges();

    // click show tabs
    const showTabsButton = el.querySelector('.sky-vertical-tabset-show-tabs');
    showTabsButton.click();

    fixture.detectChanges();

    // click second tab in first group
    const allTabs = el.querySelectorAll('.sky-vertical-tab');
    allTabs[1].click();

    fixture.detectChanges();

    // check tabs are not visible
    const tabs = el.querySelectorAll('.sky-vertical-tabset-group-container');
    expect(tabs.length).toBe(0);

    // check content is visible
    const content = el.querySelector('.sky-vertical-tabset-content .sky-vertical-tab-visible');
    expect(content.textContent.trim()).toBe('Group 1 Tab 2 content');
  });

  // check switching from widescreen to mobile
  // check switching from mobile to widescreen
});
