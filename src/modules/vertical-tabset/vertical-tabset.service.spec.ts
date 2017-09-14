import { SkyVerticalTabsetService } from './vertical-tabset.service';
import { SkyVerticalTabComponent } from './vertical-tab.component';

class MockChangeDetector {
  public detectChanges() {}
}

describe('Vertical tabset service', () => {
  let service: SkyVerticalTabsetService;
  let mockDetectChanges: any = new MockChangeDetector();

  beforeEach(() => {
    service = new SkyVerticalTabsetService();
  });

  it('should add two non active tabs', () => {
    let tab1 = new SkyVerticalTabComponent(undefined, mockDetectChanges);
    tab1.tabHeading = 'tab 1';

    let tab2 = new SkyVerticalTabComponent(undefined, mockDetectChanges);
    tab2.tabHeading = 'tab 2';

    service.tabClicked.subscribe(index => {
      if (index >= 0) {
        fail(`tab should not have been clicked with index =${index}`);
      }
    });

    service.addTab(tab1);
    service.addTab(tab2);

    expect(service.tabs.length).toBe(2);
    expect(service.tabs[0].tabHeading).toBe('tab 1');
    expect(service.tabs[0].index).toBe(0);
    expect(service.tabs[1].tabHeading).toBe('tab 2');
    expect(service.tabs[1].index).toBe(1);
    expect(service.activeIndex).toBe(undefined);
  });

  it('should add active tab', () => {
    let tab1 = new SkyVerticalTabComponent(undefined, mockDetectChanges);
    let tab2 = new SkyVerticalTabComponent(undefined, mockDetectChanges);
    tab2.active = true;

    service.tabClicked.subscribe(index => {
      if (index >= 0) {
        expect(index).toBe(1);
      }
    });

    service.addTab(tab1);
    service.addTab(tab2);

    expect(service.activeIndex).toBe(1);
  });

  it('should deactive old active tab', () => {
    let tab1 = new SkyVerticalTabComponent(undefined, mockDetectChanges);
    tab1.active = true;
    let tab2 = new SkyVerticalTabComponent(undefined, mockDetectChanges);

    service.addTab(tab1);
    service.addTab(tab2);

    expect(service.activeIndex).toBe(0);

    tab2.active = true;
    service.activateTab(tab2);

    expect(tab1.active).toBe(false);
    expect(tab2.active).toBe(true);
    expect(service.activeIndex).toBe(1);
  });

  it('content should return undefined when no active tabs', () => {
    let tab1 = new SkyVerticalTabComponent(undefined, mockDetectChanges);
    let tab2 = new SkyVerticalTabComponent(undefined, mockDetectChanges);

    service.addTab(tab1);
    service.addTab(tab2);

    expect(service.activeTabContent()).toBe(undefined);
  });
});
