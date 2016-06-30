import {
  ComponentFixture,
  TestComponentBuilder
} from '@angular/compiler/testing';

import {
  beforeEach,
  describe,
  expect,
  inject,
  it,
  xit
} from '@angular/core/testing';

import { TabsetTestComponent } from './fixtures/tabset.component.fixture';

describe('Tabset component', () => {
  let tcb: TestComponentBuilder;

  function validateTabSelected(el: Element, tabIndex: number) {
    let selectedCls = 'sky-tab-button-selected';
    let buttonEls = el.querySelectorAll('.sky-tab-button');
    let contentEls = el.querySelectorAll('.sky-tab');

    for (let i = 0, n = buttonEls.length; i < n; i++) {
      let buttonEl = buttonEls[i];
      let panelDisplay = getComputedStyle(contentEls[i]).display;

      if (i === tabIndex) {
        expect(buttonEl).toHaveCssClass(selectedCls);
        expect(panelDisplay).toBe('block');
      } else {
        expect(buttonEl).not.toHaveCssClass(selectedCls);
        expect(panelDisplay).toBe('none');
      }
    }
  }

  beforeEach(inject([TestComponentBuilder], (_tcb: TestComponentBuilder) => {
    tcb = _tcb;
  }));

  describe('tabs with active attribute', () => {
    it('should change the tab when tab active is set to true', () => {
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

    it('should change the active when the tab is clicked manually', () => {
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

  describe('adding tabs', () => {
    it('adds tabs', () => {
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
  });

  describe('opening tabs', () => {
    it('opens tabs', () => {
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
  });

  describe('no add open', () => {
    it('adds no buttons if add and open are not defined', () => {
      return tcb
        .createAsync(TabsetTestComponent)
        .then((fixture: ComponentFixture<TabsetTestComponent>) => {
          let el = fixture.nativeElement;

          fixture.detectChanges();

          expect(el.querySelector('.sky-tabset-btn-new')).toBeNull();
          expect(el.querySelector('.sky-tabset-btn-open')).toBeNull();
        });
    });
  });

  describe('collapsible tabs', () => {
    xit('collapses into a dropdown on extra small mode when there is more than 1 tab', () => {
    });

    xit('collapses in xs when there are no add or open buttons', () => {
    });

    xit('collapses in xs when tabs are specifically defined', () => {
    });

    xit('works correctly when starting in extra small mode', () => {
    });

    xit('works correctly when starting in extra small mode with 1 tab', () => {
    });

    xit('has the correct dropdown title in extra small mode when title changes', () => {
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
