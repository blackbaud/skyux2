import { provide } from '@angular/core';
import {
  addProviders,
  ComponentFixture,
  fakeAsync,
  inject,
  TestComponentBuilder,
  tick
} from '@angular/core/testing';

import { SkyTabsetComponent } from './tabset.component';
import { SkyTabsetAdapterService } from './tabset-adapter.service';
import { TabsetTestComponent } from './fixtures/tabset.component.fixture';
import { MockTabsetAdapterService } from './fixtures/tabset-adapter.service.mock';

describe('Tabset component', () => {
  let tcb: TestComponentBuilder;
  let mockAdapterService: MockTabsetAdapterService;

  function validateTabSelected(el: Element, tabIndex: number) {
    let selectedCls: string;
    let buttonEls: NodeListOf<Element>;

    if (el.querySelector('.sky-tabset-mode-dropdown')) {
      selectedCls = 'sky-tab-dropdown-item-selected';
      buttonEls = el.querySelectorAll('.sky-tab-dropdown-item');
    } else {
      selectedCls = 'sky-tab-button-selected';
      buttonEls = el.querySelectorAll('.sky-tab-button');
    }

    let contentEls = el.querySelectorAll('.sky-tab');

    for (let i = 0, n = buttonEls.length; i < n; i++) {
      let buttonEl = buttonEls[i];
      let panelDisplay = getComputedStyle(contentEls[i]).display;
      let expectedHasClass: boolean;
      let expectedDisplay: string;

      if (i === tabIndex) {
        expectedHasClass = true;
        expectedDisplay = 'block';
      } else {
        expectedHasClass = false;
        expectedDisplay = 'none';
      }

      expect(buttonEl.classList.contains(selectedCls)).toBe(expectedHasClass);
      expect(panelDisplay).toBe(expectedDisplay);
    }
  }

  beforeEach(() => {
    addProviders([
      provide(SkyTabsetAdapterService, {useClass: MockTabsetAdapterService})
    ]);
  });

  beforeEach(
    inject(
      [
        TestComponentBuilder,
        SkyTabsetAdapterService
      ],
      (_tcb: TestComponentBuilder, _mockAdapterService: MockTabsetAdapterService) => {
        tcb = _tcb;
        mockAdapterService = _mockAdapterService;
      }
    )
  );

  describe('tabs with active attribute', () => {
    it('should change the active tab when tab active is set to true', () => {
      return tcb
        .createAsync(TabsetTestComponent)
        .then((fixture: ComponentFixture<TabsetTestComponent>) => {
          let cmp: TabsetTestComponent = fixture.componentInstance;
          let el = fixture.nativeElement;

          fixture.detectChanges();

          cmp.activeTab = 1;

          fixture.detectChanges();

          validateTabSelected(el, 1);
        });
    });

    it('should change the active tab when the tab is clicked manually', () => {
      return tcb
        .createAsync(TabsetTestComponent)
        .then((fixture: ComponentFixture<TabsetTestComponent>) => {
          let el = fixture.nativeElement;

          fixture.detectChanges();

          el.querySelectorAll('.sky-btn-tab')[1].click();

          fixture.detectChanges();

          validateTabSelected(el, 1);
        });
    });

    it('should initialize the tabs properly when active is set to true', () => {
      return tcb
        .createAsync(TabsetTestComponent)
        .then((fixture: ComponentFixture<TabsetTestComponent>) => {
          let cmp: TabsetTestComponent = fixture.componentInstance;
          let el = fixture.nativeElement;

          cmp.activeTab = 1;

          fixture.detectChanges();

          validateTabSelected(el, 1);
        });
    });
  });

  describe('Xs tab heading', () => {
    xit('should add a tab heading that is visible at xs breakpoints', () => {
    });
  });

  it('should notify the consumer when the add tab button is clicked', () => {
    let template = `<sky-tabset (newTab)="newTab()"></sky-tabset>`;

    return tcb
      .overrideTemplate(TabsetTestComponent, template)
      .createAsync(TabsetTestComponent)
      .then((fixture: ComponentFixture<TabsetTestComponent>) => {
        let cmp: TabsetTestComponent = fixture.componentInstance;
        let el = fixture.nativeElement;

        fixture.detectChanges();

        let newTabSpy = spyOn(cmp, 'newTab');

        el.querySelector('.sky-tabset-btn-new').click();

        expect(newTabSpy).toHaveBeenCalled();
      });
  });

  it('should notify the consumer when the new tab button is clicked', () => {
    let template = `<sky-tabset (openTab)="openTab()"></sky-tabset>`;

    return tcb
      .overrideTemplate(TabsetTestComponent, template)
      .createAsync(TabsetTestComponent)
      .then((fixture: ComponentFixture<TabsetTestComponent>) => {
        let cmp: TabsetTestComponent = fixture.componentInstance;
        let el = fixture.nativeElement;

        fixture.detectChanges();

        let openTabSpy = spyOn(cmp, 'openTab');

        el.querySelector('.sky-tabset-btn-open').click();

        expect(openTabSpy).toHaveBeenCalled();
      });
  });

  it('should notify the consumer when a tab\'s close button is clicked', () => {
    let template = `<sky-tabset (openTab)="openTab()"></sky-tabset>`;

    return tcb
      .overrideTemplate(TabsetTestComponent, template)
      .createAsync(TabsetTestComponent)
      .then((fixture: ComponentFixture<TabsetTestComponent>) => {
        let cmp: TabsetTestComponent = fixture.componentInstance;
        let el = fixture.nativeElement;

        fixture.detectChanges();

        let closeTabSpy = spyOn(cmp, 'closeTab');

        el.querySelector('.sky-btn-tab')[1].querySelector('.sky-btn-tab-close').click();

        expect(closeTabSpy).toHaveBeenCalled();
      });
  });

  it('should select the next tab when the active tab is closed', () => {
    return tcb
      .createAsync(TabsetTestComponent)
      .then((fixture: ComponentFixture<TabsetTestComponent>) => {
        let cmp: TabsetTestComponent = fixture.componentInstance;
        let el = fixture.nativeElement;

        cmp.activeTab = 1;
        fixture.detectChanges();

        cmp.tab2Available = false;
        fixture.detectChanges();

        expect(el.querySelectorAll('.sky-btn-tab').length).toBe(2);
        validateTabSelected(el, 1);
      });
  });

  it(
    'should select the previous tab when the last tab is closed and the last tab was active',
    () => {
    return tcb
      .createAsync(TabsetTestComponent)
      .then((fixture: ComponentFixture<TabsetTestComponent>) => {
        let cmp: TabsetTestComponent = fixture.componentInstance;
        let el = fixture.nativeElement;

        cmp.activeTab = 2;
        fixture.detectChanges();

        cmp.tab3Available = false;
        fixture.detectChanges();

        expect(el.querySelectorAll('.sky-btn-tab').length).toBe(2);
        validateTabSelected(el, 1);
      });
    }
  );

  it(
    'should maintain the currently active tab when a non-active tab is closed',
    () => {
    return tcb
      .createAsync(TabsetTestComponent)
      .then((fixture: ComponentFixture<TabsetTestComponent>) => {
        let cmp: TabsetTestComponent = fixture.componentInstance;
        let el = fixture.nativeElement;

        cmp.activeTab = 2;
        fixture.detectChanges();

        cmp.tab2Available = false;
        fixture.detectChanges();

        expect(el.querySelectorAll('.sky-btn-tab').length).toBe(2);
        validateTabSelected(el, 2);
      });
    }
  );

  it('should add no buttons if add and open are not defined', () => {
    return tcb
      .createAsync(TabsetTestComponent)
      .then((fixture: ComponentFixture<TabsetTestComponent>) => {
        let el = fixture.nativeElement;

        fixture.detectChanges();

        expect(el.querySelector('.sky-tabset-btn-new')).toBeNull();
        expect(el.querySelector('.sky-tabset-btn-open')).toBeNull();
      });
  });

  it(
    'should collapse into a dropdown when the width of the tabs is greater than its container',
    fakeAsync(() => {
      return tcb
        .overrideProviders(
          SkyTabsetComponent,
          [
            provide(SkyTabsetAdapterService, {useValue: mockAdapterService})
          ]
        )
        .createAsync(TabsetTestComponent)
        .then((fixture: ComponentFixture<TabsetTestComponent>) => {
          let el = fixture.nativeElement;

          fixture.detectChanges();

          tick();

          mockAdapterService.fakeOverflowChange(true);

          fixture.detectChanges();

          let tabEl = el.querySelector('.sky-dropdown-button-type-tab');

          expect(tabEl).not.toBeNull();
        });
      })
  );

  describe('when collapsed', () => {
    it(
      'should display the selected tab in the collapsed tab dropdown button',
      fakeAsync(() => {
        return tcb
          .overrideProviders(
            SkyTabsetComponent,
            [
              provide(SkyTabsetAdapterService, {useValue: mockAdapterService})
            ]
          )
          .createAsync(TabsetTestComponent)
          .then((fixture: ComponentFixture<TabsetTestComponent>) => {
            let el = fixture.nativeElement;
            let cmp: TabsetTestComponent = fixture.componentInstance;

            fixture.detectChanges();
            tick();

            mockAdapterService.fakeOverflowChange(true);

            fixture.detectChanges();

            let tabEl = el.querySelector('.sky-dropdown-button-type-tab');

            expect(tabEl.innerText.trim()).toBe('Tab 1');

            cmp.activeTab = 2;
            fixture.detectChanges();
            tick();

            expect(tabEl.innerText.trim()).toBe('Tab 3');
          });
        })
    );

    it(
      'should allow another tab to be selected from the dropdown',
      fakeAsync(() => {
        return tcb
          .overrideProviders(
            SkyTabsetComponent,
            [
              provide(SkyTabsetAdapterService, {useValue: mockAdapterService})
            ]
          )
          .createAsync(TabsetTestComponent)
          .then((fixture: ComponentFixture<TabsetTestComponent>) => {
            let el = fixture.nativeElement;

            fixture.detectChanges();
            tick();

            mockAdapterService.fakeOverflowChange(true);

            fixture.detectChanges();

            let tabEl = el.querySelector('.sky-dropdown-button-type-tab');

            tabEl.click();
            el.querySelectorAll('.sky-tab-dropdown-item-btn')[1].click();

            fixture.detectChanges();
            tick();

            validateTabSelected(el, 1);
          });
        })
    );

    it(
      'should notify the consumer when a tab\'s close button is clicked',
      fakeAsync(() => {
        return tcb
          .overrideProviders(
            SkyTabsetComponent,
            [
              provide(SkyTabsetAdapterService, {useValue: mockAdapterService})
            ]
          )
          .createAsync(TabsetTestComponent)
          .then((fixture: ComponentFixture<TabsetTestComponent>) => {
            let el = fixture.nativeElement;

            fixture.detectChanges();
            tick();

            mockAdapterService.fakeOverflowChange(true);

            fixture.detectChanges();

            let tabEl = el.querySelector('.sky-dropdown-button-type-tab');

            tabEl.click();
            el.querySelectorAll('.sky-tab-dropdown-item-close')[0].click();

            fixture.detectChanges();
            tick();

            mockAdapterService.fakeOverflowChange(false);

            fixture.detectChanges();

            expect(el.querySelectorAll('.sky-btn-tab').length).toBe(2);
          });
        })
    );
  });

  describe('collapsible tabs', () => {

    xit('collapses in xs when there are no add or open buttons', () => {
    });

    xit('collapses in xs when tabs are specifically defined', () => {
    });

    xit('works correctly when starting in extra small mode', () => {
    });

    xit('works correctly when starting in extra small mode with 1 tab', () => {
    });

    xit(
      'has the correct dropdown title in extra small mode when title changes using heading',
      () => {
      }
    );

    xit('can add and remove tabs', () => {

    });

    xit('can remove tabs while collapsed', () => {
    });

    describe('dropdown max width', () => {
      xit('adds max width when changing to collapsed mode', () => {
      });

      xit('adds max width when window size changes', () => {
      });
    });
  });
});
