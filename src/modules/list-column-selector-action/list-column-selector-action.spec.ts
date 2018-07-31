import {
  async,
  ComponentFixture,
  fakeAsync,
  flush,
  inject,
  TestBed,
  tick
} from '@angular/core/testing';

import {
  NoopAnimationsModule
} from '@angular/platform-browser/animations';

import {
  RouterTestingModule
} from '@angular/router/testing';

import {
  expect
} from '@blackbaud/skyux-builder/runtime/testing/browser';

import {
  ListState,
  ListStateDispatcher
} from '../list/state';

import {
  SkyListModule,
  SkyListComponent
} from '../list';

import {
  SkyListToolbarModule
} from '../list-toolbar';

import {
  SkyListSecondaryActionsModule
} from '../list-secondary-actions';

import {
  SkyListViewGridModule
} from '../list-view-grid';

import {
  ListColumnSelectorActionTestComponent
} from './fixtures/list-column-selector-action.component.fixture';

import {
  SkyListColumnSelectorActionModule
} from '.';

import {
  SkyGridModule
} from '../grid';

import {
  SkyModalService
} from '../modal';

import {
  SkyColumnSelectorModule
} from '../column-selector';

import { SkyListSecondaryActionsService } from '../list-secondary-actions/list-secondary-actions.service';
import { ListColumnSelectorActionDeprecatedTestComponent } from './fixtures/list-column-selector-action-deprecated.component.fixture';

describe('List column selector action', () => {
  let fixture: ComponentFixture<any>;
  let nativeElement: HTMLElement;

  function getChooseColumnsButton() {
    let button = nativeElement.querySelector('.sky-dropdown-menu button') as HTMLElement;
    if (!button) {
      button = nativeElement.querySelector('[sky-cmp-id="column-chooser"] button') as HTMLElement;
    }
    return button;
  }

  function toggleSecondaryActionsDropdown() {
    fixture.detectChanges();
    flush();
    tick();
    fixture.detectChanges();

    const button = nativeElement.querySelector('.sky-dropdown-button') as HTMLButtonElement;
    expect(button).toBeDefined();

    button.click();
    flush();
    tick();
    fixture.detectChanges();
  }

  function getButtonEl() {
    return nativeElement.querySelector('[sky-cmp-id="column-chooser"] .sky-btn') as HTMLButtonElement;
  }

  describe('toolbar button', () => {
    let state: ListState,
      dispatcher: ListStateDispatcher,
      component: ListColumnSelectorActionTestComponent,
      secondaryActionsService: SkyListSecondaryActionsService;

    beforeEach(() => {
      dispatcher = new ListStateDispatcher();
      state = new ListState(dispatcher);
      secondaryActionsService = jasmine.createSpyObj(
        'SkyListSecondaryActionsService',
        ['addSecondaryAction', 'removeSecondaryAction']
      );

      TestBed.configureTestingModule({
        declarations: [
          ListColumnSelectorActionTestComponent
        ],
        imports: [
          RouterTestingModule,
          SkyListColumnSelectorActionModule,
          SkyListModule,
          SkyListToolbarModule,
          SkyListSecondaryActionsModule,
          SkyGridModule,
          SkyListViewGridModule,
          SkyColumnSelectorModule,
          NoopAnimationsModule
        ],
        providers: [
          { provide: SkyListSecondaryActionsService, useValue: secondaryActionsService }
        ]
      })
        .overrideComponent(SkyListComponent, {
          set: {
            providers: [
              { provide: ListState, useValue: state },
              { provide: ListStateDispatcher, useValue: dispatcher }
            ]
          }
        });
    });

    beforeEach(inject([SkyModalService], (_modalService: SkyModalService) => {
      _modalService.dispose();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ListColumnSelectorActionTestComponent);
      component = fixture.componentInstance;
      nativeElement = fixture.nativeElement as HTMLElement;
      fixture.detectChanges();

      // always skip the first update to ListState, when state is ready
      // run detectChanges once more then begin tests
      state.skip(1).take(1).subscribe(() => fixture.detectChanges());
      fixture.detectChanges();
    });

    afterEach(() => {
      fixture.destroy();
    });

    it('should not appear if not in grid view', async(() => {
      dispatcher.viewsSetActive('other');
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(getButtonEl()).toBeNull();
        });
      });
    }));

    it('should not clear the search text when new columns are set', async(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        component.searchText = 'something';

        const chooseColumnsButton = getButtonEl();
        chooseColumnsButton.click();
        fixture.detectChanges();

        const checkboxLabelEl = document.querySelectorAll(
          '.sky-modal .sky-list-view-checklist-item input'
        ) as NodeListOf<HTMLElement>;

        expect(checkboxLabelEl.length).toBe(2);

        checkboxLabelEl.item(0).click();
        fixture.detectChanges();

        const submitButtonEl = document.querySelector('.sky-modal .sky-btn-primary') as HTMLButtonElement;

        submitButtonEl.click();
        fixture.detectChanges();

        component.grid.gridState.take(1).subscribe((gridState) => {
          expect(gridState.displayedColumns.items.length).toBe(2);
          expect(component.searchText).toEqual('something');
        });
      });
    }));

    it('should show help button in modal header', async(() => {
      fixture.componentInstance.helpKey = 'foo.html';
      fixture.detectChanges();

      const chooseColumnsButton = getChooseColumnsButton();
      chooseColumnsButton.click();
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        const helpButton = document.querySelector('button[name="help-button"]');
        expect(helpButton).toExist();

        const cancelButtonEl = document.querySelector('.sky-modal [sky-cmp-id="cancel"]') as HTMLButtonElement;
        cancelButtonEl.click();
        fixture.detectChanges();
      });
    }));

    it('should emit help key when help button clicked', async(() => {
      const spy = spyOn(fixture.componentInstance, 'onHelpOpened').and.callThrough();
      fixture.componentInstance.helpKey = 'foo.html';
      fixture.detectChanges();

      const chooseColumnsButton = getChooseColumnsButton();
      chooseColumnsButton.click();
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        const helpButton = document.querySelector('button[name="help-button"]');
        (helpButton as any).click();
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledWith('foo.html');

        const cancelButtonEl = document.querySelector('.sky-modal [sky-cmp-id="cancel"]') as HTMLButtonElement;
        cancelButtonEl.click();
        fixture.detectChanges();
      });
    }));
  });

  describe('dropdown', () => {
    let state: ListState,
      dispatcher: ListStateDispatcher,
      component: ListColumnSelectorActionDeprecatedTestComponent;

    beforeEach(() => {
      dispatcher = new ListStateDispatcher();
      state = new ListState(dispatcher);

      TestBed.configureTestingModule({
        declarations: [
          ListColumnSelectorActionDeprecatedTestComponent
        ],
        imports: [
          RouterTestingModule,
          SkyListColumnSelectorActionModule,
          SkyListModule,
          SkyListToolbarModule,
          SkyListSecondaryActionsModule,
          SkyGridModule,
          SkyListViewGridModule,
          SkyColumnSelectorModule,
          NoopAnimationsModule
        ]
      })
        .overrideComponent(SkyListComponent, {
          set: {
            providers: [
              { provide: ListState, useValue: state },
              { provide: ListStateDispatcher, useValue: dispatcher }
            ]
          }
        });
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(ListColumnSelectorActionDeprecatedTestComponent);
      nativeElement = fixture.nativeElement as HTMLElement;
      component = fixture.componentInstance;
    });

    beforeEach(inject([SkyModalService], (_modalService: SkyModalService) => {
      _modalService.dispose();
    }));

    afterEach(() => {
      fixture.destroy();
    });

    it('should show an action in the secondary actions dropdown', fakeAsync(() => {
      toggleSecondaryActionsDropdown();

      const chooseColumnsButton = getChooseColumnsButton();
      expect(chooseColumnsButton.textContent.trim()).toEqual('Choose columns');
    }));

    it('should open the appropriate modal on click and apply column changes on save', fakeAsync(() => {
      toggleSecondaryActionsDropdown();

      const chooseColumnsButton = getChooseColumnsButton();
      chooseColumnsButton.click();
      tick();

      const checkboxLabelEl = document.querySelectorAll(
        '.sky-modal .sky-list-view-checklist-item input'
      ) as NodeListOf<HTMLElement>;

      expect(checkboxLabelEl.length).toBe(2);

      checkboxLabelEl.item(0).click();
      tick();

      const submitButtonEl = document.querySelector('.sky-modal .sky-btn-primary') as HTMLButtonElement;

      submitButtonEl.click();
      tick();

      component.grid.gridState.take(1).subscribe((gridState) => {
        expect(gridState.displayedColumns.items.length).toBe(2);
      });

      flush();
      tick();
    }));

    it('should keep previous columns on cancel', fakeAsync(() => {
      toggleSecondaryActionsDropdown();

      const chooseColumnsButton = getChooseColumnsButton();
      chooseColumnsButton.click();
      tick();

      const checkboxLabelEl = document.querySelectorAll(
        '.sky-modal .sky-list-view-checklist-item input'
      ) as NodeListOf<HTMLElement>;

      checkboxLabelEl.item(0).click();
      tick();

      const cancelButtonEl = document.querySelector('.sky-modal [sky-cmp-id="cancel"]') as HTMLButtonElement;
      cancelButtonEl.click();
      tick();

      component.grid.gridState.take(1).subscribe((gridState) => {
        expect(gridState.displayedColumns.items.length).toBe(3);
      });

      flush();
      tick();
    }));

    it('should not appear if not in grid view', fakeAsync(() => {
      fixture.detectChanges();

      // Skip the first update to ListState, when state is ready.
      state.skip(1).take(1).subscribe(() => {
        fixture.detectChanges();
        tick();
        dispatcher.viewsSetActive('other');
        tick();

        /* tslint:disable */
        let query =
          '.sky-list-toolbar-container .sky-toolbar-item .sky-list-secondary-actions .sky-dropdown .sky-dropdown-menu sky-list-secondary-action';
        /* tslint:enable */
        expect(nativeElement.querySelector(query)).toBeNull();
      });

      flush();
      tick();
    }));
  });
});
