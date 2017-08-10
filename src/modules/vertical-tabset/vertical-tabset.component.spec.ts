import { TestBed } from '@angular/core/testing';
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

  it('first tab in open group should be selected', () => {
    let fixture = TestBed.createComponent(VerticalTabsetTestComponent);
    let el = fixture.nativeElement as HTMLElement;

    fixture.detectChanges();

    // check open tab
    const content = el.querySelector('.sky-vertical-tabset-content');
    expect(content.textContent.trim()).toBe('Group 1 Tab 1 content');

    // check open group
    const openGroup = el.querySelectorAll('.sky-tab-group-header-sub-open');
    expect(openGroup.length).toBe(1);
    expect(openGroup[0].textContent.trim()).toBe('Group 1');
  });

  it('open second tab in second group', () => {
    let fixture = TestBed.createComponent(VerticalTabsetTestComponent);
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

  // it('check closing of group', () => {
  //   let fixture = TestBed.createComponent(VerticalTabsetTestComponent);
  //   let el = fixture.nativeElement as HTMLElement;

  //   fixture.detectChanges();

  //   // click first group to close it
  //   const group = el.querySelectorAll('.sky-tab-group-header')[1];
  //   group.click();

  //   fixture.detectChanges();
  // });

  // test opening tab group and tab

  // test mobile button is not visible on a wide screen

  // test mobile view
});
