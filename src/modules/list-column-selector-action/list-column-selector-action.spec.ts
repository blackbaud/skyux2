import {
  flush,
  TestBed,
  ComponentFixture,
  inject,
  fakeAsync,
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

describe('List column selector action', () => {
  let state: ListState,
    dispatcher: ListStateDispatcher,
    component: ListColumnSelectorActionTestComponent,
    fixture: ComponentFixture<ListColumnSelectorActionTestComponent>,
    nativeElement: HTMLElement;

  beforeEach(() => {
    dispatcher = new ListStateDispatcher();
    state = new ListState(dispatcher);

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
    fixture = TestBed.createComponent(ListColumnSelectorActionTestComponent);
    nativeElement = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
  });

  beforeEach(inject([SkyModalService], (_modalService: SkyModalService) => {
    _modalService.dispose();
  }));

  afterAll(() => {
    fixture.destroy();
  });

  function getChooseColumnsButton() {
    return nativeElement.querySelector('.sky-dropdown-menu button') as HTMLElement;
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

  function closeModal(): void {
    const cancelButton = document.querySelector('.sky-modal [sky-cmp-id="cancel"]') as HTMLButtonElement;
    cancelButton.click();
    tick();
    fixture.detectChanges();
    flush();
    tick();
  }

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

  it('should not clear the search text when new columns are set', fakeAsync(() => {
    component.searchText = 'something';
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
      expect(component.searchText).toEqual('something');
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

    closeModal();

    component.grid.gridState.take(1).subscribe((gridState) => {
      expect(gridState.displayedColumns.items.length).toBe(3);
    });
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

  it('should show help button in modal header', fakeAsync(() => {
    fixture.componentInstance.helpKey = 'foo.html';
    toggleSecondaryActionsDropdown();

    const chooseColumnsButton = getChooseColumnsButton();
    chooseColumnsButton.click();
    tick();

    const helpButton = document.querySelector('button[name="help-button"]');
    expect(helpButton).toExist();

    closeModal();
  }));

  it('should emit help key when help button clicked', fakeAsync(() => {
    fixture.componentInstance.helpKey = 'foo.html';
    const spy = spyOn(fixture.componentInstance, 'onHelpOpened').and.callThrough();
    toggleSecondaryActionsDropdown();

    const chooseColumnsButton = getChooseColumnsButton();
    chooseColumnsButton.click();
    tick();

    const helpButton = document.querySelector('button[name="help-button"]');
    (helpButton as any).click();
    tick();
    expect(spy).toHaveBeenCalledWith('foo.html');

    closeModal();
  }));
});
