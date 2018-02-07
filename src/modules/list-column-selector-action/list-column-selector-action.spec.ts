import {
  flush,
  TestBed,
  ComponentFixture,
  inject,
  async,
  tick,
  fakeAsync
} from '@angular/core/testing';

import {
  NoopAnimationsModule
} from '@angular/platform-browser/animations';

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
  expect
} from '../testing';

import {
  SkyModalService
} from '../modal';

import {
  SkyColumnSelectorModule
} from '../column-selector';

import {
  MockSkyMediaQueryService
} from '../testing/mocks';

import {
  SkyMediaBreakpoints,
  SkyMediaQueryService
} from '../media-queries';
import { SkyListSecondaryActionsService } from '../list-secondary-actions/list-secondary-actions.service';
import { ListColumnSelectorActionDeprecatedTestComponent } from './fixtures/list-column-selector-action-deprecated.component.fixture';

describe('List column selector action', () => {
  let state: ListState,
    dispatcher: ListStateDispatcher,
    fixture: ComponentFixture<ListColumnSelectorActionTestComponent>,
    nativeElement: HTMLElement,
    mockMediaQueryService: MockSkyMediaQueryService,
    secondaryActionsService: SkyListSecondaryActionsService;

  beforeEach(() => {
    mockMediaQueryService = new MockSkyMediaQueryService();
    dispatcher = new ListStateDispatcher();
    state = new ListState(dispatcher);
    secondaryActionsService = jasmine.createSpyObj('SkyListSecondaryActionsService', ['addSecondaryAction', 'removeSecondaryAction']);

    TestBed.configureTestingModule({
      declarations: [
        ListColumnSelectorActionTestComponent
      ],
      imports: [
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
        { provide: SkyMediaQueryService, useValue: mockMediaQueryService },
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

  function getButtonEl() {
    return nativeElement.querySelector('[sky-cmp-id="column-chooser"] .sky-btn') as HTMLButtonElement;
  }

  function triggerXsBreakpoint() {
    mockMediaQueryService.fire(SkyMediaBreakpoints.xs);
    fixture.detectChanges();
    return fixture.whenStable();
  }

  function triggerSmBreakpoint() {
    mockMediaQueryService.fire(SkyMediaBreakpoints.sm);
    fixture.detectChanges();
    return fixture.whenStable();
  }

  function verifyTextPresent() {
    expect(getButtonEl().innerText.trim()).toBe('Columns');
  }

  function verifyTextNotPresent() {
    expect(getButtonEl().innerText.trim()).not.toBe('Columns');
  }

  beforeEach(
    inject(
      [
        SkyModalService
      ],
      (
        _modalService: SkyModalService
      ) => {
        _modalService.dispose();
      }
    )
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ListColumnSelectorActionTestComponent);
    nativeElement = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();

    // always skip the first update to ListState, when state is ready
    // run detectChanges once more then begin tests
    state.skip(1).take(1).subscribe(() => fixture.detectChanges());
    fixture.detectChanges();
  });

  afterAll(() => {
    fixture.destroy();
  });

  it('text should be present when not an extra small screen', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      verifyTextPresent();
      triggerSmBreakpoint().then(() => {
        fixture.detectChanges();
        verifyTextPresent();
      });
    });
  }));

  it('text should not be present when an extra small screen', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      verifyTextPresent();
      triggerXsBreakpoint().then(() => {
        fixture.detectChanges();
        verifyTextNotPresent();
      });
    });
  }));

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
});

describe('List column selector action - deprecated', () => {
  let state: ListState,
    dispatcher: ListStateDispatcher,
    component: ListColumnSelectorActionDeprecatedTestComponent,
    fixture: ComponentFixture<ListColumnSelectorActionDeprecatedTestComponent>,
    nativeElement: HTMLElement;

  beforeEach(async(() => {
    dispatcher = new ListStateDispatcher();
    state = new ListState(dispatcher);

    TestBed.configureTestingModule({
      declarations: [
        ListColumnSelectorActionDeprecatedTestComponent
      ],
      imports: [
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListColumnSelectorActionDeprecatedTestComponent);
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
