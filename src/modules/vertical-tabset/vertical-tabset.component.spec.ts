import { TestBed } from '@angular/core/testing';
import { SkyVerticalTabsFixturesModule } from './fixtures/vertical-tabs-fixtures.module';
import { SkyVerticalTabsetComponent } from '../vertical-tabset/vertical-tabset.component';
import { VerticalTabsetTestComponent } from './fixtures/vertical-tabset.component.fixture';

import {
  VerticalTabsetEmptyGroupTestComponent
} from './fixtures/vertical-tabset-empty-group.component';

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
    const openedGroups = el.querySelectorAll('.sky-chevron-up');
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
    const openedGroups = el.querySelectorAll('.sky-chevron-up');
    expect(openedGroups.length).toBe(0);
  });

  it('disabled group should not open when clicked', () => {
    mockQueryService.current = SkyMediaBreakpoints.lg;
    let fixture = createTestComponent();
    let el = fixture.nativeElement;

    fixture.detectChanges();

    // click disabled group
    const group = el.querySelectorAll('.sky-tab-group-header');
    group[2].click();

    fixture.detectChanges();

    // check group is still closed (only first group still open)
    const openedGroups = el.querySelectorAll('.sky-chevron-up');
    expect(openedGroups.length).toBe(1);
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
    expect(contentUpdated.length).toBe(0);
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

  it('should hide tabs when switching from widescreen to mobile', () => {
    mockQueryService.current = SkyMediaBreakpoints.lg;
    let fixture = createTestComponent();
    let el = fixture.nativeElement;

    fixture.detectChanges();

    // switch to mobile
    mockQueryService.fire(SkyMediaBreakpoints.xs);

    fixture.detectChanges();

    // check tabs are not visible
    const tabs = el.querySelectorAll('.sky-vertical-tabset-group-container');
    expect(tabs.length).toBe(0);

    // check content is visible
    const content = el.querySelector('.sky-vertical-tabset-content .sky-vertical-tab-visible');
    expect(content.textContent.trim()).toBe('Group 1 Tab 1 content');

    // check show tabs button is visible
    const showTabsButton = el.querySelector('.sky-vertical-tabset-show-tabs');
    showTabsButton.click();
  });

  it('should show tabs and hide tab list button when switching from mobile to widescreen', () => {
    mockQueryService.current = SkyMediaBreakpoints.xs;
    let fixture = createTestComponent();
    let el = fixture.nativeElement;

    fixture.detectChanges();

    // switch to widescreen
    mockQueryService.fire(SkyMediaBreakpoints.lg);

    fixture.detectChanges();

    // check tabs are visible
    const tabs = el.querySelectorAll('.sky-vertical-tabset-group-container');
    expect(tabs.length).toBe(1);

    // check content is visible
    const content = el.querySelector('.sky-vertical-tabset-content .sky-vertical-tab-visible');
    expect(content.textContent.trim()).toBe('Group 1 Tab 1 content');

    // check show tabs button is not visible
    const showTabsButton = el.querySelectorAll('.sky-vertical-tabset-show-tabs');
    expect(showTabsButton.length).toBe(0);
  });

  it('should deactivate active tab when another tab is clicked', () => {
    mockQueryService.current = SkyMediaBreakpoints.lg;
    let fixture = createTestComponent();
    fixture.detectChanges();
    let el = fixture.nativeElement;

    // click first tab in first group
    let tabs = el.querySelectorAll('.sky-vertical-tab');
    tabs[0].click();

    fixture.detectChanges();

    // check open tab
    let visibleTabs = el.querySelectorAll('.sky-vertical-tab-visible');
    expect(visibleTabs.length).toBe(1);
    expect(visibleTabs[0].textContent.trim()).toBe('Group 1 Tab 1 content');

    // check open group
    let openGroups = el.querySelectorAll('.sky-tab-group-header-sub-open');
    expect(openGroups.length).toBe(1);
    expect(openGroups[0].textContent.trim()).toBe('Group 1');

    // click second tab in first group
    tabs = el.querySelectorAll('.sky-vertical-tab');
    tabs[1].click();

    fixture.detectChanges();

    // check open tab
    visibleTabs = el.querySelectorAll('.sky-vertical-tab-visible');
    expect(visibleTabs.length).toBe(1);
    expect(visibleTabs[0].textContent.trim()).toBe('Group 1 Tab 2 content');

    // check open group
    openGroups = el.querySelectorAll('.sky-tab-group-header-sub-open');
    expect(openGroups.length).toBe(1);
    expect(openGroups[0].textContent.trim()).toBe('Group 1');
  });

  it('tabbing to first tab adds highlight class', () => {
    mockQueryService.current = SkyMediaBreakpoints.lg;
    let fixture = createTestComponent();
    fixture.detectChanges();
    let firstTab = fixture.componentInstance.verticalTabs;

    // check first tab is not highlighted
    expect(firstTab.outline).toBe(false);

    // hit a different keystroke
    firstTab.tabPress({ which: 10 } as any);

    // check tab is not highlighted
    expect(firstTab.outline).toBe(false);

    // tab to first tab
    firstTab.tabPress({ which: 9 } as any);

    // check tab is not highlighted
    expect(firstTab.outline).toBe(true);
  });

  it('should display tab header count when defined', () => {
    mockQueryService.current = SkyMediaBreakpoints.lg;
    let fixture = createTestComponent();
    let el = fixture.nativeElement as HTMLElement;

    fixture.detectChanges();

    // check open tab content
    const activeTab = el.querySelectorAll('.sky-vertical-tab-active');
    expect(activeTab.length).toBe(1);
    const headerCount = activeTab[0].querySelector('.sky-vertical-tab-count');
    expect(headerCount.textContent.trim()).toBe('(5)');
  });

  it('should not display tab header count when not defined', () => {
    mockQueryService.current = SkyMediaBreakpoints.lg;
    let fixture = createTestComponent();
    let el = fixture.nativeElement;

    fixture.detectChanges();

    // open second group
    const group = el.querySelectorAll('.sky-tab-group-header');
    group[1].click();

    fixture.detectChanges();

    // click first tab in second group
    const tabs = el.querySelectorAll('.sky-vertical-tab');
    tabs[2].click();

    fixture.detectChanges();

    // check tab header count is not displayed
    const activeTab = el.querySelectorAll('.sky-vertical-tab-active');
    expect(activeTab.length).toBe(1);
    const headerCount = activeTab[0].querySelector('.sky-vertical-tab-count');
    // tslint:disable-next-line:no-null-keyword
    expect(headerCount).toBe(null);
  });
});

// test tab group with no subtabs
describe('Vertical tabset component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyVerticalTabsFixturesModule
      ]
    });
  });

  it('group without tab should load without failing', () => {
    let fixture = TestBed.createComponent(VerticalTabsetEmptyGroupTestComponent);
    let el = fixture.nativeElement as HTMLElement;

    fixture.detectChanges();

    const contentUpdated = el.querySelectorAll('.sky-vertical-tab-visible');
    expect(contentUpdated.length).toBe(0);
  });
});
